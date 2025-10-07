/**
 * Centralized icon asset management
 * Maps icon names to their file paths for easy maintenance and refactoring
 */

export const ICONS = {
  trumpet: {
    noBackground: "/icons/trumpet-no-bg.png",
    noBackground2: "/icons/trumpet-no-bg-2.png",
    standard: "/icons/trumpet.png",
  },
  guitar: {
    noBackground: "/icons/guitar-no-bg.png",
  },
  analytics: "/icons/analytics.png",
  chat: "/icons/chat.png",
  krewe: "/icons/krewe.png",
  plan: "/icons/plan.png",
  saints: "/icons/saints.png",
  xoBoyfriend: "/icons/xo-boyfriend.png",
} as const;

/**
 * Type-safe icon access
 */
export type IconName = keyof typeof ICONS;
export type TrumpetIconName = keyof typeof ICONS.trumpet;
export type GuitarIconName = keyof typeof ICONS.guitar;

/**
 * Helper function to get icon path
 */
export function getIconPath(iconName: IconName): string {
  return ICONS[iconName] as string;
}

/**
 * Helper function to get trumpet icon path
 */
export function getTrumpetIconPath(
  variant: TrumpetIconName = "noBackground"
): string {
  return ICONS.trumpet[variant];
}

/**
 * Helper function to get guitar icon path
 */
export function getGuitarIconPath(
  variant: GuitarIconName = "noBackground"
): string {
  return ICONS.guitar[variant];
}
