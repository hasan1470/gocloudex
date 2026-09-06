"use client";
import { useEffect, useState } from "react";
import { Mail, ShieldCheck, Save } from "lucide-react";
import { communicationRequest } from "@/lib/communication-client";
interface Settings {
  inboxEmail: string;
  publicEmail: string;
  senderName: string;
  provider: "environment" | "gmail" | "smtp";
  smtpUser: string;
  smtpHost: string;
  smtpPort: 465 | 587;
  hasPassword: boolean;
  sendingAddress: string;
  configured: boolean;
}
export default function MailSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [password, setPassword] = useState("");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    void communicationRequest<Settings>(
      "/api/admin/settings",
      { signal: controller.signal },
      true,
    )
      .then(setSettings)
      .catch(() => {
        if (!controller.signal.aborted)
          setError("Could not load settings. Refresh this page to retry.");
      });
    return () => controller.abort();
  }, []);
  function update(values: Partial<Settings>) {
    setSettings((old) => (old ? { ...old, ...values } : old));
    setDirty(true);
    setNotice("");
  }
  async function save(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const result = await communicationRequest<Settings>(
        "/api/admin/settings",
        { method: "PUT", body: JSON.stringify({ ...settings, password }) },
        true,
      );
      setSettings(result);
      setPassword("");
      setDirty(false);
      setNotice(
        "Mailbox settings saved. New enquiries and replies use these settings.",
      );
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : "Could not save settings.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function test() {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const result = await communicationRequest<{ message: string }>(
        "/api/admin/settings",
        { method: "POST" },
        true,
      );
      setNotice(result.message);
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : "Connection failed.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="gc-mail-settings">
      <div className="gc-settings-heading">
        <Mail size={24} />
        <div>
          <h2>Email & enquiries</h2>
          <p>
            Choose where enquiries arrive and which mailbox sends your replies.
          </p>
        </div>
      </div>
      {error && (
        <p className="gc-form-error" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="gc-form-success" role="status">
          {notice}
        </p>
      )}
      {!settings ? (
        !error && <p>Loading mailbox settings…</p>
      ) : (
        <form className="gc-communication-form" onSubmit={save}>
          <div className="gc-form-columns">
            <label>
              Receive enquiries at
              <input
                type="email"
                required
                maxLength={254}
                value={settings.inboxEmail}
                onChange={(event) => update({ inboxEmail: event.target.value })}
              />
              <small>
                New contact submissions are forwarded here and saved in the
                dashboard.
              </small>
            </label>
            <label>
              Public contact email
              <input
                type="email"
                required
                maxLength={254}
                value={settings.publicEmail}
                onChange={(event) =>
                  update({ publicEmail: event.target.value })
                }
              />
              <small>Shown on the Contact page.</small>
            </label>
          </div>
          <hr />
          <h3>Sending mailbox</h3>
          <div className="gc-form-columns">
            <label>
              Connection
              <select
                value={settings.provider}
                onChange={(event) => {
                  setPassword("");
                  update({
                    provider: event.target.value as Settings["provider"],
                    ...(event.target.value === "gmail"
                      ? {
                          smtpUser: settings.inboxEmail,
                          smtpHost: "smtp.gmail.com",
                          smtpPort: 465,
                        }
                      : {}),
                  });
                }}
              >
                <option value="environment">
                  Existing hosting email connection
                </option>
                <option value="gmail">Gmail app password</option>
                <option value="smtp">Other SMTP mailbox</option>
              </select>
            </label>
            <label>
              Sender display name
              <input
                required
                maxLength={80}
                value={settings.senderName}
                onChange={(event) => update({ senderName: event.target.value })}
              />
            </label>
          </div>
          {settings.provider === "environment" ? (
            <p className="gc-settings-note">
              {settings.configured
                ? `Replies use the existing server connection: ${settings.sendingAddress}.`
                : "No existing sending connection was found. Choose Gmail or another SMTP mailbox."}{" "}
              Changing the receiving address does not change this sender.
            </p>
          ) : (
            <>
              <div className="gc-form-columns">
                <label>
                  Sending email address
                  <input
                    type="email"
                    required
                    autoComplete="username"
                    value={settings.smtpUser}
                    onChange={(event) =>
                      update({ smtpUser: event.target.value })
                    }
                  />
                </label>
                <label>
                  {settings.provider === "gmail"
                    ? "Gmail app password"
                    : "SMTP password"}
                  <input
                    type="password"
                    autoComplete="new-password"
                    maxLength={500}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setDirty(true);
                    }}
                    placeholder={
                      settings.hasPassword
                        ? "Saved securely · leave blank to keep"
                        : "Enter mailbox app password"
                    }
                  />
                  <small>
                    Encrypted on the server. Saved passwords are never returned
                    to this form.
                  </small>
                </label>
              </div>
              {settings.provider === "gmail" ? (
                <p className="gc-settings-note">
                  Use a Gmail app password with 2-Step Verification enabled, not
                  your normal Google password.{" "}
                  <a
                    href="https://support.google.com/accounts/answer/185833"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google’s setup instructions ↗
                  </a>
                </p>
              ) : (
                <div className="gc-form-columns">
                  <label>
                    SMTP hostname
                    <input
                      required
                      value={settings.smtpHost}
                      onChange={(event) =>
                        update({ smtpHost: event.target.value })
                      }
                      placeholder="smtp.your-provider.com"
                    />
                  </label>
                  <label>
                    Secure connection
                    <select
                      value={settings.smtpPort}
                      onChange={(event) =>
                        update({
                          smtpPort: Number(event.target.value) as 465 | 587,
                        })
                      }
                    >
                      <option value={465}>465 · TLS</option>
                      <option value={587}>587 · STARTTLS</option>
                    </select>
                  </label>
                </div>
              )}
            </>
          )}
          <div className="gc-settings-actions">
            <button className="gc-comm-button" disabled={busy}>
              <Save size={18} />
              {busy ? "Working…" : "Save email settings"}
            </button>
            <button
              className="gc-comm-button secondary"
              type="button"
              disabled={busy || dirty || !settings.configured}
              onClick={() => void test()}
            >
              <ShieldCheck size={18} />
              Check saved connection
            </button>
          </div>
          <small>
            Connection checks do not send an email. This inbox manages website
            enquiries and dashboard replies; it does not import your whole Gmail
            inbox.
          </small>
        </form>
      )}
    </section>
  );
}
