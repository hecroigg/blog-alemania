"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/icon";

export function Newsletter() {
  const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("The newsletter is being prepared. No address has been stored.");
  }
  return <section className="newsletter"><div><span className="eyebrow eyebrow-light">Weekly clarity</span><h2>Living in Germany, without the confusion.</h2><p>Practical explanations for the decisions, documents, and everyday systems that matter.</p></div><form onSubmit={submit}><label htmlFor="newsletter-email">Email address</label><div className="newsletter-control"><Icon name="mail"/><input id="newsletter-email" type="email" placeholder="you@example.com" required/><button type="submit">Notify me</button></div><small>{message || "No spam. Signup will activate when our email provider is connected."}</small></form></section>;
}
