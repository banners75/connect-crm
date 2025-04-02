import mixpanel from "mixpanel-browser";

class Analytics {
  private static instance: Analytics;

  private constructor() {
    mixpanel.init("f416d826274cc23b61ebba43a81ab8a3", {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
  }
 
  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  // Identify user
  public identify(userId: string): void {
    if (typeof window !== "undefined") {
      mixpanel.identify(userId);
    }
  }

  // Track events
  public track(event: string, data?: Record<string, any>): void {
    if (typeof window !== "undefined") {
      mixpanel.track(event, data);
    }
  }

  // Set user properties
  public setUserProperties(properties: Record<string, any>): void {
    if (typeof window !== "undefined") {
      mixpanel.people.set(properties);
    }
  }
}

// Export a single instance
export const analytics = Analytics.getInstance();
