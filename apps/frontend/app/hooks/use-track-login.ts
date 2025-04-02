import { useEffect } from "react";
import { analytics } from "~/utils/analytics";

export function useTrackUserLogin(token?: string, username?: string) {
  useEffect(() => {
    if (token && username) {
      analytics.identify(username);
      analytics.setUserProperties({ username });
      analytics.track("User logged in", { username });
    }
  }, [token, username]);
}
