"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Check,
  CheckCheck,
  Clock3,
  RotateCcw,
  Send,
  Smile,
} from "lucide-react";
import { useConversation } from "./useConversation";

export default function Conversation({
  chat,
}: {
  chat: ReturnType<typeof useConversation>;
}) {
  const [draft, setDraft] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [atBottom, setAtBottom] = useState(true);
  const area = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const latest = chat.messages.at(-1)?.id;
  const markRead = chat.markRead;
  useEffect(() => {
    if (atBottom && area.current)
      area.current.scrollTop = area.current.scrollHeight;
  }, [latest, atBottom, chat.peer.typing]);
  useEffect(() => {
    if (atBottom) void markRead();
  }, [atBottom, markRead]);
  function submit() {
    if (!draft.trim()) return;
    void chat.send(draft);
    setDraft("");
    setAtBottom(true);
    input.current?.focus();
  }
  return (
    <div className="gc-conversation">
      {chat.error && (
        <div className="gc-chat-notice" role="status">
          {chat.error}{" "}
          <button onClick={() => void chat.refresh()}>Reconnect</button>
        </div>
      )}
      <div
        ref={area}
        className="gc-chat-messages"
        role="log"
        aria-label="Conversation messages"
        aria-live="polite"
        onScroll={() => {
          const el = area.current;
          if (el)
            setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 70);
        }}
      >
        {chat.hasMore && (
          <button className="gc-chat-earlier" onClick={() => void chat.older()}>
            Load earlier messages
          </button>
        )}
        {chat.loading && <p className="gc-chat-empty">Loading conversation…</p>}
        {!chat.loading && !chat.messages.length && (
          <div className="gc-chat-empty">
            <strong>Let’s build something good.</strong>
            <p>
              Tell us a little about your project. A member of our team will
              reply here.
            </p>
            <div className="gc-chat-prompts">
              {["I need a website", "I have a project question"].map((text) => (
                <button
                  key={text}
                  onClick={() => {
                    setDraft(text);
                    input.current?.focus();
                  }}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        )}
        {chat.messages.map((message, index) => {
          const own = message.sender === chat.viewer;
          const date = new Date(message.createdAt).toLocaleDateString(
            undefined,
            { month: "short", day: "numeric" },
          );
          const previous = chat.messages[index - 1];
          const dateChanged =
            !previous ||
            new Date(previous.createdAt).toDateString() !==
              new Date(message.createdAt).toDateString();
          return (
            <div key={message.id}>
              {dateChanged && (
                <div className="gc-chat-date">
                  {new Date(message.createdAt).toDateString() ===
                  new Date().toDateString()
                    ? "Today"
                    : date}
                </div>
              )}
              <div className={`gc-chat-row ${own ? "is-own" : ""}`}>
                <div className="gc-chat-bubble">
                  <p>{message.message}</p>
                  <div className="gc-chat-meta">
                    <time dateTime={message.createdAt}>
                      {new Date(message.createdAt).toLocaleTimeString(
                        undefined,
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </time>
                    {own && (
                      <span
                        aria-label={
                          message.status === "sending"
                            ? "Sending"
                            : message.status === "failed"
                              ? "Not sent"
                              : message.isRead
                                ? "Read"
                                : "Sent"
                        }
                        title={message.isRead ? "Read" : "Sent"}
                      >
                        {message.status === "sending" ? (
                          <Clock3 size={14} />
                        ) : message.status === "failed" ? (
                          <RotateCcw size={14} />
                        ) : message.isRead ? (
                          <CheckCheck size={16} />
                        ) : (
                          <Check size={15} />
                        )}
                      </span>
                    )}
                  </div>
                  {message.status === "failed" && (
                    <button
                      className="gc-chat-retry"
                      onClick={() => void chat.send(message.message, message)}
                    >
                      Not sent · Retry
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {chat.peer.typing && (
          <div className="gc-chat-typing" role="status">
            <i />
            <i />
            <i />
            <span>
              {chat.viewer === "user"
                ? "Team is typing…"
                : "Visitor is typing…"}
            </span>
          </div>
        )}
      </div>
      {!atBottom && (
        <button className="gc-chat-jump" onClick={() => setAtBottom(true)}>
          <ArrowDown size={16} /> Latest messages
        </button>
      )}
      <form
        className="gc-chat-composer"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        {emoji && (
          <div className="gc-chat-emoji">
            {["👋", "😊", "👍", "🙏", "✅", "🎉", "💡", "🚀"].map((symbol) => (
              <button
                type="button"
                key={symbol}
                aria-label={`Insert ${symbol}`}
                onClick={() => {
                  setDraft((old) => old + symbol);
                  setEmoji(false);
                  input.current?.focus();
                }}
              >
                {symbol}
              </button>
            ))}
          </div>
        )}
        <button
          type="button"
          className="gc-icon-button"
          aria-label="Choose emoji"
          aria-expanded={emoji}
          onClick={() => setEmoji(!emoji)}
        >
          <Smile size={21} />
        </button>
        <textarea
          ref={input}
          rows={1}
          maxLength={4000}
          aria-label="Message"
          placeholder="Write a message…"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            chat.typing(!!event.target.value.trim());
          }}
          onBlur={() => chat.typing(false)}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();
              submit();
            }
          }}
        />
        <button
          className="gc-chat-send"
          type="submit"
          disabled={!draft.trim()}
          aria-label="Send message"
        >
          <Send size={19} />
        </button>
      </form>
      <div className="gc-chat-composer-note">
        Enter to send · Shift + Enter for a new line
      </div>
    </div>
  );
}
