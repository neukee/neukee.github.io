// Pages whose technical claims have not yet been checked against official sources.
// They stay published and linked, but carry a `noindex` tag, are left out of the sitemap
// and llms.txt, and show readers a short note. Remove a path once its claims are verified
// and its sources are listed on the page.
export const UNVERIFIED_PATHS = [];

export const isUnverified = (path) => UNVERIFIED_PATHS.includes(path);
