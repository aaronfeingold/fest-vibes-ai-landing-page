import { NextRequest, NextResponse } from "next/server";

// Environment variables
const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

interface PostHogFlags {
  [key: string]: boolean | string;
}

// Default feature flags used across all fallback scenarios
const DEFAULT_FEATURE_FLAGS: PostHogFlags = {
  "logo-position": "left",
  "mascot-variant": "1",
  "logo-type": "standard",
  "copy-variant": "original",
  "hero-layout": "default",
  "nav-mascot-variant": "1",
};

async function getFeatureFlags(distinctId: string): Promise<PostHogFlags> {
  if (!POSTHOG_API_KEY) {
    console.warn("PostHog API key not found, returning default flags");
    return DEFAULT_FEATURE_FLAGS;
  }

  try {
    const response = await fetch(`${POSTHOG_HOST}/decide?v=3`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: POSTHOG_API_KEY,
        distinct_id: distinctId,
        person_properties: {},
        groups: {},
      }),
    });

    if (!response.ok) {
      console.error("Failed to fetch feature flags:", response.status);
      return DEFAULT_FEATURE_FLAGS;
    }

    const data = await response.json();
    return data.featureFlags || DEFAULT_FEATURE_FLAGS;
  } catch (error) {
    console.error("Error fetching feature flags:", error);
    return DEFAULT_FEATURE_FLAGS;
  }
}

export async function middleware(req: NextRequest) {
  // Skip middleware for API routes, static files, and other non-page requests
  if (
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname.startsWith("/_next/") ||
    req.nextUrl.pathname.includes(".") ||
    req.nextUrl.pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Get or create distinct ID for the user
  let distinctId = req.cookies.get("ph_distinct_id")?.value;
  if (!distinctId) {
    distinctId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }

  // Get feature flags for this user
  const featureFlags = await getFeatureFlags(distinctId);

  // Create response
  const response = NextResponse.next();

  // Set distinct ID cookie if it doesn't exist
  if (!req.cookies.get("ph_distinct_id")?.value && distinctId) {
    response.cookies.set("ph_distinct_id", distinctId, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  // Set feature flags as cookies for client-side access
  response.cookies.set("ph_bootstrap_flags", JSON.stringify(featureFlags), {
    maxAge: 60 * 60, // 1 hour
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
