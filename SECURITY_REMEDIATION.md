# Security remediation — 2026-10-16

Refreshed Express, body-parser, express-session, node-fetch and their compatible transitive dependencies in the lockfile. Removed committed node_modules. Fixed the existing index/static paths to the actual public_html/web directory.

In TodoLegalTest run `npm ci --legacy-peer-deps`, then `npm start`. The legacy express-graphql dependency declares an older GraphQL peer range; the existing GraphQL 15 integration was verified with a filtered passengers POST request. The index and static asset routes also returned HTTP 200. npm audit reports zero vulnerabilities. No payment/email actions were performed. Bundled browser libraries require separate inspection.
