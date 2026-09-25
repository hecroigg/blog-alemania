import { ImageResponse } from "next/og";

export const alt = "GermanyBase — practical guides for life in Germany";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 70, color: "#132f4a", background: "#f4f8fc", fontFamily: "sans-serif" }}><div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}><div style={{ width: 58, height: 58, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 16, color: "white", background: "#173f67" }}>G</div>GermanyBase</div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ color: "#1d5f91", fontSize: 22, letterSpacing: 3, textTransform: "uppercase" }}>Everything you need to live in Germany</div><div style={{ display: "flex", flexDirection: "column", marginTop: 18, fontSize: 72, lineHeight: 1.05, fontWeight: 750, letterSpacing: -3 }}><span>Living in Germany,</span><span>made clear.</span></div></div><div style={{ display: "flex", justifyContent: "space-between", color: "#63758a", fontSize: 22 }}><span>Independent · Practical · Source-led</span><span style={{ color: "#ef6d58" }}>Plan → Move → Settle</span></div></div>, size);
}
