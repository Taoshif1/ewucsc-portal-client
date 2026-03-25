const columns = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i / 28) * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${Math.random() * 8 + 8}s`,
  content: Array.from({ length: 18 }, () =>
    Math.random() > 0.5 ? "1" : "0"
  ).join(" "),
}));

const CodeRain = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {columns.map((col) => (
        <div
          key={col.id}
          className="absolute top-0 text-[10px] md:text-xs font-mono text-accent/40 leading-5 whitespace-pre-wrap select-none"
          style={{
            left: col.left,
            animation: `matrixFall ${col.duration} linear infinite`,
            animationDelay: col.delay,
          }}
        >
          {col.content}
        </div>
      ))}
    </div>
  );
};

export default CodeRain;