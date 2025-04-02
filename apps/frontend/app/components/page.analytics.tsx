import { useEffect } from "react";
import { analytics } from "../utils/analytics";
import { useLocation } from "@remix-run/react";

export default function PageAnalytics() {

  const location = useLocation();
  
  useEffect(() => {
    analytics.track("Page Viewed", { path: location.pathname });
  }, [location.pathname]);

  return null;
}
