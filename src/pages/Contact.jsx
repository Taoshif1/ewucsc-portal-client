import PageHero from "../components/PageHero";

const Contact = () => {
  return (
    <div className="space-y-16">
      <PageHero
        badge="Reach Out"
        title="Contact"
        highlight="Us"
        description="Want to collaborate, join, sponsor, or connect with EWUCSC? Reach out through our official channels."
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-white/5 bg-base-100/70 p-8 backdrop-blur-xl shadow-2xl space-y-4">
          <h2 className="text-2xl font-black">Contact Information</h2>
          <p className="text-base-content/70">
            📧 Email: support@ewucsc.org
          </p>
          <p className="text-base-content/70">
            📍 Location: East West University, Dhaka
          </p>
          <p className="text-base-content/70">
            🌐 Socials: Facebook, LinkedIn, Discord, GitHub
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-white/5 bg-base-100/70 p-8 backdrop-blur-xl shadow-2xl space-y-4">
          <h2 className="text-2xl font-black">Quick Message</h2>
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full bg-base-200/50"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full bg-base-200/50"
          />
          <textarea
            placeholder="Your Message"
            className="textarea textarea-bordered w-full min-h-32 bg-base-200/50"
          />
          <button className="btn btn-primary rounded-full px-8">
            Send Message
          </button>
        </div>
      </section>
    </div>
  );
};

export default Contact;