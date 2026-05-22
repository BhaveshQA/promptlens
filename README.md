# PromptLens

Curated AI photography prompts for Midjourney, DALL-E, and Stable Diffusion.

## Local preview

**Recommended** (from the project folder):

```bash
cd /Users/hbhavesr/Documents/BhaveshWork/promptlens
chmod +x serve.sh
./serve.sh
```

Then open **http://127.0.0.1:8080/** in Chrome, Safari, or Firefox.

**Important:**
- Use `http://127.0.0.1:8080/` or `http://localhost:8080/` — not `https://`
- Do not open `index.html` via Finder (the `file://` URL breaks some behavior)
- If you see `Address already in use`, port 8080 is taken — either use the URL above (server may already be running) or run `./serve.sh 8081`

**Manual start:**

```bash
cd /Users/hbhavesr/Documents/BhaveshWork/promptlens
python3 -m http.server 8080 --bind 127.0.0.1
```

Or: `npx serve . -l 8080`

## Structure

- `index.html` — prompt library with search and copy
- `about.html`, `blog.html`, `contact.html`, `privacy-policy.html`
- `shared.css` / `shared.js` — shared styles and behavior
- `favicon.svg`, `robots.txt`, `sitemap.xml`

## Before launch

1. Replace `https://promptlens.com` in canonical URLs and `sitemap.xml`
2. Deploy to Netlify or another static host
3. Enable Netlify Forms so `newsletter` and `contact` submissions are collected
4. Connect the newsletter form to Beehiiv, ConvertKit, MailerLite, Brevo, or Zapier
5. Replace the `PromptLens Pro Pack` launch-notice link with your Gumroad or Lemon Squeezy product link
6. Add real affiliate links only after joining the relevant partner programs
7. Add your Google AdSense publisher ID after the site has real traffic and approval
8. Verify the new article/category URLs in Google Search Console
