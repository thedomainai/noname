# noname

Working directory for strategic analysis, organizational design, and business planning.

## Directory Structure

```
corporate-os/          AI Native Institution OS specs and modules
accountingfirm/        Accounting firm AI migration dashboard (separate Git repo)
inbox/
  docs/                Strategy documents in progress
  refs/                External article summaries and cross-analyses
mtg/                   Meeting notes (chronological)
daily-log/             Daily work logs
```

### Root-level artifacts

| File | Description |
|---|---|
| `ai-market-layer-structure.html` | AI market 7-layer structure (bilingual JP/EN) |
| `ax-framework.html` | AX consulting framework (6-phase land & expand) |
| `sales-script.md` | Sales script (draft) |
| `titele.md` | Session handoff: LLM commoditization and AI integration |

## Key Projects

### corporate-os/

AI Native Institution OS: a comprehensive design for organizations in the AGI/ASI era.

- Core spec (`00-core-*`), detailed modules (`10-*`), rationale (`20-*`), appendices (`30-*`), reference instances (`40-*`)
- See `corporate-os/README.md` for reading order and editing rules

### accountingfirm/

Interactive dashboard for accounting firm AI migration strategy.

- Single-file HTML with Migration and Roll-up tabs
- Task catalog (40 tasks), 4-phase migration map, DAG dependencies
- Hosted on GitHub Pages (`thedomainai/accouting-firm`)

## Conventions

- Markdown documents in Japanese; README files in English
- File names: `<topic>-<qualifier>.md` (e.g., `foundation-model-strategy-report-2026-2029.md`)
- Meeting notes: `mtg-<person>-<yyyymmdd>.md`
- Numbered prefix system in `corporate-os/`: `00-` core, `10-19` modules, `20-29` rationale, `30-39` appendices, `40-49` reference instances
