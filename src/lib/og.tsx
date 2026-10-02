import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Imágenes para redes (LinkedIn, WhatsApp, X...). Se generan en el build, una por
// idioma y por página que tenga su propio opengraph-image.tsx.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const FONTS_DIR = join(process.cwd(), "src", "assets", "fonts");

// Satori (el motor de next/og) deja huecos irregulares en los espacios por donde
// puede cortar una línea. Con espacios duros el espaciado sale parejo, así que el
// corte de línea del subtítulo se hace aquí, por cantidad aproximada de caracteres.
const NBSP = " ";
const keepTogether = (text: string) => text.replace(/ /g, NBSP);

function wrapLines(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if (line && `${line} ${word}`.length > maxChars) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines.map(keepTogether);
}

export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
  chips,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  chips: string[];
  footer: string;
}) {
  const [bold, semibold] = await Promise.all([
    readFile(join(FONTS_DIR, "Geist-Bold.ttf")),
    readFile(join(FONTS_DIR, "Geist-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#0b0a14",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(139,92,246,0.45), transparent 45%), radial-gradient(circle at 92% 88%, rgba(34,211,238,0.30), transparent 45%)",
          color: "#f5f3ff",
          fontFamily: "Geist",
          fontWeight: 600,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(196,181,253,0.45)",
                color: "#c4b5fd",
                fontSize: 22,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {keepTogether(eyebrow)}
            </div>
            <div style={{ display: "flex", fontSize: 24, color: "#94a3b8" }}>
              {keepTogether(footer)}
            </div>
          </div>

          <div
            style={{
              marginTop: 40,
              fontSize: title.length > 28 ? 68 : 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              backgroundImage: "linear-gradient(90deg, #a78bfa, #60a5fa 55%, #22d3ee)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 24,
              fontSize: 34,
              lineHeight: 1.3,
              color: "#cbd5e1",
            }}
          >
            {wrapLines(subtitle, 52).map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "8px 16px",
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                fontSize: 22,
                color: "#e2e8f0",
              }}
            >
              {keepTogether(chip)}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: bold, weight: 700, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    }
  );
}
