# Global Skills Tracker

Installed to `~/.claude/skills` (global scope, Claude Code only, copied not symlinked) via `npx skills@latest add <repo> -g -a claude-code --copy`.
Update later with: `npx skills@latest update -g`

| # | Requested | Source repo | Skills installed | Status | Date |
|---|-----------|-------------|------------------|--------|------|
| 1 | Emil Kowalski | emilkowalski/skills | animate, animate-expo, animation-performance, animation-vocabulary, apple-design, ask-sonner, break-ui, emil-design-eng, find-animation-opportunities, improve-animations, mobile-native, pick-ui-library, prototype, review-animations, write-swift (15) | Installed | 2026-10-27 |
| 2 | Impeccable | pbakaus/impeccable | impeccable | Installed | 2026-10-27 |
| 3 | Taste Skill | Leonxlnx/taste-skill | design-taste-frontend | Installed | 2026-10-27 |
| 4 | shadcn/ui Skill | shadcn-ui/ui | shadcn (skipped migrate-radix-to-base: not needed) | Installed | 2026-10-27 |
| 5 | Next.js Developer | jeffallan/claude-skills | nextjs-developer | Installed | 2026-10-27 |
| 6 | frontend-design | (pre-existing) | frontend-design | Already installed (2026-07-04), left untouched | n/a |
| 7 | Visual context | ibelick/ui-skills (user-confirmed) | create-design-md | Installed | 2026-10-27 |

## Where each is used (see `docs/PLAN.md`, "Skills and how each is used")
- Emil Kowalski skills: motion spec, animation reviews, `break-ui` stress tests, `mobile-native` fixes. Not used: `animate-expo`, `write-swift`.
- `impeccable`: DESIGN.md capture, critique, polish, hardening.
- `design-taste-frontend`: art direction and look-and-fix loop.
- `shadcn`: UI primitives themed from DESIGN.md.
- `nextjs-developer`: App Router, metadata, route handler, boundaries.
- `frontend-design`: second opinion on direction.
- `create-design-md`: writes `site/DESIGN.md`.
- Already available and also used: `typography`, `bencium-aeo`, `web-design-guidelines`, `design-audit`, `react-best-practices`, `vercel-optimize`, `deploy-to-vercel`, `insurgent-campaign`, `dataviz`.

Note: new skills load in new Claude Code sessions; restart the session to use them.
