import { json } from "../lib/server.js";

export function GET(request) {
  return json(200, {
    ok: true,
    service: "Pennywise AI",
    configuration: {
      openai: Boolean(process.env.OPENAI_API_KEY),
      hindsight: Boolean(
        process.env.HINDSIGHT_API_KEY &&
        process.env.HINDSIGHT_BANK_ID
      ),
      hindsightBaseUrl:
        process.env.HINDSIGHT_BASE_URL ||
        "https://api.hindsight.vectorize.io",
      demoMode: process.env.DEMO_MODE !== "false"
    },
    note:
      "Configuration only; this does not verify live provider connectivity."
  });
}
