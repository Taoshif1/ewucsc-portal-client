import { motion } from "framer-motion";
import { FaCrown, FaMedal, FaShieldAlt } from "react-icons/fa";

const rankingData = [
  { name: "AlphaByte", points: 1280, icon: <FaCrown className="text-warning" /> },
  { name: "RootHunter", points: 1140, icon: <FaMedal className="text-secondary" /> },
  { name: "NullPointer", points: 980, icon: <FaShieldAlt className="text-accent" /> },
];

const LiveRankingPreview = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      className="rounded-[2rem] border border-white/5 bg-base-100/70 backdrop-blur-xl shadow-2xl p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary font-bold">
            Ranking Preview
          </p>
          <h3 className="text-2xl md:text-3xl font-black mt-2">
            Future Live Leaderboard
          </h3>
        </div>

        <div className="badge badge-success badge-outline px-4 py-3">
          Coming Soon
        </div>
      </div>

      <div className="space-y-4">
        {rankingData.map((user, index) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            className="flex items-center justify-between rounded-2xl border border-white/5 bg-base-200/50 p-4 hover:scale-[1.01] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="text-xl">{user.icon}</div>
              <div>
                <h4 className="font-bold">{user.name}</h4>
                <p className="text-sm text-base-content/60">Challenge Solver</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-black text-primary">{user.points}</p>
              <p className="text-xs text-base-content/60">points</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default LiveRankingPreview;