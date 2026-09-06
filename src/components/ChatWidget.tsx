"use client";
import { useEffect, useRef, useState } from "react";
import {
  Cloud,
  MessageCircle,
  Minus,
  X,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react";
import { communicationRequest } from "@/lib/communication-client";
import Conversation from "@/components/communication/Conversation";
import { useConversation } from "@/components/communication/useConversation";
interface Visitor {
  id: string;
  name: string;
  email: string;
}

function Session({
  user,
  open,
  setOpen,
  logout,
}: {
  user: Visitor;
  open: boolean;
  setOpen: (value: boolean) => void;
  logout: () => void;
}) {
  const chat = useConversation({ enabled: true, active: open });
  return (
    <ChatFrame
      open={open}
      setOpen={setOpen}
      unread={chat.unread}
      subtitle={
        chat.peer.typing
          ? "Typing…"
          : chat.peer.online
            ? "Team active in this conversation"
            : "Leave a message · we’ll reply here"
      }
      online={chat.peer.online}
    >
      <div className="gc-chat-identity">
        <span>
          {user.name}
          <small>{user.email}</small>
        </span>
        <button
          className="gc-icon-button"
          aria-label="Sign out of chat"
          title="Sign out"
          onClick={logout}
        >
          <LogOut size={18} />
        </button>
      </div>
      <Conversation chat={chat} />
    </ChatFrame>
  );
}
function ChatFrame({
  open,
  setOpen,
  unread = 0,
  subtitle = "A conversation with our team",
  online = false,
  children,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  unread?: number;
  subtitle?: string;
  online?: boolean;
  children: React.ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [
          ...(panel.current?.querySelectorAll<HTMLElement>(
            'button:not(:disabled),input,textarea,a[href],[tabindex="0"]',
          ) || []),
        ].filter((item) => item.getClientRects().length);
        const first = items[0],
          last = items.at(-1);
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === panel.current)
        ) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = overflow;
    };
  }, [open, setOpen]);
  return (
    <>
      <button
        ref={trigger}
        className="gc-chat-launcher"
        aria-label={
          unread ? `Open chat, ${unread} unread messages` : "Chat with us"
        }
        aria-expanded={open}
        aria-controls="gocloudex-chat"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={25} /> : <MessageCircle size={26} />}
        {unread > 0 && !open && <span>{unread > 9 ? "9+" : unread}</span>}
      </button>
      <div className="gc-chat-overlay" hidden={!open}>
        <button
          className="gc-chat-backdrop"
          tabIndex={-1}
          aria-label="Close chat"
          onClick={() => setOpen(false)}
        />
        <div
          id="gocloudex-chat"
          ref={panel}
          className="gc-chat-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gc-chat-title"
          tabIndex={-1}
        >
          <header className="gc-chat-header">
            <div className="gc-chat-avatar">
              <Cloud size={25} />
              {online && <i />}
            </div>
            <div>
              <h2 id="gc-chat-title">GoCloudEx</h2>
              <p>{subtitle}</p>
            </div>
            <button
              className="gc-icon-button"
              aria-label="Minimize chat"
              onClick={() => {
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              <Minus size={21} />
            </button>
          </header>
          {children}
        </div>
      </div>
    </>
  );
}
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<Visitor | null>(null);
  const [mode, setMode] = useState<"register" | "login">("register");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    let token: string | null = null;
    try {
      token = localStorage.getItem("userToken");
    } catch {
      /* Cookies still work when local storage is unavailable. */
    }
    void communicationRequest<{ user: Visitor }>("/api/chat/auth", {
      signal: controller.signal,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((data) => {
        setUser(data.user);
        try {
          localStorage.removeItem("userToken");
        } catch {
          /* Legacy token cleanup is optional. */
        }
      })
      .catch(() => {});
    const show = () => setOpen(true);
    window.addEventListener("gocloudex:open-chat", show);
    return () => {
      controller.abort();
      window.removeEventListener("gocloudex:open-chat", show);
    };
  }, []);
  async function authenticate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const data = await communicationRequest<{ user: Visitor }>(
        "/api/chat/auth",
        {
          method: "POST",
          body: JSON.stringify({
            mode,
            name: mode === "register" ? form.get("name") : undefined,
            email: form.get("email"),
            password: form.get("password"),
          }),
        },
      );
      setUser(data.user);
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : "Could not connect.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    try {
      await communicationRequest("/api/chat/auth", { method: "DELETE" });
      setUser(null);
      localStorage.removeItem("userToken");
    } catch {
      setError("Could not sign out. Try again.");
    }
  }
  if (user)
    return (
      <Session
        key={user.id}
        user={user}
        open={open}
        setOpen={setOpen}
        logout={() => void logout()}
      />
    );
  return (
    <ChatFrame open={open} setOpen={setOpen}>
      <div className="gc-chat-welcome">
        <span className="gc-eyebrow">Let’s talk</span>
        <h3>
          {mode === "register"
            ? "Your next idea starts here."
            : "Welcome back."}
        </h3>
        <p>
          {mode === "register"
            ? "Start a conversation and keep your project questions in one place."
            : "Sign in to pick up your conversation."}
        </p>
        <div className="gc-chat-auth-tabs">
          <button
            aria-pressed={mode === "register"}
            onClick={() => {
              setMode("register");
              setError("");
            }}
          >
            Start a chat
          </button>
          <button
            aria-pressed={mode === "login"}
            onClick={() => {
              setMode("login");
              setError("");
            }}
          >
            Sign in
          </button>
        </div>
        <form
          onSubmit={authenticate}
          className="gc-communication-form"
          key={mode}
        >
          {mode === "register" && (
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                maxLength={100}
                required
                placeholder="How should we address you?"
              />
            </label>
          )}
          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              placeholder="you@example.com"
            />
          </label>
          <label>
            {mode === "register" ? "Choose a password" : "Password"}
            <span className="gc-password-field">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                minLength={mode === "register" ? 8 : 1}
                maxLength={72}
                autoComplete={
                  mode === "register" ? "new-password" : "current-password"
                }
                required
                placeholder={
                  mode === "register"
                    ? "At least 8 characters"
                    : "Your chat password"
                }
              />
              <button
                type="button"
                className="gc-icon-button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>
          {error && (
            <p className="gc-form-error" role="alert">
              {error}
            </p>
          )}
          <button className="gc-comm-button" disabled={busy}>
            {busy
              ? "Connecting…"
              : mode === "register"
                ? "Start conversation"
                : "Continue conversation"}
          </button>
        </form>
        <p className="gc-chat-privacy">
          Your conversation is private to you and our team. Keep your password
          to return on another device.
        </p>
        {mode === "login" && (
          <a className="gc-chat-help" href="/contact">
            Need help signing in? Contact the team
          </a>
        )}
      </div>
    </ChatFrame>
  );
}
