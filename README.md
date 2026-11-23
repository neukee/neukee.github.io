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

Pushing to `main` runs [the GitHub Pages workflow](.github/workflows/deploy.yml). The site is configured for `https://neukee.github.io`; make sure GitHub Pages is configured to deploy with GitHub Actions in the repository settings.
