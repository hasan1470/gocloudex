"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { communicationRequest } from "@/lib/communication-client";

export interface ChatMessage {
  id: string;
  clientId?: string;
  message: string;
  sender: "user" | "admin";
  isRead: boolean;
  createdAt: string;
  status?: "sending" | "failed";
}
interface ChatData {
  messages: ChatMessage[];
  hasMore: boolean;
  unread: number;
  peer: { online: boolean; typing: boolean };
}
function merge(previous: ChatMessage[], incoming: ChatMessage[]) {
  const map = new Map(previous.map((message) => [message.id, message]));
  incoming.forEach((message) => map.set(message.id, message));
  return [...map.values()].sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  );
}
export function useConversation({
  admin = false,
  userId,
  enabled,
  active,
}: {
  admin?: boolean;
  userId?: string;
  enabled: boolean;
  active: boolean;
}) {
  const endpoint = admin ? "/api/admin/chats" : "/api/chat";
  const url = endpoint + (admin ? `?userId=${userId}` : "");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState<ChatMessage[]>([]);
  const [peer, setPeer] = useState({ online: false, typing: false });
  const [unread, setUnread] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const typingAt = useRef(0);
  const busy = useRef(false);
  const historyLoaded = useRef(false);
  const viewer = admin ? "admin" : "user";
  const refresh = useCallback(
    async (signal?: AbortSignal) => {
      if (busy.current) return;
      busy.current = true;
      try {
        const data = await communicationRequest<ChatData>(
          url,
          { signal },
          admin,
        );
        if (signal?.aborted) return;
        setMessages((old) => merge(old, data.messages));
        setPeer(data.peer);
        setUnread(data.unread);
        if (!historyLoaded.current) {
          setHasMore(data.hasMore);
          historyLoaded.current = true;
        }
        setError("");
        setLoading(false);
      } catch (failure) {
        if (!signal?.aborted) {
          setError(
            failure instanceof Error ? failure.message : "Reconnecting…",
          );
          setLoading(false);
        }
      } finally {
        busy.current = false;
      }
    },
    [url, admin],
  );
  const activity = useCallback(
    async (data: { typing?: boolean; readIds?: string[] } = {}) => {
      if (!active || document.visibilityState !== "visible") return;
      try {
        await communicationRequest(
          endpoint,
          {
            method: "PATCH",
            body: JSON.stringify({ ...data, ...(admin ? { userId } : {}) }),
          },
          admin,
        );
      } catch {
        /* The next heartbeat retries. */
      }
    },
    [active, endpoint, admin, userId],
  );
  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    const update = () => {
      if (document.visibilityState === "visible")
        void refresh(controller.signal);
    };
    update();
    const timer = setInterval(update, active ? 3000 : 20000);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("online", update);
    return () => {
      controller.abort();
      clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("online", update);
    };
  }, [enabled, active, refresh]);
  useEffect(() => {
    if (!enabled || !active) return;
    void activity();
    const timer = setInterval(() => void activity(), 10000);
    return () => clearInterval(timer);
  }, [enabled, active, activity]);
  const typing = useCallback(
    (value: boolean) => {
      if (value && Date.now() - typingAt.current < 1800) return;
      typingAt.current = Date.now();
      void activity({ typing: value });
    },
    [activity],
  );
  const markRead = useCallback(async () => {
    if (!active || document.visibilityState !== "visible") return;
    const readIds = messages
      .filter((message) => message.sender !== viewer && !message.isRead)
      .slice(-100)
      .map((message) => message.id);
    if (!readIds.length) return;
    try {
      await communicationRequest(
        endpoint,
        {
          method: "PATCH",
          body: JSON.stringify({ readIds, ...(admin ? { userId } : {}) }),
        },
        admin,
      );
      setMessages((old) =>
        old.map((message) =>
          readIds.includes(message.id) ? { ...message, isRead: true } : message,
        ),
      );
      setUnread((count) => Math.max(0, count - readIds.length));
    } catch {
      /* Keep unread state until acknowledged. */
    }
  }, [active, messages, viewer, endpoint, admin, userId]);
  const send = useCallback(
    async (text: string, existing?: ChatMessage) => {
      const item: ChatMessage = existing || {
        id: crypto.randomUUID(),
        clientId: crypto.randomUUID(),
        message: text.trim(),
        sender: viewer,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      setPending((old) => [
        ...old.filter((message) => message.id !== item.id),
        { ...item, status: "sending" },
      ]);
      typing(false);
      try {
        const data = await communicationRequest<{ message: ChatMessage }>(
          endpoint,
          {
            method: "POST",
            body: JSON.stringify({
              message: item.message,
              clientId: item.clientId,
              ...(admin ? { userId } : {}),
            }),
          },
          admin,
        );
        setMessages((old) => merge(old, [data.message]));
        setPending((old) => old.filter((message) => message.id !== item.id));
        setError("");
      } catch (failure) {
        setPending((old) =>
          old.map((message) =>
            message.id === item.id ? { ...message, status: "failed" } : message,
          ),
        );
        setError(
          failure instanceof Error ? failure.message : "Message not sent.",
        );
      }
    },
    [viewer, typing, endpoint, admin, userId],
  );
  const older = async () => {
    if (!messages[0]) return;
    try {
      const data = await communicationRequest<ChatData>(
        url + (admin ? "&" : "?") + `before=${messages[0].id}`,
        {},
        admin,
      );
      setMessages((old) => merge(old, data.messages));
      setHasMore(data.hasMore);
    } catch {
      setError("Could not load earlier messages.");
    }
  };
  const combined = [
    ...messages,
    ...pending.filter(
      (item) => !messages.some((message) => message.clientId === item.clientId),
    ),
  ];
  return {
    messages: combined,
    peer,
    unread,
    hasMore,
    older,
    error,
    loading,
    refresh,
    send,
    typing,
    markRead,
    viewer,
  };
}
