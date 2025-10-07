# Fest Vibes Beta

## Overview

Fest-Vibes is a personal planner connecting users to live music events in their hometown. It brings the festival experience to your fingertips. Transform any weekend into a personalized music festival with local live music discovery, social collaboration, and intelligent planning tools.

## Features

- **Live Music Discovery** - Find and support local musicians and venues
- **Artist & Venue Following** - Stay updated on your favorite musicians
- **Festival Planning Tools** - Create timelines for multi-day experiences
- **Social Collaboration** - Connect with friends to coordinate music event plans
- **Event Analytics Dashboard** - Interactive insights into music events and trends
- **AI Planning Assistant** - Chat with Boomy/Bumi for personalized music experiences (A/B tested)

## Deployment

This project is optimized for Vercel deployment with Next.js App Router.

### Quick Deploy

1. Fork this repository
2. Connect to Vercel
3. Deploy with automatic settings (Vercel auto-detects Next.js projects)

### Local Development

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Lucide React Icons
- shadcn/ui Components
- Posthog
- Drizzle ORM

### Resend webhooks in local development (Cloudflare Tunnel)

To receive Resend email events locally at `POST /api/webhooks/resend`:

1. Install Cloudflare Tunnel (`cloudflared`):
   - **Fedora 39**: If `sudo dnf install cloudflared` fails due to repo metadata errors, install the RPM directly:
     ```bash
     # x86_64; use aarch64 for ARM
     wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-x86_64.rpm
     sudo dnf install ./cloudflared-linux-x86_64.rpm
     cloudflared --version
     ```
   - **Other OS**: See [Cloudflare Tunnel docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)
   - **Fedora Silverblue/Immutable**: Use `toolbox` or `podman` to install in a mutable container, or place the standalone binary in `/usr/local/bin`
2. Run the app on port 3000.
3. Start a tunnel:
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```
   Keep this terminal running. Copy the printed HTTPS URL.
4. In Resend Dashboard → Webhooks → Add Webhook:
   - Endpoint URL: `https://<tunnel-domain>/api/webhooks/resend`
   - Events: select all relevant email events (sent, delivered, delayed, bounced, complained, opened, clicked)
   - Content type: `application/json`
   - Enable Signing: ON → copy the Signing Secret
5. Add to `.env.local`:
   ```
   RESEND_WEBHOOK_SECRET=your_resend_signing_secret
   ```
6. Submit a signup and verify webhook deliveries and local logs.

**Security**: The webhook route verifies `resend-signature` using HMAC SHA-256 against the raw request body and `RESEND_WEBHOOK_SECRET`. If verification fails, it returns 401 and skips DB writes.
