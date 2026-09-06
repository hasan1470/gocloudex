"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Search, Send, Settings } from "lucide-react";
import { communicationRequest } from "@/lib/communication-client";
interface Enquiry {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  deliveryStatus?: "pending" | "sent" | "failed";
  deliveryError?: string;
}
interface Legacy {
  _id: string;
  name: string;
  email: string;
  lastEmailSubject: string;
  lastEmailMessage: string;
}
function EmailThread({ id, back }: { id: string; back: () => void }) {
  const [data, setData] = useState<{
    message: Enquiry;
    replies: Enquiry[];
  } | null>(null);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [refreshedAt, setRefreshedAt] = useState(() => Date.now());
  const requestId = useRef("");
  const load = useCallback(async () => {
    try {
      setData(
        await communicationRequest(`/api/admin/emails?id=${id}`, {}, true),
      );
      setRefreshedAt(Date.now());
    } catch {
      setError("Could not load this enquiry.");
    }
  }, [id]);
  useEffect(() => {
    void load();
    void communicationRequest(
      "/api/admin/emails",
      { method: "PATCH", body: JSON.stringify({ id, action: "read" }) },
      true,
    ).catch(() => {});
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, 15000);
    return () => clearInterval(timer);
  }, [id, load]);
  async function reply(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    requestId.current ||= crypto.randomUUID();
    try {
      await communicationRequest(
        "/api/admin/emails",
        {
          method: "POST",
          body: JSON.stringify({
            id,
            message: draft,
            requestId: requestId.current,
          }),
        },
        true,
      );
      setDraft("");
      requestId.current = "";
      await load();
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : "Could not save reply.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function retry(messageId: string) {
    setBusy(true);
    try {
      await communicationRequest(
        "/api/admin/emails",
        {
          method: "PATCH",
          body: JSON.stringify({ id: messageId, action: "retry" }),
        },
        true,
      );
      await load();
    } catch {
      setError("Could not retry delivery.");
    } finally {
      setBusy(false);
    }
  }
  function delivery(item: Enquiry) {
    return (
      <div
        className={`gc-delivery-status ${item.deliveryStatus === "failed" ? "is-failed" : ""}`}
      >
        <span>
          {item.deliveryStatus === "sent"
            ? "Accepted by mail server"
            : item.deliveryStatus === "failed"
              ? "Email delivery failed · saved in dashboard"
              : "Saved · email delivery pending"}
        </span>
        {item.deliveryError && <p>{item.deliveryError}</p>}
        {(item.deliveryStatus === "failed" ||
          (item.deliveryStatus === "pending" &&
            refreshedAt - new Date(item.createdAt).getTime() > 60000)) && (
          <button disabled={busy} onClick={() => void retry(item._id)}>
            Retry email delivery
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="gc-email-thread">
      <button className="gc-thread-back" onClick={back}>
        <ArrowLeft size={17} /> Back to inbox
      </button>
      {error && (
        <p className="gc-form-error" role="alert">
          {error}
        </p>
      )}
      {!data ? (
        <p>Loading enquiry…</p>
      ) : (
        <>
          <header>
            <span className="gc-eyebrow">Website enquiry</span>
            <h2>{data.message.subject}</h2>
            <p>
              <strong>{data.message.name}</strong> ·{" "}
              <a href={`mailto:${data.message.email}`}>{data.message.email}</a>
            </p>
            <time>{new Date(data.message.createdAt).toLocaleString()}</time>
          </header>
          <div className="gc-email-body">{data.message.message}</div>
          {delivery(data.message)}
          {data.replies.map((item) => (
            <article key={item._id} className="gc-email-reply">
              <strong>GoCloudEx reply</strong>
              <time>{new Date(item.createdAt).toLocaleString()}</time>
              <div className="gc-email-body">{item.message}</div>
              {delivery(item)}
            </article>
          ))}
          <form
            className="gc-communication-form gc-email-reply-form"
            onSubmit={reply}
          >
            <label>
              Reply to {data.message.name}
              <textarea
                rows={5}
                maxLength={10000}
                required
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Write your reply…"
              />
            </label>
            <small>
              Sends from the mailbox configured in Settings to{" "}
              {data.message.email}.
            </small>
            <button className="gc-comm-button" disabled={busy || !draft.trim()}>
              <Send size={18} />
              {busy ? "Sending…" : "Send email reply"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
export default function EmailPage() {
  const [messages, setMessages] = useState<Enquiry[]>([]);
  const [legacy, setLegacy] = useState<Legacy[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [unread, setUnread] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      if (document.visibilityState !== "visible") return;
      try {
        const result = await communicationRequest<{
          messages: Enquiry[];
          legacy: Legacy[];
          total: number;
        }>(
          `/api/admin/emails?page=${page}&q=${encodeURIComponent(search)}&unread=${unread ? 1 : 0}`,
          { signal: controller.signal },
          true,
        );
        setMessages(result.messages);
        setLegacy(result.legacy);
        setTotal(result.total);
        setError("");
      } catch {
        if (!controller.signal.aborted)
          setError("Could not refresh the inbox.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    const initial = setTimeout(() => void load(), 250);
    const timer = setInterval(() => void load(), 10000);
    return () => {
      controller.abort();
      clearTimeout(initial);
      clearInterval(timer);
    };
  }, [search, unread, page]);
  return (
    <div className="gc-communication-admin">
      <div className="gc-workspace-title">
        <div>
          <span className="gc-eyebrow">Email enquiries</span>
          <h1>Contact inbox</h1>
          <p>Complete website enquiries, saved replies and delivery status.</p>
        </div>
        <Link href="/admin/settings" className="gc-comm-button secondary">
          <Settings size={18} /> Mailbox settings
        </Link>
      </div>
      {error && (
        <p className="gc-form-error" role="alert">
          {error}
        </p>
      )}
      <div className={`gc-email-workspace ${selected ? "has-selection" : ""}`}>
        <aside className="gc-email-list">
          <label className="gc-inbox-search">
            <Search size={18} />
            <input
              aria-label="Search enquiries"
              placeholder="Name, email or subject"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </label>
          <div className="gc-inbox-tabs">
            <button
              aria-pressed={!unread}
              onClick={() => {
                setUnread(false);
                setPage(1);
              }}
            >
              All enquiries
            </button>
            <button
              aria-pressed={unread}
              onClick={() => {
                setUnread(true);
                setPage(1);
              }}
            >
              Unread
            </button>
          </div>
          {loading && <p className="gc-inbox-empty">Loading inbox…</p>}
          {!loading && !messages.length && (
            <p className="gc-inbox-empty">No enquiries match this view.</p>
          )}
          {messages.map((message) => (
            <button
              className={`gc-email-list-item ${selected === message._id ? "is-selected" : ""} ${!message.isRead ? "is-unread" : ""}`}
              key={message._id}
              onClick={() => setSelected(message._id)}
            >
              <span>
                <strong>{message.name}</strong>
                <time>{new Date(message.createdAt).toLocaleDateString()}</time>
              </span>
              <b>{message.subject}</b>
              <small>{message.message.slice(0, 110)}</small>
              {!message.isRead && <i aria-label="Unread" />}
            </button>
          ))}
          {total > 25 && (
            <div className="gc-inbox-pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
              <span>
                {page} / {Math.ceil(total / 25)}
              </span>
              <button
                disabled={page * 25 >= total}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
          {!!legacy.length && (
            <details className="gc-legacy-enquiries">
              <summary>Older enquiry summaries ({legacy.length})</summary>
              <p>
                These records predate full-message storage. Original messages
                remain in the previous receiving mailbox.
              </p>
              {legacy.map((item) => (
                <article key={item._id}>
                  <strong>{item.lastEmailSubject}</strong>
                  <p>{item.lastEmailMessage}</p>
                  <a href={`mailto:${item.email}`}>
                    {item.name} · {item.email}
                  </a>
                </article>
              ))}
            </details>
          )}
        </aside>
        {selected ? (
          <EmailThread
            key={selected}
            id={selected}
            back={() => setSelected(null)}
          />
        ) : (
          <div className="gc-chat-workspace-empty">
            <Mail size={42} />
            <h2>Every enquiry, in one place.</h2>
            <p>Select a message to read it and reply by email.</p>
          </div>
        )}
      </div>
    </div>
  );
}
