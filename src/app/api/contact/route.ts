import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(1).max(5000),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  currentProcess: z.string().trim().max(2000).optional().or(z.literal("")),
  budget: z.string().trim().max(200).optional().or(z.literal("")),
  timeline: z.string().trim().max(200).optional().or(z.literal("")),
  // Antispam: campo trampa que una persona no ve (debe llegar vacío) y momento en
  // que se abrió el formulario, para descartar envíos hechos en menos de 3 s.
  website: z.string().max(500).optional(),
  startedAt: z.number().int().nonnegative().optional(),
});

// Tamaño máximo razonable del JSON (los campos suman ~8 KB como mucho).
const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 3_000;

// Límite de envíos por IP. Vive en la memoria de cada instancia del servidor: en
// Vercel cada instancia lleva su propia cuenta, así que es una barrera de mejor
// esfuerzo contra ráfagas, no un límite global exacto.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_PER_IP = 5;
const attemptsByIp = new Map<string, number[]>();

function isRateLimited(ip: string, now: number): boolean {
  const recent = (attemptsByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  attemptsByIp.set(ip, recent);

  // Limpieza ocasional para que el mapa no crezca sin control.
  if (attemptsByIp.size > 5_000) {
    for (const [key, times] of attemptsByIp) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) attemptsByIp.delete(key);
    }
  }

  return recent.length > RATE_MAX_PER_IP;
}

function clientIp(request: Request): string {
  // Vercel reescribe x-forwarded-for con la IP real del visitante.
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "desconocida";
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  const now = Date.now();
  if (isRateLimited(clientIp(request), now)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const { website, startedAt } = parsed.data;
  const looksAutomated =
    Boolean(website) || startedAt === undefined || now - startedAt < MIN_FILL_MS;
  if (looksAutomated) {
    // Respuesta de éxito para no darle pistas al bot; el mensaje no se envía.
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 503 }
    );
  }

  const { name, email, message, company, phone, currentProcess, budget, timeline } =
    parsed.data;
  const resend = new Resend(apiKey);

  const extraLines = [
    company && `Empresa: ${company}`,
    phone && `Teléfono/WhatsApp: ${phone}`,
    budget && `Presupuesto estimado: ${budget}`,
    timeline && `Plazo deseado: ${timeline}`,
    currentProcess && `Cómo lo hacen hoy: ${currentProcess}`,
  ].filter(Boolean);

  const { error } = await resend.emails.send({
    from: "Portafolio <onboarding@resend.dev>",
    to: toEmail,
    replyTo: email,
    subject: `Nuevo mensaje de contacto de ${name}`,
    text: `De: ${name} (${email})\n${extraLines.join("\n")}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
