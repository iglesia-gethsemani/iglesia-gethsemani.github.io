export const assetVersion =
  process.env.GITHUB_SHA?.slice(0, 8) ||
  process.env.CF_PAGES_COMMIT_SHA?.slice(0, 8) ||
  '2026-08-19';
