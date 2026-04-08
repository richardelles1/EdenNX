import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";

const subjects = [
  "Product Demo",
  "Partnership Inquiry",
  "Press",
  "General",
];

export default function Contact() {
  useScrollReveal();
  useSEO({
    title: "Contact -- EdenNX",
    description:
      "Get in touch with EdenNX. Whether you're interested in a product demo, a partnership, or just want to learn more, we'd love to hear from you.",
  });

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (!form.subject) errs.subject = "Please select a subject.";
    if (!form.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const subject = encodeURIComponent(
      `[EdenNX Contact] ${form.subject} -- ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`
    );
    window.location.href = `mailto:support@edennx.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div className="pt-16">
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="mb-14">
          <h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 reveal"
            data-testid="contact-headline"
          >
            Get in touch.
          </h1>
          <p
            className="text-lg text-muted-foreground max-w-xl leading-relaxed reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            Whether you're interested in a product demo, a partnership, or just
            want to learn more about what we're building, we'd love to hear from
            you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3 reveal" style={{ transitionDelay: "0.15s" }}>
            {submitted ? (
              <div
                className="rounded-xl border border-primary/30 bg-primary/5 p-10 text-center"
                data-testid="contact-confirmation"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Thanks, we'll be in touch shortly.
                </h2>
                <p className="text-muted-foreground text-sm">
                  Your message has been sent to support@edennx.com.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                data-testid="contact-form"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      data-testid="input-name"
                      className={`w-full rounded-md border px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                        errors.name ? "border-destructive" : "border-input"
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      data-testid="input-company"
                      className="w-full rounded-md border border-input px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                      placeholder="Your organization"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    data-testid="input-email"
                    className={`w-full rounded-md border px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                      errors.email ? "border-destructive" : "border-input"
                    }`}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Subject <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    data-testid="input-subject"
                    className={`w-full rounded-md border px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                      errors.subject ? "border-destructive" : "border-input"
                    }`}
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-xs text-destructive mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    data-testid="input-message"
                    className={`w-full rounded-md border px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none ${
                      errors.message ? "border-destructive" : "border-input"
                    }`}
                    placeholder="Tell us more..."
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  data-testid="button-submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div
            className="lg:col-span-2 reveal"
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="rounded-xl border border-border bg-card p-8 space-y-6">
              <h2 className="text-lg font-bold text-foreground">Contact Information</h2>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:support@edennx.com"
                    data-testid="contact-email"
                    className="text-sm text-primary hover:underline"
                  >
                    support@edennx.com
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                    LinkedIn
                  </p>
                  <a
                    href="https://www.linkedin.com/company/edennx"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-linkedin"
                    className="text-sm text-primary hover:underline"
                  >
                    linkedin.com/company/edennx
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                    Location
                  </p>
                  <p className="text-sm text-foreground/80">United States</p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For enterprise inquiries and partnership discussions, please
                  include your company name and a brief description of your
                  needs. Our team typically responds within 1-2 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
