let patternId = 0;

const HalftoneOverlay = () => {
  patternId += 1;
  const id = `halftone-${patternId}`;
  return (
    <svg className="halftone-overlay" aria-hidden="true">
      <defs>
        <pattern id={id} width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="0.7" fill="var(--riso-pink)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity="0.06" />
    </svg>
  );
};

export default HalftoneOverlay;
