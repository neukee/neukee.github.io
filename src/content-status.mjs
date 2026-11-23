// Pages whose technical claims have not yet been checked against official sources.
// They stay published and linked, but carry a `noindex` tag, are left out of the sitemap
// and llms.txt, and show readers a short note. Remove a path once its claims are verified
// and its sources are listed on the page.
export const UNVERIFIED_PATHS = [
  '/guides/nextjs-15-to-16-upgrade-guide/',
  '/guides/node-22-to-26-breaking-changes/',
  '/guides/node-22-eol-migration-checklist/',
  '/guides/verify-ai-agent-prs-in-ci/',
  '/blog/behavioral-diffs-for-automated-prs/',
  '/blog/lockfiles-are-evidence-not-guarantees/',
  '/blog/runtime-drift-is-a-deployment-problem/',
];

export const isUnverified = (path) => UNVERIFIED_PATHS.includes(path);
