import { FaFlag, FaLock, FaTerminal } from "react-icons/fa6";

const PortalCTF = () => (
  <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
    <div className="rounded-[2rem] border border-secondary/20 bg-base-100/70 p-7 md:p-10">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-secondary">// restricted module</p>
      <h1 className="mt-3 text-4xl md:text-6xl font-black">EWUCSC <span className="text-secondary">CTF Arena</span></h1>
      <p className="mt-5 max-w-2xl text-base-content/60">
        Club challenges, flags and internal competition data are member-only. The challenge engine will be connected here next.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          [<FaFlag key="flag" />, "Challenges", "Private EWUCSC tasks and flags"],
          [<FaTerminal key="terminal" />, "Submissions", "Submit flags and track solves"],
          [<FaLock key="lock" />, "Member-only", "Protected by backend authorization"],
        ].map(([icon,title,desc]) => (
          <div key={title} className="rounded-2xl border border-white/5 bg-base-200/55 p-5">
            <div className="text-2xl text-secondary">{icon}</div>
            <h2 className="mt-4 font-black">{title}</h2>
            <p className="mt-2 text-sm text-base-content/55">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PortalCTF;
