import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

export default function NotFound() {
  useSEO({
    title: "Page not found - EdenNX",
    description: "The page you are looking for does not exist.",
  });

  return (
    <div className="pt-16">
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-32 lg:py-40 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
          404
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5 tracking-tight">
          This page drifted off the <span className="gradient-text">radar</span>.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          The page you are looking for does not exist or has moved. Let us get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
          >
            Back to Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-semibold border border-primary/40 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            Explore the Platform
          </Link>
        </div>
      </section>
    </div>
  );
}
