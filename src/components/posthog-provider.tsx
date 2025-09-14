'use client'

import { PostHogProvider } from 'posthog-js/react'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'

if (typeof window !== "undefined") {
  // Parse allowed URLs from environment variable
  const allowedUrls = process.env.NEXT_PUBLIC_POSTHOG_URL_ALLOWLIST
    ? process.env.NEXT_PUBLIC_POSTHOG_URL_ALLOWLIST.split(",").map((url) =>
        url.trim()
      )
    : [];

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") console.log("PostHog loaded");
    },
    capture_pageview: false,
    capture_pageleave: true,
    ...(allowedUrls.length > 0 && { url_allowlist: allowedUrls }),
  });
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && typeof window !== "undefined") {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}
