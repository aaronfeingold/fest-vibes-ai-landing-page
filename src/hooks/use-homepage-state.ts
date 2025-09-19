"use client";

import { useState, useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { useAssistantName } from "@/hooks/use-feature-flags";
import { useMascotAsset } from "@/hooks/use-brand-assets";

export interface ContentData {
  hero: {
    subtitle: string;
    typewriterMessages: string[];
  };
  features: {
    title: string;
    subtitle: string;
  };
  social: {
    title: string;
    subtitle: string;
  };
  cta: {
    title: string;
    subtitle: string;
  };
  featuresIntro: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  brand: {
    motto: string;
  };
  socialMedia: {
    twitter: string;
    instagram: string;
  };
}

export function useHomepageState() {
  const posthog = usePostHog();
  const assistantName = useAssistantName();
  const mascotNoBackground = useMascotAsset("noBackground");

  // UI State
  const [isVisible, setIsVisible] = useState(false);
  const [showBetaModal, setShowBetaModal] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showBoomyVibes, setShowBoomyVibes] = useState(false);
  const [contentData, setContentData] = useState<ContentData | null>(null);

  // Effects
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const loadContentData = async () => {
      try {
        const response = await fetch("/data.json");
        if (response.ok) {
          const data = await response.json();
          setContentData(data);
        }
      } catch (error) {
        console.error("Failed to load content data:", error);
      }
    };

    loadContentData();
  }, []);

  // Handlers
  const handleJoinBetaClick = () => {
    posthog?.capture("beta_signup_clicked", {
      source: "main_cta",
    });
    setShowBetaModal(true);
  };

  const handleBoomyClick = () => {
    posthog?.capture("boomy_mascot_clicked");
    setShowBoomyVibes(true);
    setTimeout(() => {
      setShowBoomyVibes(false);
    }, 4500);
  };

  const handleJoinBeta = () => {
    posthog?.capture("beta_signup_modal_proceed");
    setShowBetaModal(false);
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        posthog?.capture("beta_signup_completed", {
          email: email,
        });
        posthog?.identify(email, {
          email: email,
          signup_date: new Date().toISOString(),
          source: "landing_page",
        });
        setIsSubmitted(true);
        setTimeout(() => {
          setShowEmailForm(false);
          setIsSubmitted(false);
          setEmail("");
        }, 3000);
      } else {
        posthog?.capture("beta_signup_failed", {
          email: email,
          error: data.error || "Unknown error",
        });
        setSubmitError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      posthog?.capture("beta_signup_error", {
        email: email,
        error: error instanceof Error ? error.message : "Network error",
      });
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Assets
    assistantName,
    mascotNoBackground,
    contentData,

    // UI State
    isVisible,
    showBetaModal,
    showEmailForm,
    email,
    isSubmitted,
    isSubmitting,
    submitError,
    showBoomyVibes,

    // State setters (for components that need them)
    setEmail,
    setShowEmailForm,
    setShowBetaModal,

    // Handlers
    handleJoinBetaClick,
    handleBoomyClick,
    handleJoinBeta,
    handleEmailSubmit,

    // Computed props for sections
    navigationProps: {
      onMascotClick: handleBoomyClick,
      onJoinBetaClick: handleJoinBetaClick,
    },

    heroProps: {
      isVisible,
      contentData,
      onJoinBetaClick: handleJoinBetaClick,
    },

    betaModalProps: {
      isOpen: showBetaModal,
      onClose: () => setShowBetaModal(false),
    },

    emailModalProps: {
      open: showEmailForm,
      onOpenChange: setShowEmailForm,
      email,
      setEmail,
      isSubmitting,
      isSubmitted,
      submitError,
      onSubmit: handleEmailSubmit,
      assistantName,
      mascotNoBackground,
    },

    mascotProps: {
      show: showBoomyVibes,
      assistantName,
      mascotNoBackground,
    },

    footerProps: {
      contentData,
    },
  };
}
