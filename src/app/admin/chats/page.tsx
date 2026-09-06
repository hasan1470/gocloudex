"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, MessageCircle, Search } from "lucide-react";
import { communicationRequest } from "@/lib/communication-client";
import Conversation from "@/components/communication/Conversation";
import { useConversation } from "@/components/communication/useConversation";
interface ChatUser {
  id: string;
  name: string;
  email: string;
  lastChatMessage: string;
  chatUnreadCount: number;
  isOnline: boolean;
}
function SelectedConversation({
  user,
  back,
}: {
  user: ChatUser;
  back: () => void;
}) {
  const chat = useConversation({
    admin: true,
    userId: user.id,
    enabled: true,
    active: true,
  });
  return (
    <div className="gc-admin-conversation">
      <header className="gc-inbox-conversation-header">
        <button
          className="gc-icon-button gc-chat-back"
          aria-label="Back to conversations"
          onClick={back}
        >
          <ArrowLeft size={21} />
        </button>
        <div className="gc-person-avatar">
          {user.name.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h2>{user.name}</h2>
          <p>
            {chat.peer.typing
              ? "Typing…"
              : chat.peer.online
                ? "Active in chat"
                : user.email}
          </p>
        </div>
      </header>
      <Conversation chat={chat} />
    </div>
  );
}
export default function AdminChatsPage() {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selected, setSelected] = useState<ChatUser | null>(null);
  const [search, setSearch] = useState("");
  const [unread, setUnread] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    let busy = false;
    async function load() {
      if (busy || document.visibilityState !== "visible") return;
      busy = true;
      try {
        const data = await communicationRequest<{ users: ChatUser[] }>(
          "/api/admin/chats",
          { signal: controller.signal },
          true,
        );
        setUsers(data.users);
        setError("");
      } catch {
        if (!controller.signal.aborted)
          setError("Could not refresh conversations. Reconnecting…");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
        busy = false;
      }
    }
    void load();
    const timer = setInterval(() => void load(), 5000);
    document.addEventListener("visibilitychange", load);
    return () => {
      controller.abort();
      clearInterval(timer);
      document.removeEventListener("visibilitychange", load);
    };
  }, []);
  const visible = users.filter(
    (user) =>
      (!unread || user.chatUnreadCount > 0) &&
      `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="gc-communication-admin">
      <div className="gc-workspace-title">
        <div>
          <span className="gc-eyebrow">Conversations</span>
          <h1>Team inbox</h1>
          <p>
            Reply to visitors, see activity and keep the conversation moving.
          </p>
        </div>
      </div>
      {error && (
        <p className="gc-form-error" role="status">
          {error}
        </p>
      )}
      <div className={`gc-chat-workspace ${selected ? "has-selection" : ""}`}>
        <aside className="gc-chat-list">
          <label className="gc-inbox-search">
            <Search size={18} />
            <input
              aria-label="Search conversations"
              placeholder="Search conversations"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <div className="gc-inbox-tabs">
            <button aria-pressed={!unread} onClick={() => setUnread(false)}>
              All
            </button>
            <button aria-pressed={unread} onClick={() => setUnread(true)}>
              Unread
            </button>
          </div>
          {loading && <p className="gc-inbox-empty">Loading conversations…</p>}
          {!loading && !visible.length && (
            <p className="gc-inbox-empty">No conversations here yet.</p>
          )}
          {visible.map((user) => (
            <button
              key={user.id}
              className={`gc-chat-list-item ${selected?.id === user.id ? "is-selected" : ""}`}
              onClick={() => setSelected(user)}
            >
              <span className="gc-person-avatar">
                {user.name.slice(0, 1).toUpperCase()}
                {user.isOnline && <i />}
              </span>
              <span>
                <strong>{user.name}</strong>
                <small>{user.lastChatMessage}</small>
              </span>
              {user.chatUnreadCount > 0 && <b>{user.chatUnreadCount}</b>}
            </button>
          ))}
        </aside>
        {selected ? (
          <SelectedConversation
            key={selected.id}
            user={selected}
            back={() => setSelected(null)}
          />
        ) : (
          <div className="gc-chat-workspace-empty">
            <MessageCircle size={44} />
            <h2>A good conversation starts with a reply.</h2>
            <p>Select a visitor to view their messages.</p>
          </div>
        )}
      </div>
    </div>
  );
}
