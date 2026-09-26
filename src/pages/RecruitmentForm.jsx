import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import toast from "react-hot-toast";
import {
  FaBriefcase,
  FaCode,
  FaComments,
  FaGraduationCap,
  FaTrophy,
  FaUsers,
} from "react-icons/fa6";
import { publicApi } from "../services/api";
import {
  isValidStudentId,
  normalizeStudentId,
  studentIdToEmail,
} from "../utils/ewuIdentity";

const EMPTY = {
  "Full Name": "",
  "Student ID": "",
  "University Email": "",
  "Contact Number": "",
  Department: "",
  "Current Semester": "",
  "Club Activities": [],
  "Activity Other": "",
  Specialization: [],
  "Specialization Other": "",
  "Experience Level": "Beginner",
  "Previous Club": "No",
  "Facebook URL": "",
  "LinkedIn URL": "",
  "GitHub / Portfolio URL": "",
  "Why Join": "",
  "Prior Experience": "",
  "Suggested Activities": "",
  website: "",
};

const benefits = [
  {
    title: "Hands-On Training",
    text: "Work through guided labs covering penetration testing, network defense, digital forensics and secure coding.",
    icon: <FaCode />,
  },
  {
    title: "CTFs & Competitions",
    text: "Compete in Capture The Flag events and security contests while sharpening practical skills.",
    icon: <FaTrophy />,
  },
  {
    title: "Community & Mentorship",
    text: "Work alongside faculty, alumni and students who share your interest in cybersecurity.",
    icon: <FaUsers />,
  },
  {
    title: "Portfolio & Career Growth",
    text: "Turn projects, writeups and competition results into a stronger technical portfolio.",
    icon: <FaBriefcase />,
  },
  {
    title: "Talks & Workshops",
    text: "Learn through workshops, guest sessions and talks on security tools, techniques and trends.",
    icon: <FaComments />,
  },
];

const inputClass =
  "input input-bordered w-full rounded-xl bg-base-100/70 focus:border-accent";
const textAreaClass =
  "textarea textarea-bordered min-h-28 w-full rounded-xl bg-base-100/70 focus:border-accent";

const SectionHeader = ({ number, title, description }) => (
  <div className="mb-5 flex items-center gap-3">
    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent/10 font-mono text-xs font-black text-accent">
      {number}
    </div>
    <div>
      <h2 className="text-lg font-black">{title}</h2>
      <p className="text-xs text-base-content/45">{description}</p>
    </div>
  </div>
);

const RecruitmentForm = () => {
  const { formKey } = useParams();
  const [form, setForm] = useState(null);
  const [values, setValues] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    publicApi
      .get("/forms/public/" + formKey)
      .then((res) => setForm(res.data.form))
      .catch((error) => {
        toast.error(error.response?.data?.message || "Recruitment form not found.");
      })
      .finally(() => setLoading(false));
  }, [formKey]);

  const sections = form?.sections || {};
  const activityOptions = form?.activityOptions || [];
  const specializationOptions = form?.specializationOptions || [];
  const normalizedStudentId = normalizeStudentId(values["Student ID"]);
  const validStudentId = isValidStudentId(normalizedStudentId);
  const derivedUniversityEmail = validStudentId
    ? studentIdToEmail(normalizedStudentId)
    : "";

  const statusMessage = useMemo(() => {
    if (!form) return "";
    if (form.acceptingSubmissions) return "";
    if (form.status === "draft") return "This recruitment has not opened yet.";
    if (form.status === "closed") return "This recruitment is closed.";
    return "This recruitment is not accepting applications.";
  }, [form]);

  const setField = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const toggleList = (key, item, checked) => {
    setValues((current) => {
      const existing = Array.isArray(current[key]) ? current[key] : [];
      return {
        ...current,
        [key]: checked
          ? [...new Set([...existing, item])]
          : existing.filter((value) => value !== item),
      };
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form?.acceptingSubmissions) return;

    if (sections.personal && !validStudentId) {
      toast.error("Enter a valid EWU Student ID, e.g. 2023-3-60-375");
      return;
    }

    const submissionData = {
      ...values,
      "Student ID": normalizedStudentId,
      "University Email": derivedUniversityEmail,
    };

    try {
      setSubmitting(true);
      await publicApi.post("/forms/" + form.formKey, {
        source: window.location.href,
        data: submissionData,
      });
      setSubmitted(true);
      toast.success("Application submitted successfully.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Application submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <span className="loading loading-spinner loading-lg text-accent" />
      </div>
    );
  }

  if (!form) {
    return (
      <div className="mx-auto max-w-3xl py-24 text-center">
        <h1 className="text-3xl font-black">Recruitment form not found</h1>
        <Link to="/" className="btn btn-primary mt-6">Back Home</Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl py-24 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent/10 text-3xl text-accent">
          ✓
        </div>
        <h1 className="mt-6 text-4xl font-black">Application Submitted</h1>
        <p className="mt-3 text-base-content/60">
          Your information has been received by EWU Cyber Security Club.
        </p>
        <Link to="/" className="btn btn-primary mt-7">Back to EWUCSC</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-base-100/70 px-6 py-12 text-center shadow-2xl md:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.12),transparent_30%)]" />
        <div className="relative">
          <div className="badge badge-outline badge-accent gap-2 px-4 py-3 font-mono">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {form.badge || "Member Recruitment"}
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
            Ready to <span className="text-accent">Join Us?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-base-content/60">
            {form.intro}
          </p>
          <p className="mt-4 font-mono text-sm font-bold text-primary">{form.title}</p>
        </div>
      </section>

      <section className="my-10 grid gap-5 md:grid-cols-2">
        {benefits.map((item) => (
          <article key={item.title} className="flex gap-4 rounded-2xl border border-white/5 bg-base-100/45 p-5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
              {item.icon}
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-wide">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-base-content/55">{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      {!form.acceptingSubmissions ? (
        <section className="rounded-[2rem] border border-warning/20 bg-warning/5 p-10 text-center">
          <FaGraduationCap className="mx-auto text-4xl text-warning" />
          <h2 className="mt-4 text-2xl font-black">{statusMessage}</h2>
          <p className="mt-2 text-base-content/55">
            Member login remains available through the Member Portal.
          </p>
          <Link to="/login" className="btn btn-outline mt-6">Member Portal</Link>
        </section>
      ) : (
        <form
          onSubmit={submit}
          className="rounded-[2rem] border border-white/5 bg-base-100/70 p-5 shadow-2xl md:p-8"
        >
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => setField("website", event.target.value)}
            className="hidden"
            aria-hidden="true"
          />

          {sections.personal && (
            <section className="mb-10">
              <SectionHeader number="01" title="Personal Information" description="Tell us a little about yourself." />
              <div className="grid gap-4 md:grid-cols-2">
                <input required className={inputClass} placeholder="Full Name *" value={values["Full Name"]} onChange={(e) => setField("Full Name", e.target.value)} />
                <div>
                  <input
                    required
                    className={inputClass}
                    placeholder="EWU Student ID * — 2023-3-60-375"
                    value={values["Student ID"]}
                    onChange={(e) => setField("Student ID", e.target.value)}
                  />
                  <p className="mt-2 px-1 text-xs text-base-content/45">
                    Enter your Student ID only. Your EWU email is generated automatically.
                  </p>
                </div>
                <div>
                  <input
                    readOnly
                    type="email"
                    className={inputClass + " cursor-not-allowed opacity-80"}
                    placeholder="University Email — auto-generated"
                    value={derivedUniversityEmail}
                  />
                  <p className="mt-2 px-1 text-xs text-base-content/45">
                    {derivedUniversityEmail || "Example: 2023-3-60-375@std.ewubd.edu"}
                  </p>
                </div>
                <input className={inputClass} placeholder="Contact Number" value={values["Contact Number"]} onChange={(e) => setField("Contact Number", e.target.value)} />
                <input required className={inputClass} placeholder="Department *" value={values.Department} onChange={(e) => setField("Department", e.target.value)} />
                <input required className={inputClass} placeholder="Current Semester *" value={values["Current Semester"]} onChange={(e) => setField("Current Semester", e.target.value)} />
              </div>
            </section>
          )}

          {sections.activities && (
            <section className="mb-10">
              <SectionHeader number="02" title="Club Activities" description="What areas of club activities interest you the most?" />
              <div className="grid gap-3 md:grid-cols-2">
                {activityOptions.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 bg-base-200/35 p-4">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      checked={values["Club Activities"].includes(option)}
                      onChange={(e) => toggleList("Club Activities", option, e.target.checked)}
                    />
                    <span className="font-semibold">{option}</span>
                  </label>
                ))}
              </div>
              {values["Club Activities"].includes("Other") && (
                <input className={inputClass + " mt-4"} placeholder="Please specify other interest" value={values["Activity Other"]} onChange={(e) => setField("Activity Other", e.target.value)} />
              )}
            </section>
          )}

          {sections.specialization && (
            <section className="mb-10">
              <SectionHeader number="03" title="Specialization" description="Which of these topics do you specialize in?" />
              <div className="grid gap-3 md:grid-cols-2">
                {specializationOptions.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 bg-base-200/35 p-4">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      checked={values.Specialization.includes(option)}
                      onChange={(e) => toggleList("Specialization", option, e.target.checked)}
                    />
                    <span className="font-semibold">{option}</span>
                  </label>
                ))}
              </div>
              {values.Specialization.includes("Other") && (
                <input className={inputClass + " mt-4"} placeholder="Please specify specialization" value={values["Specialization Other"]} onChange={(e) => setField("Specialization Other", e.target.value)} />
              )}
            </section>
          )}

          {sections.experience && (
            <section className="mb-10">
              <SectionHeader number="04" title="Experience Level" description="No previous experience is required." />
              <div className="flex flex-wrap gap-3">
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <label key={level} className={"btn rounded-full " + (values["Experience Level"] === level ? "btn-secondary" : "btn-outline")}>
                    <input
                      type="radio"
                      name="experience"
                      className="hidden"
                      checked={values["Experience Level"] === level}
                      onChange={() => setField("Experience Level", level)}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </section>
          )}

          {sections.clubHistory && (
            <section className="mb-10">
              <SectionHeader number="05" title="Club History" description="Have you been a member of another EWU club or organization?" />
              <div className="flex gap-3">
                {["Yes", "No"].map((answer) => (
                  <label key={answer} className={"btn rounded-full " + (values["Previous Club"] === answer ? "btn-secondary" : "btn-outline")}>
                    <input
                      type="radio"
                      name="previousClub"
                      className="hidden"
                      checked={values["Previous Club"] === answer}
                      onChange={() => setField("Previous Club", answer)}
                    />
                    {answer}
                  </label>
                ))}
              </div>
            </section>
          )}

          {sections.onlinePresence && (
            <section className="mb-10">
              <SectionHeader number="06" title="Online Presence" description="Share any profiles you would like us to review." />
              <div className="grid gap-4 md:grid-cols-2">
                <input type="url" className={inputClass} placeholder="Facebook Profile URL" value={values["Facebook URL"]} onChange={(e) => setField("Facebook URL", e.target.value)} />
                <input type="url" className={inputClass} placeholder="LinkedIn Profile URL" value={values["LinkedIn URL"]} onChange={(e) => setField("LinkedIn URL", e.target.value)} />
                <input type="url" className={inputClass + " md:col-span-2"} placeholder="GitHub / Portfolio URL" value={values["GitHub / Portfolio URL"]} onChange={(e) => setField("GitHub / Portfolio URL", e.target.value)} />
              </div>
            </section>
          )}

          {sections.tellUsMore && (
            <section className="mb-8">
              <SectionHeader number="07" title="Tell Us More" description="A few short questions to help us know you better." />
              <div className="space-y-4">
                <textarea className={textAreaClass} placeholder="Why are you interested in joining the Cyber Security Club?" value={values["Why Join"]} onChange={(e) => setField("Why Join", e.target.value)} />
                <textarea className={textAreaClass} placeholder="Do you have prior cybersecurity or related experience? If yes, describe it." value={values["Prior Experience"]} onChange={(e) => setField("Prior Experience", e.target.value)} />
                <textarea className={textAreaClass} placeholder="What activities would you like the club to focus on?" value={values["Suggested Activities"]} onChange={(e) => setField("Suggested Activities", e.target.value)} />
              </div>
            </section>
          )}

          <div className="border-t border-white/5 pt-6 text-center">
            <button type="submit" disabled={submitting} className="btn btn-accent btn-lg w-full rounded-xl font-black">
              {submitting ? "Submitting..." : "Join EWU Cyber Security Club"}
            </button>
            <p className="mt-3 text-xs text-base-content/40">
              Your information will only be used for EWUCSC recruitment purposes.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default RecruitmentForm;
