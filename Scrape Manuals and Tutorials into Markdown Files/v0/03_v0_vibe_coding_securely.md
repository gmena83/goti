# v0: vibe coding, securely

**Source URL:** https://vercel.com/blog/v0-vibe-coding-securely
**Platform:** v0 (Vercel)
**Content Type:** Article
**Date:** Aug 4, 2025

---

## When code is written by AI, secure defaults must be the foundation, not a feature

Vibe coding has changed how software gets built. Tools like **v0** make it possible to turn ideas into working prototypes in seconds. Anthropic's CEO predicts **90% of code will be AI-generated in 3-6 months**. Adoption is accelerating fast, and for many builders, we're already there.

But here's the uncomfortable truth: **The faster you build, the more risk you create**

Last week, a viral app leaked 72k selfies and government IDs. This wasn’t a hack or advanced malware. It was caused by default settings, misused variables, and the absence of guardrails. A misconfigured Firebase bucket that was mistakenly left public for anyone to access. The app was built quickly, shipped without security review, and went viral.

> More code will be written in the next few months alone than in the entire history of computers
>
> *— Guillermo Rauch*

When anyone can now build an app that goes viral, it’s more important than ever for those apps to be secure from the very first prototype. Leaked secrets, unsafe defaults and misconfigured access are no longer rare mistakes. They are the default without intervention.

This time it was just selfies and government IDs. Next time, it’s your credit card or medical records. The fact of the matter is, **security is the defining issue in the world of vibe coding and AI-generated code.**

**v0 is the only platform built and proven to solve this problem.** Since launch, v0 blocked over 100k insecure deployments on Vercel. Each one is a security incident that never happened.

The hard part isn't building fast anymore, it's staying secure at the same speed.

## What AI typically gets wrong

AI tools are trained to generate code that runs, not to make it secure. That distinction matters. LLMs confidently generate code that looks correct but quietly introduce serious vulnerabilities. These issues show up consistently across models, frameworks, and prompts.

They’re not rare. They’re everywhere.

### Public variable misuse

In Next.js, any environment variable prefixed with `NEXT_PUBLIC_` gets exposed to the browser. That’s by design. It’s how server-side config gets injected into the frontend. But LLMs misuse this by placing secrets, like database credentials and API keys, into these public variables.

```javascript
// DON'T DO THIS
const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL
```

That database URL is public. Anyone can view your page source and see it.

In the past 30 days, v0 blocked over **17k deployments** on Vercel due to exposed secrets alone.

*   The top keys that would have been leaked included Google Maps, reCAPTCHA, EmailJS, and PostHog
*   Over a thousand people almost handed over the keys to their app by sharing their Supabase backend and database keys
*   A thousand more were ready to share their OpenAI, Gemini, Claude, and xAI keys. An incredibly easy way for someone to run up your AI utilization and cost you thousands

### Secrets in code

Many AI-generated projects take this a step further by including hardcoded secrets like this directly in the source files. These keys are scraped by bots in minutes. Developers don’t often realize the exposure until after incidents occur, if they even catch it at all.

### Other common patterns

*   **Missing input sanitization:** Unsafe user input gets passed directly into model prompts, opening the door for prompt injection attacks
*   **No environment separation:** Generated code rarely differentiates between dev and prod environments, leading to misconfigured services and accidental access leaks
*   **Sensitive data in logs:** Debug logs often contain auth tokens, user IDs, or API keys written without redaction or retention policy

These are not advanced attack vectors. These are common, beginner mistakes being generated daily, often without the developer realizing the risk. And they won’t go away with better prompting.

### Real example: AI agent database deletion

In a recent incident, an AI agent made a "catastrophic error in judgement", deleting an app's entire production database. It ignored explicit "no changes without permission" directives and responded with fabricated explanations, claiming success until the issue was discovered.

This was not a malicious actor. It was the result of an overly confident AI without clear boundaries. Incidents like this are becoming more common as teams experiment with autonomous agents and production-connected workflows.

This issue will only grow as security reviews fall behind the speed and volume of AI-generated code. With AI models being trained on public code, much of which is insecure, outdated, or misconfigured, the solution lies in secure defaults and sensible guardrails built into the tools that generate and deploy your code without slowing you down.

## What v0 does that others don't

**v0 is trained on modern best practices** for popular frameworks like Next.js, and applies security checks during generation and before deployment. These checks are automated, context-aware, and applied consistently across every project.

**Secure generation checks:**

*   Secrets exposed in client-side code or public repositories
*   Misuse of `NEXT_PUBLIC_` variables that leak production credentials
*   Tokens or session data written to logs
*   Prompt injection risks from unsanitized user input
*   Misconfigured third-party API integrations
*   Unsafe defaults for authentication, routing, and database access

**Quantified impact:**

*   Over 17k insecure deployments blocked in July alone
*   Most common issues: Exposed API keys, `NEXT_PUBLIC_` misuse, unauthenticated API routes

Fast is meaningless if you can't trust what you ship.

## Layered protection from prompt to deployment

Deploying with v0 means your apps live on Vercel, benefiting from our hardened platform-level controls.

### Deployment control

*   **Preview protection:** Preview deployments can be restricted with password or SSO
*   **Opt-in sharing:** v0 ensures preview links are private unless explicitly shared
*   **Environment safeguards:** Vercel blocks deployments from forks that modify environment variables without approval
*   **Deploy blocks:** Security vulnerabilities are flagged and require review before deploy
*   **Access control:** Role-based permissions define who can view, edit, and deploy
*   **Audit logging:** All deploys and environment changes are recorded and reviewable

Together, v0 and Vercel enforce deploy-time protections that catch risky changes before they reach production.

### Secure inference

v0 apps use **Vercel AI Gateway** to call models securely without exposing credentials.

*   **Centralized auth and routing:** Routes requests to any providers with retry and failover support
*   **Scoped credentials:** Provider tokens are stored securely and used server-side only
*   **Short-lived tokens:** Short-lived OIDC tokens are scoped per project
*   **Rate limiting:** Built-in throttling and observability help prevent overuse and abuse

Model usage is centralized, and secured so inference does not become an attack surface.

### Platform-level security

*   **DDoS and firewall protection:** Vercel Firewall blocks over 4.4 billion malicious requests and bots per month before they reach your application
*   **Isolated functions:** Each function runs in its own secure container with controlled network access
*   **Secure environment encryption:** AES-256 encryption with secure vault system
*   **Compliance standards:** SOC 2 Type 2, ISO 27001:2022, GDPR, PCI DSS, HIPAA

## The path forward

Vibe coding has made building faster than ever. Speed is no longer the problem. **Security is.** And as teams have started to realize, it can’t be treated as a separate step.

We’ve seen what happens when small oversights scale. Thousands of apps ship every week with vulnerabilities, often without the author realizing it.

Secure has to be the default from the start, without slowing you down or having to think about it. Whether you're vibe coding an idea or a developer rushing to meet a deadline, secure code generation and practical guardrails ensure you get the same security analysis as the most experienced engineers.

The future of development is fast, AI-assisted, and **secure by default**.

Ready for secure, AI-powered development?

From idea to secure deployment in minutes. No security expertise required.

[Get started with v0](https://vercel.com/v0)

Ready to deploy? Start building with a free account. Speak to an expert for your Pro or Enterprise needs.

[Start Deploying](https://vercel.com/signup)
[Talk to an Expert](https://vercel.com/contact/sales)

Explore Vercel Enterprise with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](https://vercel.com/enterprise)
