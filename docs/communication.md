# Chat and contact mailbox

The website chat and the dashboard Team inbox share persisted conversations. Open conversations refresh every three seconds, with activity heartbeats, short-lived typing indicators, unread counts, sent/read ticks and retryable optimistic messages. Closed visitor chat refreshes every twenty seconds. Hidden browser tabs stop polling. This uses HTTP polling compatible with Vercel; it is not a WebSocket or push-notification service.

Visitors choose a password. New passwords are bcrypt hashed and authentication uses an HttpOnly cookie. Existing valid browser tokens are migrated to that cookie; existing plaintext passwords are hashed after a successful sign-in. Contact-only records created by the new form can start a chat without exposing another conversation. Existing chat histories are retained and earlier messages can be loaded in batches of 100. The team list currently shows the 100 most recently active conversations.

## Mailbox setup

Open **Dashboard → Settings → Email & enquiries**.

1. Set **Receive enquiries at** and **Public contact email**. Both initially default to `pandawebservice@gmail.com`. The first receives forwarded enquiries; the second appears on the Contact page.
2. Choose the sending connection. **Existing hosting email connection** preserves the configured server SMTP sender. Changing the receiving address alone does not change that sender.
3. To send as Gmail, select **Gmail app password**, enter the sending email and its Google app password, then save. Google requires an eligible account with 2-Step Verification: https://support.google.com/accounts/answer/185833. Enter this secret directly in the dashboard, never in a chat or source file.
4. Other mailboxes use their provider's public SMTP hostname, email/password and TLS port 465 or STARTTLS port 587.
5. **Check saved connection** verifies the saved SMTP credentials without sending a message.

Passwords are encrypted with AES-256-GCM. Set a stable, secret `EMAIL_SETTINGS_KEY` in hosting for a dedicated encryption key; the existing `JWT_SECRET` is the fallback. Changing the encryption key requires entering the mailbox password again. Saved secrets are never returned to the browser. TLS certificate verification remains enabled; dashboard-configured SMTP hosts cannot point at private/local network addresses.

## Contact inbox

The form saves the complete enquiry before attempting a notification. Dashboard → Emails supports reading, searching and replying to those enquiries. Delivery status indicates mail-server acceptance, failure or pending delivery; it does not claim recipient delivery or opens. Failed delivery can be retried. Repeated requests reuse message IDs to prevent duplicate records and ordinary duplicate sends. If a process terminates during delivery, a pending record remains saved; administrators can retry after the delivery lease expires.

This is a website enquiry inbox, not Gmail/IMAP synchronization. Replies received directly by the configured mailbox remain there. Older records only contain the short summary saved by the old application; the UI labels those records instead of inventing missing message content.

## Local verification

`npm test` runs the existing appearance and portfolio checks. `npm run lint:communication` checks the new communication surfaces and API code. `npm run build` includes TypeScript checks.

Integration tests use a temporary MongoDB server and local TLS SMTP sink. They never use production credentials or send external email. After installing dependencies and building:

```powershell
New-Item -ItemType Directory -Force .test-communication
& 'C:\Program Files\Git\usr\bin\openssl.exe' req -x509 -newkey rsa:2048 -nodes -keyout .test-communication/key.pem -out .test-communication/cert.pem -days 2 -subj '/CN=localhost' -addext 'subjectAltName=DNS:localhost,IP:127.0.0.1'
node tests/communication-server.mjs
```

Wait for the server to report Ready, then run `node tests/communication.integration.mjs` in another terminal. Use a fresh test server for each full run. The fixture uses ports 4322 and 2525 and an automatically assigned MongoDB port. Test credentials are explicitly fictional and apply only to this isolated server. Stop the fixture after testing. `.test-communication` is ignored by Git.

Coverage includes protected routes, actual admin login, TLS SMTP, full message storage, request deduplication, escaping, contact-to-chat registration, cookie authentication, hashed passwords, live activity/read receipts, dashboard replies, mailbox changes, encrypted secret preservation, local-host rejection and failed-delivery recovery. Production Gmail authentication requires the owner's app password and is not covered by the local SMTP test.
