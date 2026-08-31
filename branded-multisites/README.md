# Advisor One-Pager

Static advisor trust-page generator.

## Requirements

- Node.js 20+
- npm

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

This builds all 10 designs into:

```text
dist/design-01/
dist/design-02/
...
dist/design-10/
```

Open any generated `index.html` in a browser.

## Production build

```bash
npm run build
```

The build also creates `dist/index.html`, a review dashboard linking to all ten
designs. On every push to `main` that changes this project, GitHub Actions builds
and publishes the complete `dist/` directory to GitHub Pages.

To activate the deployment for the first time, open the repository on GitHub and
select **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Core rule

Advisor content lives in:

```text
src/data/advisor.json
```

Templates and styles consume the same data contract. Do not hardcode advisor-specific copy inside templates.

## Form handling

By default the form is configured as:

```json
"method": "POST",
"action": ""
```

Set `contact.form.action` in `advisor.json` to the CRM endpoint when available.

## Trustpilot

`advisor.json` includes Trustpilot data. The template renders the rating summary above the fold.

For production, replace the placeholder reviews block with the official Trustpilot TrustBox embed supplied for the advisor/business profile.

## SEO

The generator outputs:

- title
- meta description
- canonical
- Open Graph
- Twitter card tags
- Person schema
- FinancialService schema
- optional AggregateRating

## Notes

The build outputs fully rendered static HTML. Content is not constructed client-side.
