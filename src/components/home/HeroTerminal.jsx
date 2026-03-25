import { motion } from "framer-motion";

const terminalLines = [
  "> initializing ewucsc protocol...",
  "> loading challenge engine...",
  "> syncing leaderboard...",
  "> access granted: cyber arena online",
];

const HeroTerminal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.45 }}
      className="mt-14 max-w-3xl mx-auto rounded-3xl border border-accent/20 bg-neutral/80 backdrop-blur-xl shadow-2xl overflow-hidden"
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-base-300/40">
        <span className="h-3 w-3 rounded-full bg-error"></span>
        <span className="h-3 w-3 rounded-full bg-warning"></span>
        <span className="h-3 w-3 rounded-full bg-success"></span>

        <span className="ml-3 text-xs text-base-content/50 font-mono">
          ewucsc@terminal:~$
        </span>
      </div>

      {/* Body */}
      <div className="p-6 md:p-8 font-mono text-left space-y-3 text-sm md:text-base">
        {terminalLines.map((line, index) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.3 }}
            className="text-accent"
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-4 flex items-center gap-2 text-secondary"
        >
          <span>{">"}</span>
          <span className="typing-glow">awaiting next operator...</span>
          <span className="h-5 w-2 bg-accent animate-pulse rounded-sm"></span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroTerminal;