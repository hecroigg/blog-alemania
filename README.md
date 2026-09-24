# Living Germany

Living Germany is an independent English-language platform that explains the practical systems behind moving to and living in Germany. The product is designed as an editorial-quality, SEO-ready foundation rather than a high-volume content farm.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4 plus a project-specific design system in `app/globals.css`
- Cloudflare Workers runtime through vinext, Vite, and Wrangler
- Static, typed content data with no external CMS dependency
- Next.js Metadata API, dynamic sitemap, robots rules, and Schema.org JSON-LD
- Consent-aware optional GA4 and dormant AdSense placements

## Run locally

Requirements: Node.js 22 LTS and pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

To run the application through the Cloudflare-compatible vinext development server instead:

```bash
pnpm dev:cloudflare
```

Open `http://localhost:3001`.

## Quality checks

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm build:cloudflare
```

The production build has no required environment variables. Without analytics or advertising IDs, those integrations remain inactive.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended for production | Canonical origin used by metadata, sitemap, robots, and structured data |
| `NEXT_PUBLIC_GA_ID` | No | Loads GA4 only after the visitor accepts analytics cookies |
| `NEXT_PUBLIC_ADSENSE_ID` | No | Enables dormant ad-placement containers; no ad script is included yet |

Never commit real secrets. These variables are public by design; server-side secrets should use non-`NEXT_PUBLIC_` names when future services are added.

## Project structure

```text
app/
  [slug]/                 Category, audience, and trust-policy template
  cities/[slug]/          Scalable city template
  guides/[slug]/          Article template
  search/                 Lightweight build-time content search
  tools/                  Tool roadmap
  layout.tsx              Global metadata, schemas, header, footer, consent
  sitemap.ts              Generated sitemap
  robots.ts               Crawl directives
components/               Reusable editorial, navigation, consent, and commercial UI
lib/
  content/                Typed categories, audiences, cities, guides, policies
  site.ts                 Central brand, URL, locale, and navigation config
  types.ts                Content model
CONTENT_STRATEGY.md        Editorial roadmap and internal-linking plan
```

## Change the brand

Edit `lib/site.ts` for the name, description, canonical URL, email, locales, and navigation. Update `app/icon.svg` and `app/opengraph-image.tsx` if the visual identity changes.

The current name, public URL, and email are intentionally centralised placeholders. Replace `livinggermany.example` before launch.

## Add a guide

1. Add a typed `Guide` object to the relevant file in `lib/content/guides/`.
2. Use a unique lowercase slug and an existing category slug.
3. Write a direct summary, distinct sections, practical takeaways, FAQs, and primary sources.
4. Add valid related-guide slugs.
5. Export the collection through `lib/content/guides/index.ts` if creating a new topic file.
6. Run the quality checks. The route, metadata, Article/FAQ/Breadcrumb schema, related links, search result, and sitemap entry are generated automatically.

Do not publish a placeholder article. Keep time-sensitive numbers out unless they are dated, sourced, and assigned an update owner.

## Add a city

Add one typed object to `lib/content/cities.ts`. Each city needs a unique introduction, useful local framing, at least one section, and an official municipal source. The `/cities/[slug]` page and sitemap entry are automatic.

Do not create near-duplicate city pages by replacing a city name. A city page should have enough local evidence to help a reader make or execute a decision.

## Internationalisation

`lib/site.ts` defines `en` as the default locale and reserves `es`. Content models are independent from page markup so a future `/es/` route group or locale segment can load adapted Spanish datasets without rewriting templates. Spanish pages are deliberately not generated until translated, locally adapted content exists.

## Analytics and consent

Set `NEXT_PUBLIC_GA_ID` as a Cloudflare Workers build variable. `components/analytics.tsx` reads the visitor's locally stored consent and injects GA4 only when analytics is accepted. Test Accept, Reject, and Manage flows before launch.

## AdSense

`AdSlot` supports article-introduction, article-body, and desktop-sidebar placements and returns nothing when `NEXT_PUBLIC_ADSENSE_ID` is empty. Before activation:

1. complete publisher approval and legal review;
2. add the official script through `next/script` only after advertising consent;
3. reserve stable slot dimensions for Core Web Vitals;
4. label every placement as advertising;
5. re-test mobile reading flow and cumulative layout shift.

## Affiliate and sponsored content

Reusable `AffiliateCard`, `ComparisonTable`, and `PartnerDisclosure` components live in `components/commercial.tsx`. No partner, commercial ranking, or affiliate URL is invented. Update the disclosures and editorial policy before activating a commercial relationship.

## Deploy to Cloudflare Workers

The repository is already prepared for Cloudflare's recommended Next.js path: vinext on Workers. No database, KV namespace, R2 bucket, image service, or runtime secret is required for the initial release.

### From the Cloudflare dashboard

1. In **Workers & Pages**, create an application by importing `hecroigg/blog-alemania` from GitHub.
2. Use `pnpm install --frozen-lockfile` as the install command.
3. Use `pnpm build:cloudflare` as the build command.
4. Use `pnpm deploy:cloudflare` as the deploy command.
5. Keep the project root as `/` and the production branch as `main`.
6. Add `NEXT_PUBLIC_SITE_URL` as a build variable using the final `https://` origin. Add the optional analytics and advertising IDs only when their consent flows are ready.
7. Deploy, connect the final custom domain, then redeploy so canonical URLs, sitemap, robots rules, and structured data use that domain.

### From a local terminal

After authenticating Wrangler with the intended Cloudflare account, one command builds and deploys the Worker:

```bash
pnpm deploy
```

For a production-runtime check without publishing:

```bash
pnpm preview:cloudflare
```

Cloudflare-specific files are intentionally committed:

- `wrangler.jsonc` defines the Worker, Node.js compatibility, static asset binding, and observability.
- `vite.config.ts` configures vinext and the Cloudflare Vite plugin.
- `pnpm-workspace.yaml` approves only the required `esbuild` and `workerd` installation scripts.

Before announcing the launch, verify `/`, a category, a guide, `/cities/mannheim`, `/search`, `/sitemap.xml`, `/robots.txt`, and the consent choices on the deployed domain.

## Pre-launch checklist

- Replace placeholder domain and email.
- Obtain legal review for policies, imprint requirements, cookie wording, and the owner/controller identity.
- Verify every time-sensitive guide against its linked official source.
- Connect and test a newsletter provider before changing the current no-storage message.
- Test keyboard navigation, consent paths, mobile layouts, and the deployed canonical URLs.
