import { ImageResponse } from "next/og";

export const alt = "Chavidu Bandara — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated once at build time using ImageResponse's bundled sans-serif font.
// No remote image or font request is needed to render the sharing card.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0d0b09", padding: 36, color: "#f7f1e9" }}>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: "40px 48px", border: "1px solid #493126", borderRadius: 28, background: "#17120f" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", fontSize: 80, fontWeight: 700, lineHeight: 1, letterSpacing: -7 }}>
              cb<span style={{ color: "#ff6b35" }}>.</span>
            </div>
            <div style={{ display: "flex", width: 90, height: 6, borderRadius: 3, background: "#ff6b35" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", paddingBottom: 26 }}>
            <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: -4, lineHeight: 1.15 }}>Chavidu Bandara</div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 38, color: "#ff6b35" }}>Software Engineer</div>
          </div>
          <div style={{ display: "flex", height: 2, width: "100%", background: "#493126" }}>
            <div style={{ display: "flex", width: 180, height: 2, background: "#ff6b35" }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
