import { ImageResponse } from "next/og";
export const alt =
  "GoCloudEx — Websites and digital products, thoughtfully built";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#122d3b",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "70px 80px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 35 }}>GoCloudEx</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 72,
          lineHeight: 1.1,
          letterSpacing: -3,
        }}
      >
        <span>Good ideas.</span>
        <span style={{ color: "#a4d7d2" }}>Great digital experiences.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#b9cbd5",
        }}
      >
        <span>Websites · Applications · E-commerce</span>
        <span>gocloudex.com</span>
      </div>
    </div>,
    { ...size },
  );
}
