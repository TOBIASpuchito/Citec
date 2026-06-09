import sharp from "sharp";

const overlay = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" x2="1">
      <stop offset="0" stop-color="#071526" stop-opacity="0.92"/>
      <stop offset="0.62" stop-color="#071526" stop-opacity="0.58"/>
      <stop offset="1" stop-color="#071526" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="86" y="180" fill="#64c8df" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="7">ECOSISTEMA TECH ECUADOR</text>
  <text x="84" y="312" fill="#ffffff" font-family="Arial, sans-serif" font-size="112" font-weight="900">CITEC</text>
  <text x="90" y="398" fill="#f7fbfd" font-family="Arial, sans-serif" font-size="42" font-weight="700">Camara de Innovacion y Tecnologia Ecuatoriana</text>
  <text x="90" y="466" fill="#d8e4eb" font-family="Arial, sans-serif" font-size="30">Socios, Pulse, eventos y agenda digital para el pais.</text>
</svg>`;

await sharp("src/assets/images/citec-hero.png")
  .resize(1200, 630, { fit: "cover" })
  .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
  .png({ quality: 82, compressionLevel: 9 })
  .toFile("public/og-image.png");
