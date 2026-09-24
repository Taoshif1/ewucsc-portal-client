import { FaClipboardCheck, FaClock, FaShield } from "react-icons/fa6";

const PortalHomeworks = () => (
  <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
    <div className="rounded-[2rem] border border-accent/20 bg-base-100/70 p-7 md:p-10">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">// member learning</p>
      <h1 className="mt-3 text-4xl md:text-6xl font-black">Homework <span className="text-accent">Board</span></h1>
      <p className="mt-5 max-w-2xl text-base-content/60">
        Assignments and submissions are private to approved EWUCSC members.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          [<FaClipboardCheck key="one" />, "Assignments", "Current member tasks"],
          [<FaClock key="two" />, "Deadlines", "Track due dates"],
          [<FaShield key="three" />, "Private submissions", "Only approved members can access"],
        ].map(([icon,title,desc]) => (
          <div key={title} className="rounded-2xl border border-white/5 bg-base-200/55 p-5">
            <div className="text-2xl text-accent">{icon}</div>
            <h2 className="mt-4 font-black">{title}</h2>
            <p className="mt-2 text-sm text-base-content/55">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PortalHomeworks;
