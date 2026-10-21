import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;

// Routes are prerendered at build time, so in production the container already
// holds the rendered page and we attach to it instead of throwing it away.
// createRoot on a filled container would discard that markup and repaint, which
// is a visible flash on exactly the pages we bothered to prerender. Dev serves
// an empty shell, so it takes the createRoot path.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
