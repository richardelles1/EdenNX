import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Reset scroll on route change, but honor in-page anchor links (#edenradar etc.)
// by scrolling to the target element instead of the top.
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
