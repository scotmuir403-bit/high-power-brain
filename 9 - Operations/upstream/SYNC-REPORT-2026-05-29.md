# Upstream sync report — 2026-05-29

## gbrain

- **Pinned:** `e9f3c9c` (2026-04-10)
- **Current:** `041d89b` (2026-05-29)
- **Commits between:** 248
- **Latest commit:** v0.41.29.0 — bold-name-no-time conversation parser + orphan source scoping

---

### Changes

#### `CLAUDE.md` — CONSIDER
- **Size:** 213 lines → 2023 lines (9.5×)
- New major sections: Schema Cathedral v3, thin-client routing (v0.31.1), eval discipline (v0.32.3), search mode, bulk-action progress reporting, hindsight calibration wave (v0.36.1), conductor branch naming (iron rule), version consistency audit, post-ship requirements
- Skills routing rules section updated — skill routing table expanded with more triggers
- Build and test sections significantly expanded

**Recommendation:** Most of the growth is internal gbrain dev patterns (test lifecycle, version management, CI). Not directly adoptable. However — the Skills routing section is worth reviewing. If our `AGENTS.md` skill-routing rules have diverged, there may be new patterns to pick up. Low urgency.

---

#### `docs/GBRAIN_SKILLPACK.md` — CONSIDER
- **Size:** 1281 lines → 143 lines (condensed dramatically)
- The upstream SKILLPACK has been refactored into a brief high-level index. The detailed content was distributed to new subdirectories (`docs/architecture/`, `docs/ethos/`, `docs/guides/`, etc.) which we don't track.
- Our 1281-line pinned copy is MORE detailed than the current upstream SKILLPACK.
- New upstream section headings: Core Patterns, Data Pipelines, Operations, Architecture, Integrations, Administration, Getting Started, Appendix

**Recommendation:** The upstream refactored away from a single fat file to a distributed docs system. Our local version preserves the old detail which we built our workflows from — that's still valid. We may want to review the new "Getting Started" and "Architecture" sections of the condensed SKILLPACK for any new patterns not in our local. Low urgency; our local is still sound.

---

#### `docs/GBRAIN_RECOMMENDED_SCHEMA.md` — IGNORE
- **Size:** 1013 lines → 1013 lines
- Content functionally identical. Diff shows only line-ending differences (CRLF vs LF).
- Header metadata unchanged (schema-version: 0.5.0, source URL).

**Recommendation:** No action needed.

---

#### `docs/SQLITE_ENGINE.md` — IGNORE
- **Status:** **DELETED upstream.** File no longer exists in `docs/`.
- Was 395 lines in our pinned copy. Reference-only for us; we use a markdown-native approach.

**Recommendation:** No action. We can optionally remove this from our tracked list at next UPSTREAM.md update.

---

#### `docs/ENGINES.md` — IGNORE
- **Size:** 198 lines → 234 lines (grew 18%)
- Reference-only — we track this as context for the pluggable engine design, not for adoption.

**Recommendation:** No action needed.

---

#### `skills/ingest/SKILL.md` — CONSIDER
- **Size:** 65 lines → 311 lines (4.8×)
- New sections added:
  - **Contract** — explicit input/output contract for the ingest skill
  - **Citation Requirements (MANDATORY)** — every captured fact must carry a source citation. Specific format: `[Source](url) — date — context`. New hard rule.
  - **Media Workflows** — detailed handling for: Articles & Web Content, Videos & Podcasts, PDFs & Documents, Screenshots & Images, Meeting Transcripts, Social Media Content
  - **Raw Source Preservation** — rules for keeping original content alongside processed output
  - **Test Before Bulk** — test single item before bulk imports
  - **Anti-Patterns** — what NOT to do during ingest

**Recommendation:** The Citation Requirements section is directly relevant. Our `inbox processing.md` doesn't enforce citation format. The Media Workflows section (especially Meeting Transcripts) aligns with our Fathom sync. Worth reviewing and distilling citation rules into our inbox processor workflow.

---

#### `skills/query/SKILL.md` — CONSIDER
- **Size:** 60 lines → 155 lines (2.6×)
- New sections:
  - **Contract** — explicit contract for query operations
  - **Token-Budget Awareness** — source precedence rules for when context is tight
  - **Citation in Answers** — every synthesized answer must cite sources inline
  - **Graph Traversal (v0.10.1+)** — use relationship graph for multi-hop questions
  - **Search Quality Awareness** — when to escalate query strategy
  - **Anti-Patterns / Output Format**

**Recommendation:** Citation in Answers and Token-Budget Awareness are worth reviewing. Our `query.md` workflow was based on the old 3-layer search pattern. Check if citation rules should carry over to how our brain-query command formats responses.

---

#### `skills/maintain/SKILL.md` — CONSIDER
- **Size:** 97 lines → 430 lines (4.4×)
- Major additions:
  - **Autonomous path (v0.36.4.0)** — AI-driven maintenance targeting a health score, not just human-triggered runs
  - **Dream cycle (v0.23)** — synthesize patterns across brain content after a period of inactivity
  - **Heartbeat Integration** — on every heartbeat (hourly or per-session), weekly, and daily maintenance tiers. Structured cadence.
  - **Autopilot check** — continuous low-cost monitoring
  - **Embedding freshness** — track and refresh stale embeddings
  - **Benchmark Testing** — regression suite for brain health
  - **Report Storage** — standardised report format

**Recommendation:** The Heartbeat Integration section is the most relevant — it formalises what runs hourly vs weekly vs daily. We don't have this tiered cadence yet. Our `maintain.md` triggers maintenance as a one-shot. Worth reviewing the three-tier structure and seeing if our scheduled workflows should adopt it.

---

#### `skills/briefing/SKILL.md` — CONSIDER
- **Size:** 81 lines → 152 lines (1.9×)
- Growth likely includes contract, anti-patterns, output format additions (same pattern as other skills).

**Recommendation:** Low urgency. Review when next updating our briefing workflow.

---

#### `skills/migrate/SKILL.md` — IGNORE
- **Size:** 72 lines → 136 lines (1.9×)
- We've already completed migration. This skill is no longer active for us.

**Recommendation:** No action.

---

#### `skills/enrich/SKILL.md` — IGNORE
- **Size:** 45 lines → 349 lines (7.8×)
- Reference only — enrichment via Crustdata/Exa APIs is out of scope for our current architecture.

**Recommendation:** No action.

---

### New untracked files worth noting

The upstream `docs/` folder now contains several new files not in our tracked list. One is directly relevant:

#### `docs/UPGRADING_DOWNSTREAM_AGENTS.md` — NEW FILE, WORTH TRACKING
We are exactly what this document describes: a downstream agent that forked the gbrain skill patterns and adapted them. The document provides:
- Specific skill diffs to apply when upgrading (Phase 2.5 auto-link, meeting ingestion attendee handling)
- Update procedure: identify forked skill files, apply diffs, update version banner
- Instructions for: brain-ops, meeting-ingestion, and query skills

If we track this file, future sync runs can catch downstream-specific migration guidance without reading the full CHANGELOG.

**Suggested action:** Add `docs/UPGRADING_DOWNSTREAM_AGENTS.md` to our tracked list in `UPSTREAM.md`.

#### `docs/GBRAIN_VERIFY.md` — NEW FILE, REFERENCE
Installation verification runbook. The live sync check (step 4) is the most useful — it distinguishes "sync ran" from "sync worked." Reference for when we next audit our own brain health.

---

## Summary

| File | Change | Recommendation |
|---|---|---|
| `CLAUDE.md` | +1810 lines (9.5×) | CONSIDER |
| `docs/GBRAIN_SKILLPACK.md` | −1138 lines (condensed to index) | CONSIDER |
| `docs/GBRAIN_RECOMMENDED_SCHEMA.md` | Unchanged (CRLF diff only) | IGNORE |
| `docs/SQLITE_ENGINE.md` | **Deleted upstream** | IGNORE |
| `docs/ENGINES.md` | +36 lines | IGNORE |
| `skills/ingest/SKILL.md` | +246 lines (4.8×) | CONSIDER |
| `skills/query/SKILL.md` | +95 lines (2.6×) | CONSIDER |
| `skills/maintain/SKILL.md` | +333 lines (4.4×) | CONSIDER |
| `skills/briefing/SKILL.md` | +71 lines (1.9×) | CONSIDER |
| `skills/migrate/SKILL.md` | +64 lines | IGNORE |
| `skills/enrich/SKILL.md` | +304 lines (7.8×) | IGNORE |

**Counts:** ADOPT: 0 | CONSIDER: 6 | IGNORE: 5 | BLOCKED: 0

**Highest-value items to act on (in order):**
1. `skills/ingest/SKILL.md` — Citation Requirements are new mandatory rules. Distil into our `inbox processing.md`.
2. `skills/maintain/SKILL.md` — Heartbeat Integration tiered cadence. Our scheduled maintenance is flat; this gives structure.
3. `docs/UPGRADING_DOWNSTREAM_AGENTS.md` — Add to tracked files. Directly relevant to how we apply gbrain upgrades.
4. `skills/query/SKILL.md` — Citation-in-answers rule. Worth one-lining into our query workflow.

**Next step:** Human reviews this report, decides which CONSIDER items to adopt, and updates `9 - Operations/upstream/gbrain/UPSTREAM.md` with the new pinned commit and adoption notes. Do not update the pinned commit until at least one adoption decision is made.
