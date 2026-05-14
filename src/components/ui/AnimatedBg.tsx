export function AnimatedBg(): React.ReactElement {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-bg" />
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.04,
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute left-1/2 top-0 h-[45%] w-[min(90vw,720px)] -translate-x-1/2 blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(255,0,138,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 h-[45%] w-[min(90vw,720px)] -translate-x-1/2 blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
