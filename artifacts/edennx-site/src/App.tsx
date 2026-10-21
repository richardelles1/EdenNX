import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import About from "@/pages/About";
import Team from "@/pages/Team";
import Insights from "@/pages/Insights";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

const base = import.meta.env.BASE_URL;

// Exported so the build-time renderer can mount it under a StaticRouter. The
// browser entry keeps using App, which supplies the BrowserRouter.
export function AppShell() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollToTop />
      {/* First tab stop: past the navigation, straight to the page. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-[15px] focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* key on pathname remounts the page so the fade replays on navigation */}
        <div key={location.pathname} className="page-fade">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact" element={<Contact />} />
            {/* Preview only: card placement and card directions for Rich. */}
            <Route path="/preview/home-cards-a" element={<Home lead="cards" cards="a" />} />
            <Route path="/preview/home-cards-b" element={<Home lead="cards" cards="b" />} />
            <Route path="/preview/products-a" element={<Products body="a" />} />
            <Route path="/preview/products-b" element={<Products body="b" />} />
            <Route path="/preview/products-scroller" element={<Products body="scroller" />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={base === "/" ? undefined : base.replace(/\/$/, "")}>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
