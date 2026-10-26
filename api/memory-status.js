import { json } from "../lib/server.js";
export default function handler(request) {
  if (request.method !== "GET") return json(405, { ok: false, error: "Method not allowed." });
  const configured = Boolean(process.env.HINDSIGHT_API_KEY && process.env.HINDSIGHT_BANK_ID);
  return json(200, { enabled: configured, configured, required: true, mode: process.env.DEMO_MODE !== "false" ? "single-user-demo" : "configured", message: configured ? "Hindsight credentials are configured; successful recall is verified on each chat request." : "Hindsight is required. Configure HINDSIGHT_API_KEY and HINDSIGHT_BANK_ID." });
}
