import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { PRERENDER_ROUTES } from "./lib/routeMeta";

const container = document.getElementById("root")!;

// Routes are prerendered at build time, so in production the container already
// holds the rendered page and we attach to it instead of throwing it away.
// createRoot on a filled container would discard that markup and repaint, which
// is a visible flash on exactly the pages we bothered to prerender. Dev serves
// an empty shell, so it takes the createRoot path.
// Unknown paths are served the prerendered home page (the SPA fallback), so
// hydrating would mismatch and flash the home page before "Page not found".
// Hydrate only the paths that were prerendered; render anything else fresh.
const path = window.location.pathname.replace(/\/+$/, "") || "/";
if (container.hasChildNodes() && PRERENDER_ROUTES.includes(path)) {
  hydrateRoot(container, <App />);
} else {
  container.replaceChildren();
  createRoot(container).render(<App />);
}
