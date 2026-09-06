import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { MongoClient, ObjectId } from "mongodb";
const origin = "http://127.0.0.1:4322";
let cookie = "",
  token = "";
async function request(path, method = "GET", body, who = "") {
  const response = await fetch(origin + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      ...(who === "admin"
        ? { Authorization: `Bearer ${token}` }
        : who === "visitor"
          ? { Cookie: cookie }
          : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  return {
    status: response.status,
    data: data.data ?? data,
    raw: data,
    cookie: response.headers.get("set-cookie")?.split(";")[0],
  };
}
const client = new MongoClient(
  JSON.parse(readFileSync(".test-communication/mongo.json")).uri,
);
await client.connect();
const db = client.db("communication_test");
try {
  assert.equal((await request("/api/admin/emails")).status, 401);
  assert.equal((await request("/api/admin/chats")).status, 401);
  assert.equal((await request("/api/admin/settings")).status, 401);
  assert.equal((await request("/api/chat")).status, 401);
  token = (
    await request("/api/auth", "POST", {
      email: "admin@example.test",
      password: "Test-admin-4322!",
    })
  ).data.token;
  assert.ok(token);
  const settings = (
    await request("/api/admin/settings", "GET", undefined, "admin")
  ).data;
  assert.equal(settings.inboxEmail, "pandawebservice@gmail.com");
  assert.equal(JSON.stringify(settings).includes("test-smtp-password"), false);
  assert.equal(
    (await request("/api/admin/settings", "POST", undefined, "admin")).status,
    200,
  );
  console.log(
    "PASS protected endpoints, real admin login, TLS SMTP connection",
  );
  const email = `visitor-${Date.now()}@example.test`;
  const contact = {
    name: "Test visitor",
    email,
    subject: `Integration enquiry ${Date.now()}`,
    message:
      '<script>alert("test")</script>\n' + "Full enquiry retained. ".repeat(20),
    website: "",
    requestId: randomUUID(),
  };
  assert.equal((await request("/api/contact", "POST", contact)).status, 200);
  assert.equal((await request("/api/contact", "POST", contact)).status, 200);
  const messages = await db
    .collection("messages")
    .find({ requestId: contact.requestId })
    .toArray();
  assert.equal(messages.length, 1);
  const enquiry = messages[0];
  assert.equal(enquiry.message, contact.message.trim());
  assert.equal(enquiry.deliveryStatus, "sent");
  const mails = JSON.parse(readFileSync(".test-communication/mail.json"));
  assert.equal(
    mails.filter((text) => text.includes(contact.subject)).length,
    1,
  );
  assert.ok(mails.at(-1).includes("pandawebservice@gmail.com"));
  assert.ok(mails.at(-1).includes("Reply-To: " + email));
  assert.ok(mails.at(-1).includes("&lt;script&gt;"));
  console.log(
    "PASS full contact persistence, deduplication, recipient, reply-to, HTML escaping",
  );
  const registration = await request("/api/chat/auth", "POST", {
    mode: "register",
    name: "Test visitor",
    email,
    password: "Visitor-test-4322!",
  });
  assert.equal(registration.status, 200);
  cookie = registration.cookie;
  const userId = registration.data.user.id;
  assert.ok(cookie);
  assert.equal(registration.raw.token, undefined);
  const stored = await db.collection("users").findOne({ email });
  assert.ok(stored.password.startsWith("$2"));
  const chat = { message: "Hello from the visitor", clientId: randomUUID() };
  let sent = await request("/api/chat", "POST", chat, "visitor");
  assert.equal(sent.status, 200);
  const messageId = sent.data.message.id;
  assert.equal(
    (await request("/api/chat", "POST", chat, "visitor")).data.message.id,
    messageId,
  );
  let history = (
    await request(
      `/api/admin/chats?userId=${userId}`,
      "GET",
      undefined,
      "admin",
    )
  ).data;
  assert.equal(history.messages.length, 1);
  assert.equal(history.unread, 1);
  assert.equal(
    (await request("/api/chat", "PATCH", { typing: true }, "visitor")).status,
    200,
  );
  history = (
    await request(
      `/api/admin/chats?userId=${userId}`,
      "GET",
      undefined,
      "admin",
    )
  ).data;
  assert.equal(history.peer.online, true);
  assert.equal(history.peer.typing, true);
  assert.equal(
    (
      await request(
        "/api/admin/chats",
        "PATCH",
        { userId, readIds: [messageId] },
        "admin",
      )
    ).status,
    200,
  );
  history = (await request("/api/chat", "GET", undefined, "visitor")).data;
  assert.equal(history.messages[0].isRead, true);
  sent = await request(
    "/api/admin/chats",
    "POST",
    { userId, message: "Reply from the team", clientId: randomUUID() },
    "admin",
  );
  assert.equal(sent.status, 200);
  assert.equal(sent.data.message.isRead, false);
  assert.equal(
    (
      await request(
        "/api/chat",
        "PATCH",
        { readIds: [sent.data.message.id] },
        "visitor",
      )
    ).status,
    200,
  );
  history = (
    await request(
      `/api/admin/chats?userId=${userId}`,
      "GET",
      undefined,
      "admin",
    )
  ).data;
  assert.equal(history.messages[1].isRead, true);
  assert.equal(history.unread, 0);
  assert.equal(
    (await request("/api/admin/emails", "GET", undefined, "visitor")).status,
    401,
  );
  const login = await request("/api/chat/auth", "POST", {
    mode: "login",
    email,
    password: "Visitor-test-4322!",
  });
  assert.equal(login.status, 200);
  assert.equal(
    (
      await request("/api/chat/auth", "POST", {
        mode: "register",
        email,
        name: "Takeover",
        password: "different-password",
      })
    ).status,
    409,
  );
  console.log(
    "PASS contact-to-chat registration, hashed password, cookie auth, message deduplication, actual typing/presence, read receipts",
  );
  const ownCookie = cookie;
  const legacyEmail = `legacy-${Date.now()}@example.test`;
  await db
    .collection("users")
    .insertOne({
      name: "Legacy visitor",
      email: legacyEmail,
      password: "legacy-test-password",
      chats: [],
      chatCount: 0,
      chatUnreadCount: 0,
    });
  const legacyLogin = await request("/api/chat/auth", "POST", {
    mode: "login",
    email: legacyEmail,
    password: "legacy-test-password",
  });
  assert.equal(legacyLogin.status, 200);
  assert.ok(
    (
      await db.collection("users").findOne({ email: legacyEmail })
    ).password.startsWith("$2"),
  );
  cookie = legacyLogin.cookie;
  assert.equal(
    (await request(`/api/chat?userId=${userId}`, "GET", undefined, "visitor"))
      .data.messages.length,
    0,
  );
  cookie = ownCookie;
  await db
    .collection("users")
    .updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: { lastSeenAt: new Date(0), userTypingUntil: new Date(0) },
        $push: {
          chats: {
            $each: Array.from({ length: 105 }, (_, index) => ({
              _id: new ObjectId(),
              clientId: randomUUID(),
              message: `History ${index}`,
              sender: "user",
              isRead: true,
              createdAt: new Date(Date.now() + index),
            })),
          },
        },
      },
    );
  history = (
    await request(
      `/api/admin/chats?userId=${userId}`,
      "GET",
      undefined,
      "admin",
    )
  ).data;
  assert.equal(history.messages.length, 100);
  assert.equal(history.hasMore, true);
  assert.equal(history.peer.online, false);
  assert.equal(history.peer.typing, false);
  const earlier = (
    await request(
      `/api/admin/chats?userId=${userId}&before=${history.messages[0].id}`,
      "GET",
      undefined,
      "admin",
    )
  ).data;
  assert.equal(earlier.messages.length, 7);
  assert.equal(earlier.hasMore, false);
  console.log(
    "PASS legacy password migration, cross-account isolation, expired presence and paginated history",
  );
  const replyRequest = {
    id: String(enquiry._id),
    message: "Thanks for your enquiry.",
    requestId: randomUUID(),
  };
  const reply = await request(
    "/api/admin/emails",
    "POST",
    replyRequest,
    "admin",
  );
  assert.equal(reply.status, 200);
  assert.equal(reply.data.deliveryStatus, "sent");
  await request("/api/admin/emails", "POST", replyRequest, "admin");
  assert.equal(
    await db
      .collection("messages")
      .countDocuments({ requestId: replyRequest.requestId }),
    1,
  );
  const changed = {
    ...settings,
    inboxEmail: "changed@example.test",
    publicEmail: "public@example.test",
    password: "",
  };
  assert.equal(
    (await request("/api/admin/settings", "PUT", changed, "admin")).status,
    200,
  );
  assert.deepEqual((await request("/api/contact/settings")).data, {
    email: "public@example.test",
  });
  const gmail = {
    ...changed,
    provider: "gmail",
    smtpUser: "mailbox@example.test",
    smtpHost: "smtp.gmail.com",
    smtpPort: 465,
    password: "fictional-app-password",
  };
  const saved = await request("/api/admin/settings", "PUT", gmail, "admin");
  assert.equal(saved.status, 200);
  assert.equal(saved.data.hasPassword, true);
  assert.equal(JSON.stringify(saved).includes(gmail.password), false);
  const encrypted = await db
    .collection("communicationsettings")
    .findOne({ _id: "communication" });
  assert.ok(encrypted.encryptedPassword);
  assert.notEqual(encrypted.encryptedPassword, gmail.password);
  assert.equal(
    (
      await request(
        "/api/admin/settings",
        "PUT",
        { ...gmail, password: "" },
        "admin",
      )
    ).status,
    200,
  );
  assert.equal(
    (
      await request(
        "/api/admin/settings",
        "PUT",
        { ...gmail, smtpUser: "another@example.test", password: "" },
        "admin",
      )
    ).status,
    400,
  );
  // Dashboard-supplied private SMTP hosts must not connect, including localhost.
  assert.equal(
    (
      await request(
        "/api/admin/settings",
        "PUT",
        { ...gmail, provider: "smtp", smtpHost: "localhost", smtpPort: 587 },
        "admin",
      )
    ).status,
    400,
  );
  await db
    .collection("communicationsettings")
    .updateOne(
      { _id: "communication" },
      { $set: { provider: "smtp", smtpHost: "localhost", smtpPort: 587 } },
    );
  assert.equal(
    (await request("/api/admin/settings", "POST", undefined, "admin")).status,
    422,
  );
  const failedContact = {
    ...contact,
    subject: "Delivery failure retained",
    requestId: randomUUID(),
  };
  assert.equal(
    (await request("/api/contact", "POST", failedContact)).status,
    200,
  );
  const failed = await db
    .collection("messages")
    .findOne({ requestId: failedContact.requestId });
  assert.equal(failed.deliveryStatus, "failed");
  assert.equal(failed.message, contact.message.trim());
  await request("/api/admin/settings", "PUT", changed, "admin");
  assert.equal(
    (
      await request(
        "/api/admin/emails",
        "PATCH",
        { id: String(failed._id), action: "retry" },
        "admin",
      )
    ).status,
    200,
  );
  assert.equal(
    (await db.collection("messages").findOne({ _id: failed._id }))
      .deliveryStatus,
    "sent",
  );
  console.log(
    "PASS dashboard replies, editable addresses, encrypted secret preservation, private SMTP rejection, retained failed enquiry and retry",
  );
  console.log("All communication integration checks passed.");
} finally {
  await client.close();
}
