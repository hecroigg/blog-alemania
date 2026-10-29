# Automatic GermanyBase deployment from GitHub Actions

This optional workflow is **disabled by default**. Once activated, it runs
only after the `SEO / build verification` GitHub Action succeeds on `main`.
It builds on a GitHub runner and deploys directly with Wrangler, avoiding
Cloudflare remote-build initialization queues and branch-preview builds.

## One-time setup for the owner

1. Create an account-owned Cloudflare API token scoped to Workers **Editor**
   permissions for `blog-alemania`; add zone Workers Routes Write if required
   by existing custom domains. Do not send the token in chat.
2. In GitHub `hecroigg/blog-alemania` → Settings → Secrets and variables →
   Actions, add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets.
3. In Cloudflare, switch off the automatic Git integration/build triggers for
   this Worker **only after** credentials are ready; do not delete the Worker,
   change routes or modify DNS.
4. In the same GitHub Actions settings, add a repository variable:
   `ENABLE_GITHUB_CLOUDFLARE_DEPLOY` = `true`.
5. Use Actions → Verified Cloudflare deployment → Run workflow for a single
   smoke test. Once that succeeds, new verified `main` updates deploy
   automatically without Cloudflare's remote build queue.

The workflow is intentionally gated to prevent duplicate deployment systems.
Never store API tokens in source files or conversations.
Official docs: https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/
