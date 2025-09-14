export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { PostHog } = await import("posthog-node");

    global.posthogClient = new PostHog(process.env.POSTHOG_API_KEY || "", {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    });
  }
}

declare global {
  var posthogClient: any;
}
