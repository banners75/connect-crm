import mixpanel from "mixpanel";



class AnalyticsServer {
  private static instance: AnalyticsServer;
  private mixpanelServer: mixpanel.Mixpanel;

  private constructor() {
    this.mixpanelServer = mixpanel.init("f416d826274cc23b61ebba43a81ab8a3", {
      protocol: "https",
    });
  }

  public static getInstance(): AnalyticsServer {
    if (!AnalyticsServer.instance) {
      AnalyticsServer.instance = new AnalyticsServer();
    }
    return AnalyticsServer.instance;
  }

  public track(event: string, data: Record<string, mixpanel.PropertyDict> = {}): void {
    this.mixpanelServer.track(event, data);
  }

  public identify(userId: string): void {
    this.mixpanelServer.people.set(userId, { created_at: new Date() });
  }
}

export const analyticsServer = AnalyticsServer.getInstance();
