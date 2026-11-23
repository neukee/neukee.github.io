# Neukee

The Neukee website is a statically generated Astro site for the project, its security model, and Node.js / Next.js upgrade field guides.

## Local development

```sh
npm install
npm run dev
```

Run the production checks and generate the static site in `dist/` with:

```sh
npm run build
```

The build runs Astro’s type and component checks, emits the site, and creates `dist/sitemap-index.xml`. `npm run preview` serves the production output locally.

## Deployment

Pushing to `main` runs [the GitHub Pages workflow](.github/workflows/deploy.yml). GitHub Pages must be set to deploy with GitHub Actions in the repository settings.

### Switching to the custom domain

The site address lives in one place: `SITE_URL` in [`astro.config.mjs`](astro.config.mjs). Canonical links, Open Graph tags, structured data, the sitemap, `robots.txt` and `llms.txt` all derive from it.

1. Verify the domain for the `neukee` organization (Organization settings → Pages → Add a verified domain).
2. At the DNS provider, add four `A` records for the apex domain (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and a `www` `CNAME` to `neukee.github.io`. On Cloudflare, keep them DNS-only while the certificate is issued.
3. Set the custom domain in this repository's Settings → Pages.
4. Change `SITE_URL` in `astro.config.mjs` and push.
5. When the certificate is issued, tick **Enforce HTTPS**.
6. Add the site to Google Search Console and Bing Webmaster Tools, and submit `/sitemap-index.xml`.

The contact address and social profiles live in [`src/site.ts`](src/site.ts).

## Content rules

- Claim only what the scanner does today. The [project README](https://github.com/neukee/neukee) is the authority; planned work is labelled as planned.
- No invented output, numbers, customers or install commands. Nothing is published on npm until version 0.1.0.
- Technical pages list the official sources they were checked against (the `sources` prop of `GuideLayout`).
- Pages that haven't been checked yet are listed in [`src/content-status.mjs`](src/content-status.mjs). They stay published but carry `noindex`, are left out of the sitemap and `llms.txt`, and show readers a review note. Remove a path once its claims are verified.
- Brand: monochrome. The cat mark lives in `src/components/BrandMark.astro` and `public/brand/`.
