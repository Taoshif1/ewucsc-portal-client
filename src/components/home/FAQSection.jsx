import SectionHeading from "./SectionHeading";

const faqs = [
  {
    question: "Do I need prior cybersecurity experience?",
    answer:
      "No. EWUCSC is designed for both beginners and advanced learners. We provide structured tracks so you can grow step by step.",
  },
  {
    question: "What kind of activities does the club offer?",
    answer:
      "CTF challenges, workshops, cyber labs, learning paths, rankings, internal tasks, and practical security problem-solving sessions.",
  },
  {
    question: "Will there be a ranking / leaderboard system?",
    answer:
      "Yes. The platform is being designed with a competitive point-based system inspired by CTF ecosystems like picoCTF.",
  },
  {
    question: "Can non-admin members solve cyber problems?",
    answer:
      "Yes. Admins will publish challenges and members, executives, and sub-executives will be able to solve them for points.",
  },
];

const FAQSection = () => {
  return (
    <section className="space-y-10">
      <SectionHeading
        badge="FAQ"
        title="Questions Future Hackers Usually Ask"
        subtitle="A few quick answers before you jump into the ecosystem."
      />

      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-plus border border-white/10 bg-base-100/70 backdrop-blur-xl"
          >
            {/* Switched type to checkbox and removed defaultChecked */}
            <input type="checkbox" name={`faq-accordion-${index}`} />

            <div className="collapse-title text-lg font-bold text-base-content">
              {faq.question}
            </div>
            <div className="collapse-content text-sm text-base-content/70 leading-relaxed">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
