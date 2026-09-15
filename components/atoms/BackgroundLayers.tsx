import { useId } from "react";

export default function BackgroundLayers() {
  const noiseId = useId();
  return (
    <>
      {/* paper texture (Figma Paper_03 1, node 2019:435) — lighten-blended over cream */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 h-screen w-screen mix-blend-lighten"
        style={{
          backgroundImage: "url('/assets/background/background_texture.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      />

      {/* noise overlay — mono, x 0.1, y 0.1, density 100%, #000 @ 25% */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25 mix-blend-multiply"
      >
        <filter id={noiseId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.3 0.3"
            numOctaves="1"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${noiseId})`} />
      </svg>
    </>
  );
}
