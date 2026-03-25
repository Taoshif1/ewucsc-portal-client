const MatrixBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(34,197,94,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow blobs */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl animate-pulse" />
      <div className="absolute top-1/3 left-1/2 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-pulse" />

      {/* Cyber scan line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 animate-pulse" />
    </div>
  );
};

export default MatrixBackground;