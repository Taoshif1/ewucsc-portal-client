import PageHero from "../components/PageHero";

const Partners = () => {
  return (
    <div className="space-y-16">
      <PageHero
        badge="Trust & Collaboration"
        title="Sponsors &"
        highlight="Club Partners"
        description="Meet the organizations, communities, and collaborators supporting EWUCSC through sponsorship, knowledge sharing, and ecosystem growth."
      />

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {["Partner One", "Partner Two", "Partner Three"].map((partner) => (
          <div
            key={partner}
            className="rounded-[1.75rem] border border-white/5 bg-base-100/70 p-8 text-center backdrop-blur-xl shadow-2xl"
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 text-2xl font-black text-primary">
              {partner.charAt(0)}
            </div>
            <h3 className="text-xl font-bold">{partner}</h3>
            <p className="mt-2 text-sm text-base-content/70">
              Add sponsor logo, short description, and optional website link here.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Partners;