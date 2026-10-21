import { Navigate } from "react-router-dom";

// The team page was merged into /about, where the founders now sit directly
// under the claim they are the evidence for. This route stays alive as a
// redirect rather than being deleted: /team is indexed and was submitted to
// Search Console, and press and investors look for a team URL, so inbound links
// should land on the founders rather than a 404.
export default function Team() {
  return <Navigate to="/about#people" replace />;
}
