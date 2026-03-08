import React from "react";

const Home = () => {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">
          EWU Cyber Security Club
        </h1>

        <p className="text-base-content/70">Train. Compete. Defend.</p>

        <div className="flex justify-center gap-4">
          <button className="btn btn-primary">Start Learning</button>
          <button className="btn btn-outline btn-secondary">Join CTF</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">CTF Arena</h2>
            <p>Practice real cybersecurity challenges.</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Learning Path</h2>
            <p>Follow structured cyber security training.</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Club Dashboard</h2>
            <p>Track your progress and rankings.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
