import { motion } from "framer-motion";
import { HiOutlineLocationMarker } from "react-icons/hi";

const Map = () => {
  // Direct Google Maps Embed URL for East West University, Aftabnagar
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902341935614!2d90.42303037597148!3d23.76860368810237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7892dcf31d1%3A0x1031f139049e0094!2sEast%20West%20University!5e0!3m2!1sen!2sbd!4v1709400000000!5m2!1sen!2sbd";

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 mb-24"
    >
      <div className="relative group">
        {/* Glow effect behind the map */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[2.5rem] blur-xl opacity-50"></div>

        <div className="flex items-center gap-4 mb-8">
          {/* Modern Cyber Bar */}
          <div className="h-10 w-1.5 bg-primary rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)] shrink-0"></div>

          <div>
            {/* Gradient Heading */}
            <h3 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight uppercase font-mono leading-none">
              Base <span className="text-pink-400/90">Operation</span>
            </h3>
            <p className="text-[10px] md:text-xs font-mono opacity-40 uppercase tracking-[0.4em] mt-2">
              EWUCSC Headquarter
            </p>
          </div>
        </div>

        <div className="relative rounded-[2.5rem] border border-white/10 bg-base-100/40 backdrop-blur-md overflow-hidden shadow-2xl">
          {/* Top Label Badge */}
          <div className="absolute top-6 right-6 z-10 flex items-center gap-3 bg-base-100/90 p-3 pr-6 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md">
            <div className="bg-primary/20 p-2 rounded-xl text-primary">
              <HiOutlineLocationMarker className="text-xl" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono">
                Location of EWUCSC Headquarter
              </p>
              <h4 className="text-sm font-bold">Aftabnagar, Dhaka, BD</h4>
            </div>
          </div>

          {/* Full Color Clean Map */}
          <div className="w-full h-[500px]">
            <iframe
              title="EWU Location"
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="opacity-90 hover:opacity-100 transition-opacity duration-300"
            ></iframe>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Map;
