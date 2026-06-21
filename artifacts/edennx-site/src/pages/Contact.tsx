import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";

const CONTACT_EMAIL = "info@edennx.com";

// Web3Forms public access key. Safe to expose client-side by design (Web3Forms
// scopes it to your account and handles spam protection server-side).
const WEB3FORMS_ACCESS_KEY = "aa5ea71e-75c8-4ce1-967f-5497ea31b5aa";

const subjects = [
  "Product Demo",
  "Partnership Inquiry",
  "Press",
  "General",
];

export default function Contact() {
  useScrollReveal();
  useSEO({
    title: "Contact - EdenNX",
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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      // Send as FormData (multipart) so the browser issues a CORS "simple
      // request" with no preflight. A JSON body triggers an OPTIONS preflight
      // that Web3Forms rejects, which broke the live submit.
      const payload = new FormData();
      payload.append("access_key", WEB3FORMS_ACCESS_KEY);
      payload.append("from_name", "EdenNX Website");
      payload.append("subject", `[EdenNX Contact] ${form.subject} - ${form.name}`);
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("company", form.company || "Not provided");
      payload.append("inquiry_type", form.subject);
      payload.append("message", form.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(
          data.message || "Something went wrong. Please email us directly at " + CONTACT_EMAIL + "."
        );
      }
    } catch {
      setSubmitError(
        "We couldn't send your message. Please check your connection or email us directly at " + CONTACT_EMAIL + "."
      );
    } finally {
      setSubmitting(false);
    }
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
                  Your message has been sent to {CONTACT_EMAIL}.
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
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
                {submitError && (
                  <p className="text-sm text-destructive" data-testid="contact-error">
                    {submitError}
                  </p>
                )}
              </form>
            )}
          </div>

          <div
            className="lg:col-span-2 reveal"
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="rounded-xl border border-border bg-card p-8 space-y-6">
              <h2 className="text-lg font-bold text-foreground">Contact Information</h2>

              <div className="flex items-center gap-3 rounded-lg bg-primary/5 border border-primary/15 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <p className="text-sm text-foreground/80">
                  Typically replies within <span className="font-semibold text-foreground">1 to 2 business days</span>
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    data-testid="contact-email"
                    className="text-sm text-primary hover:underline"
                  >
                    {CONTACT_EMAIL}
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
              <div className="pt-5 border-t border-border space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For enterprise inquiries and partnership discussions, please
                  include your company name and a brief description of your needs.
                </p>
                <a
                  href="https://edenradar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  data-testid="contact-launch-edenradar"
                >
                  Looking for the product? Launch EdenRadar
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
