// Isolated integration environment. No production database or mail service is used.
import { MongoMemoryServer } from "mongodb-memory-server";
import { SMTPServer } from "smtp-server";
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const mongo = await MongoMemoryServer.create({
  instance: { launchTimeout: 60000 },
});
let received = [];
const smtp = new SMTPServer({
  key: readFileSync(".test-communication/key.pem"),
  cert: readFileSync(".test-communication/cert.pem"),
  onAuth(auth, session, callback) {
    callback(null, { user: auth.username });
  },
  onData(stream, session, callback) {
    let text = "";
    stream.on("data", (chunk) => (text += chunk));
    stream.on("end", () => {
      received.push(text);
      writeFileSync(".test-communication/mail.json", JSON.stringify(received));
      callback();
    });
  },
});
await new Promise((resolve) => smtp.listen(2525, "127.0.0.1", resolve));
writeFileSync(
  ".test-communication/mongo.json",
  JSON.stringify({ uri: mongo.getUri() }),
);
const child = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "4322",
  ],
  {
    stdio: "inherit",
    windowsHide: true,
    env: {
      ...process.env,
      MONGODB_URI: mongo.getUri(),
      MONGODB_DB_NAME: "communication_test",
      EMAIL_SETTINGS_KEY: "isolated-mail-encryption-key",
      JWT_SECRET: "isolated-jwt-secret-communication-test-only",
      ADMIN_EMAIL: "admin@example.test",
      ADMIN_PASSWORD: "Test-admin-4322!",
      EMAIL_USER: "sender@example.test",
      EMAIL_PASSWORD: "test-smtp-password",
      EMAIL_HOST: "localhost",
      EMAIL_PORT: "2525",
      EMAIL_SERVICE_TYPE: "smtp",
      NODE_EXTRA_CA_CERTS: resolve(".test-communication/cert.pem"),
    },
  },
);
async function stop() {
  child.kill();
  smtp.close();
  await mongo.stop();
  process.exit();
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
child.on("exit", stop);
