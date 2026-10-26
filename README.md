# Pennywise AI — Where does my money go?

A lightweight React + Vite personal-finance dashboard with local-first transaction management, budgets, savings goals, CSV import/export, calculated insights, and a server-side OpenAI assistant with required Hindsight memory.

## Important status

- Finance records, budgets, and goals are stored in this browser's `localStorage`.
- OpenAI requests run through `/api/openai`; the API key is server-side.
- Hindsight retain/recall calls use the documented Cloud HTTP API routes. Every chat request requires a successful Hindsight recall; valid Hindsight credentials and a bank ID are mandatory.
- This build is an **unauthenticated single-user hackathon demo**. Do not expose one shared Hindsight bank to multiple users or enter sensitive financial/banking secrets.
- No organizer PDFs were available in the current conversation attachments, so the implementation follows the supplied project prompt; verify any exact judging requirements against the organizers' documents.

## Local setup (Windows PowerShell)

1. Install a current Node.js LTS version (Node 20 or newer).
2. Extract the ZIP and open the `pennywise-ai-hackathon` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:
   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```
5. Open the local URL Vite prints. Finance features work without API keys. The AI endpoint requires environment variables and is designed for Vercel; Vite alone does not execute `/api` serverless functions locally.

If PowerShell blocks `npm`, use `npm.cmd` as shown; do not change execution policy just for this project.

## Deploy to GitHub + Vercel

1. Download and extract this ZIP.
2. Create a **new** GitHub repository named `pennywise-ai-hackathon`. Keep your old repository untouched.
3. On GitHub, choose **Add file → Upload files** and upload the contents inside this folder (not the outer ZIP). Do not upload `.env` or real credentials.
4. In Vercel, choose **Add New → Project**, import the new repository, and leave Framework Preset as Vite (or let Vercel detect it). Root directory is `./`; build command is `npm run build`; output directory is `dist`.
5. Add the environment variables listed below under Project → Settings → Environment Variables. Apply to Production and Preview only if needed.
6. Deploy or redeploy. Environment-variable changes require a new deployment.
7. Open the deployment URL. Check `/api/health` and `/api/memory-status`.

## Environment variables

| Name | Required | Value |
|---|---|---|
| `OPENAI_API_KEY` | For AI chat | Create an API key in your OpenAI platform account. Keep it private and add it only in Vercel settings. |
| `OPENAI_MODEL` | Recommended | `gpt-5-mini` by default; verify that this model is available to your OpenAI project. |
| `HINDSIGHT_API_KEY` | Required for every chat request | Create/copy an API key from Hindsight Cloud's Connect page. Never share it in chat or commit it. |
| `HINDSIGHT_BASE_URL` | Optional | `https://api.hindsight.vectorize.io` for Hindsight Cloud. |
| `HINDSIGHT_BANK_ID` | Required for every chat request | A dedicated bank ID created/available in your Hindsight workspace. Do not reuse a personal or multi-user bank. |
| `DEMO_MODE` | Optional | `true` (default) documents the single-user demo mode. |

## CSV format

Required headers: `description,amount,type,category,date`. Optional header: `notes`.

Example:
```csv
description,amount,type,category,date,notes
Monthly allowance,8000,income,Income,2026-10-01,Sample entry
Groceries,1450,expense,Food,2026-10-03,Weekly shop
```

The CSV importer previews rows and imports valid rows only. This simple CSV reader expects ordinary comma-separated fields; avoid commas inside field values for imports. Export is quoted CSV.

## Privacy

The app does not connect to a bank. It does not automatically send all transactions to OpenAI. If the user checks “Include current-month summary,” a limited computed summary is sent to OpenAI. Chat messages are sent to OpenAI; each chat message is used for a Hindsight recall query; explicitly useful financial preferences/goals may also be sent to Hindsight for retention. Do not enter passwords, OTPs, card numbers, credentials, or other secrets.

## API endpoints

- `GET /api/health` — configuration status only; it does not test live provider access.
- `GET /api/memory-status` — reports whether Hindsight credentials are configured.
- `POST /api/openai` — request: `{ "message": "…", "history": [{"role":"user","content":"…"}], "memoryEnabled": true, "context": "" }`; success: `{ "reply": "…", "memory": { "recall": "success|failed|not-configured|disabled", "recallCount": 0, "retention": "success|failed|not-needed|not-configured|disabled|skipped-sensitive" } }`; errors: `{ "error": "…" }`.

## Checks

See `TESTING_CHECKLIST.md`. Live OpenAI/Hindsight tests cannot be verified until your own API credentials are configured. This ZIP does not contain credentials or `node_modules`. Add `OPENAI_API_KEY`, `HINDSIGHT_API_KEY`, and `HINDSIGHT_BANK_ID` to Vercel and redeploy.
