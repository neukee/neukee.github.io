import type { APIRoute } from 'astro';
import { isUnverified } from '../content-status.mjs';
import { CONTACT_EMAIL, PROFILES } from '../site';

// A plain-text map of the site for AI assistants (llmstxt.org). Generated so the
// links follow the configured site URL; pages under technical review are left out.
const pages = [
  ['/', 'Home', 'What Neukee is, what version 0.1.0 checks, and its status.'],
  ['/security/', 'Security', 'Security boundaries: no network, no project execution, hostile-input handling.'],
  ['/trust/', 'Trust', 'Project and operational trust information.'],
  ['/faq/', 'FAQ', 'Direct answers about scope, privacy and limitations.'],
  ['/guides/', 'Upgrade guides', 'Node.js and Next.js upgrade guides.'],
  ['/guides/nextjs-15-to-16-upgrade-guide/', 'Next.js 16 upgrade guide', 'Every breaking change from Next.js 15 to 16, checked against the official guide, with a search to find each one in your code.'],
  ['/guides/node-22-to-26-breaking-changes/', 'Node.js 22 to 26 breaking changes', 'Every removal and new deprecation from Node.js 23 to 26, TLS security level 2, native module ABI, require(esm) and Corepack, checked against the official changelogs, with a search for each.'],
  ['/guides/node-22-eol-migration-checklist/', 'Node.js 22 end-of-life checklist', 'Node.js 22 reaches end of life on April 30, 2027: official support dates for 22, 24 and 26, target choice, audit and rollout.'],
  ['/guides/verify-ai-agent-prs-in-ci/', 'Verifying AI agent and Dependabot pull requests in CI', 'Baseline-versus-candidate behavior checks and safe GitHub Actions settings for untrusted pull requests.'],
  ['/blog/', 'Field Notes', 'Short essays on upgrade evidence.'],
  ['/blog/runtime-drift-is-a-deployment-problem/', 'Runtime drift is a deployment problem', 'Why one service can run several Node.js versions across version files, CI, Docker images and hosting, and how to find them.'],
  ['/blog/lockfiles-are-evidence-not-guarantees/', 'A lockfile is evidence, not a guarantee', 'What npm and pnpm lockfiles tell you about native modules and platform risk before an upgrade, and what they cannot.'],
  ['/blog/behavioral-diffs-for-automated-prs/', 'Automated pull requests need behavioral evidence', 'Reviewing dependency-bot and AI-agent pull requests with isolated baseline-versus-candidate comparisons.'],
  ['/about/', 'About', 'Principles behind Neukee.'],
  ['/contact/', 'Contact', 'Upgrade questions, founding audits and security reports.'],
] as const;

export const GET: APIRoute = ({ site }) => {
  const link = (path: string) => new URL(path, site).toString();
  const listed = pages.filter(([path]) => !isUnverified(path));
  const body = [
    '# Neukee',
    '',
    '> Neukee is an open-source, local-first scanner that finds what breaks before you upgrade Node.js or Next.js. It reads code, lockfiles and runtime configuration on the machine where it runs, never runs the project, never uses the network, and links every finding to the official release note.',
    '',
    'Status: pre-release. Version 0.1.0 is planned for December 8, 2026; nothing is published on npm yet. The source repository is the authority on what is built: ' + PROFILES.github,
    '',
    'Version 0.1.0 scope: Node.js runtime drift (.nvmrc, .node-version, engines, Volta, Dockerfiles, GitHub Actions), dependencies that build native code at install time (npm and pnpm lockfiles), and Next.js 16 rules. Output: terminal, Markdown, JSON and SARIF. Planned later: behavioral verification with design partners.',
    '',
    '## Pages',
    '',
    ...listed.map(([path, title, summary]) => `- [${title}](${link(path)}): ${summary}`),
    '',
    '## Contact',
    '',
    `- Email: ${CONTACT_EMAIL}`,
    `- GitHub: ${PROFILES.github}`,
    `- LinkedIn: ${PROFILES.linkedin}`,
    `- X: ${PROFILES.x}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
