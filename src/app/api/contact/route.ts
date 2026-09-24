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
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
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
