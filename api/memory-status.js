import { json } from "../lib/server.js";

export function GET(request) {
  const configured = Boolean(
    process.env.HINDSIGHT_API_KEY &&
    process.env.HINDSIGHT_BANK_ID
  );

  return json(200, {
    enabled: configured,
    configured,
    required: true,
    mode:
      process.env.DEMO_MODE !== "false"
        ? "single-user-demo"
        : "configured",
    message: configured
      ? "Hindsight credentials are configured. Memory recall is required for every chat."
      : "Hindsight is required. Configure HINDSIGHT_API_KEY and HINDSIGHT_BANK_ID."
  });
}
