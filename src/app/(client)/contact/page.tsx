"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import { communicationRequest } from "@/lib/communication-client";
export default function ContactPage() {
  const [email, setEmail] = useState("pandawebservice@gmail.com");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const requestId = useRef("");
  useEffect(() => {
    const controller = new AbortController();
    void communicationRequest<{ email: string }>("/api/contact/settings", {
      signal: controller.signal,
    })
      .then((data) => setEmail(data.email))
      .catch(() => {});
    return () => controller.abort();
  }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    requestId.current ||= crypto.randomUUID();
    try {
      await communicationRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          ...Object.fromEntries(form),
          requestId: requestId.current,
        }),
      });
      setSent(true);
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : "Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="gc-site">
      <section className="gc-page-hero">
        <div className="gc-container">
          <span className="gc-eyebrow">Contact GoCloudEx</span>
          <h1>
            Tell us what
            <br />
            <span>you have in mind.</span>
          </h1>
          <p className="gc-lead">
            A new website, a useful application or a better way to do things.
            Let’s talk about your next step.
          </p>
        </div>
      </section>
      <section className="gc-section">
        <div className="gc-container gc-contact-grid">
          <aside className="gc-contact-aside">
            <span className="gc-eyebrow">Start a conversation</span>
            <h2>
              Good projects
              <br />
              begin with a hello.
            </h2>
            <p>
              Share your goals, the work you need and any timing you have in
              mind. We’ll take it from there.
            </p>
            <a className="gc-contact-method" href={`mailto:${email}`}>
              <Mail size={23} />
              <span>
                <small>Email the studio</small>
                <strong>{email}</strong>
              </span>
              <ArrowUpRight size={20} />
            </a>
            <button
              className="gc-contact-method"
              onClick={() =>
                window.dispatchEvent(new Event("gocloudex:open-chat"))
              }
            >
              <MessageCircle size={23} />
              <span>
                <small>Prefer a conversation?</small>
                <strong>Open website chat</strong>
              </span>
              <ArrowUpRight size={20} />
            </button>
            <p className="gc-contact-note">
              Your enquiry goes to our team’s inbox. We use your details to
              respond to your request.
            </p>
          </aside>
          <div className="gc-contact-card">
            {sent ? (
              <div className="gc-contact-success" role="status">
                <CheckCircle2 size={44} />
                <h2>Thanks for reaching out.</h2>
                <p>
                  Your message is saved in our inbox. Our team will reply to the
                  email address you provided.
                </p>
                <button
                  className="gc-comm-button"
                  onClick={() => {
                    requestId.current = "";
                    setSent(false);
                  }}
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="gc-communication-form">
                <h2>A little about your project</h2>
                <div className="gc-form-columns">
                  <label>
                    Your name
                    <input
                      name="name"
                      required
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Your name"
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label>
                  What can we help with?
                  <input
                    name="subject"
                    required
                    maxLength={180}
                    placeholder="A website, an app, an improvement…"
                  />
                </label>
                <label>
                  Project details
                  <textarea
                    name="message"
                    rows={7}
                    required
                    minLength={10}
                    maxLength={10000}
                    placeholder="Tell us about your goals, scope and timeline."
                  />
                </label>
                <label className="gc-honeypot" aria-hidden="true">
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
                {error && (
                  <p role="alert" className="gc-form-error">
                    {error}
                  </p>
                )}
                <button className="gc-comm-button" disabled={busy}>
                  {busy ? "Saving your enquiry…" : "Send enquiry"}
                  <ArrowUpRight size={18} />
                </button>
                <small>
                  We’ll reply by email. No account is needed to send an enquiry.
                </small>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
