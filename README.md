# PromptLens

Curated AI photography prompts for Midjourney, DALL-E, and Stable Diffusion.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

Or: `npx serve .`

## Structure

- `index.html` — prompt library with search and copy
- `about.html`, `blog.html`, `contact.html`, `privacy-policy.html`
- `shared.css` / `shared.js` — shared styles and behavior
- `favicon.svg`, `robots.txt`, `sitemap.xml`

## Before launch

1. Replace `https://promptlens.com` in canonical URLs and `sitemap.xml`
2. Connect contact and newsletter forms (Formspree, Netlify Forms, etc.)
3. Add your Google AdSense publisher ID when ready
4. Publish real blog article pages and update blog links
