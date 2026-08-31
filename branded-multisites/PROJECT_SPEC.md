# Advisor One-Pager — Project Spec

## Goal

Create a static, template-driven advisor trust page system with 10 visual variants.

The KPI is trust, not lead generation.

## Non-negotiables

- Full static HTML output
- Mobile-first
- Fast and lightweight
- Advisor-specific content comes from JSON
- Trustpilot summary above the fold
- Credentials visible early
- Personal story
- Lifestyle section
- Contact form
- Compliance footer
- SEO metadata
- Person + FinancialService schema
- Open Graph metadata
- No client-side rendering dependency

## Architecture

```text
src/data/advisor.json
      ↓
EJS build templates
      ↓
10 static HTML outputs

SCSS
      ↓
compiled CSS
```

## Template rule

Do not hardcode advisor-specific content inside EJS files.

## Optional-data rule

Templates must not break when:

- Trustpilot is disabled
- review count is zero
- credentials vary between 3 and 6
- lifestyle photos vary
- FAQ items vary

## Browser target

Modern evergreen browsers plus current Safari/iOS Safari.

## Accessibility priorities

- readable font sizes
- strong color contrast
- visible focus states
- large touch targets
- semantic landmarks
- real labels
- usable form controls
- no critical information conveyed through color alone

## Design strategy

The 10 variants should explore different trust mechanisms rather than merely changing colors:

1. Professional authority
2. Human / approachable
3. Premium dark
4. Editorial warmth
5. Institutional credibility
6. Personal philosophy
7. Minimal credentials-first
8. Social-proof emphasis
9. Calm retirement guidance
10. Executive minimalism
