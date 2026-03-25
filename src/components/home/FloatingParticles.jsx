const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.floor(Math.random() * 6) + 4,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 6}s`,
  duration: `${Math.random() * 10 + 8}s`,
}));

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full bg-accent/40 shadow-[0_0_18px_rgba(34,197,94,0.45)] animate-float-particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;