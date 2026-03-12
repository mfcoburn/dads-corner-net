# Dad's Corner – dadscorner.net

A modern static website for dadscorner.net, hosted on GitHub Pages (or Netlify) — no GoDaddy required.

## Project Structure

```
dads-corner-net/
├── index.html        # Home page
├── about.html        # About page
├── contact.html      # Contact page
├── 404.html          # Custom 404 page
├── CNAME             # Custom domain for GitHub Pages (dadscorner.net)
├── netlify.toml      # Netlify deployment configuration
├── css/
│   └── styles.css    # All styles (responsive, mobile-first)
├── js/
│   └── main.js       # Mobile nav, form handling, scroll effects
├── images/           # Place any site images here
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions – auto-deploy to GitHub Pages
```

## Developing Locally

No build step required – it's plain HTML, CSS, and JavaScript.

```bash
# Use any static server, e.g.:
npx serve .
# Then open http://localhost:3000
```

## Deploying (moving away from GoDaddy)

### Option 1 – GitHub Pages (free, built into GitHub) ✅ recommended

GitHub Pages is the simplest option since the code is already on GitHub.

**One-time setup:**

1. Go to your repository on GitHub.
2. Click **Settings → Pages**.
3. Under **Source**, select **GitHub Actions**.
4. That's it – the `deploy.yml` workflow will publish the site automatically on every push to `main`.

**Custom domain (`dadscorner.net`):**

The `CNAME` file already contains `dadscorner.net`. You only need to update your DNS:

| Type  | Host  | Value                        |
|-------|-------|------------------------------|
| A     | @     | 185.199.108.153              |
| A     | @     | 185.199.109.153              |
| A     | @     | 185.199.110.153              |
| A     | @     | 185.199.111.153              |
| CNAME | www   | mfcoburn.github.io.          |

After DNS propagates (up to 48 hours), GitHub Pages will automatically provision an HTTPS certificate.

> **Note:** If you registered your domain at GoDaddy, you only need to update the DNS records above — you do **not** need to transfer the domain itself to move the website hosting.

---

### Option 2 – Netlify (free, zero-config, form support)

Netlify is a great alternative with a generous free tier and built-in form handling.

**One-time setup:**

1. Log in at <https://app.netlify.com> → **Add new site → Import an existing project**.
2. Connect the **mfcoburn/dads-corner-net** GitHub repository.
3. Leave **Build command** blank and set **Publish directory** to `.`
4. Click **Deploy site** – `netlify.toml` is picked up automatically.
5. Add your custom domain under **Site settings → Domain management**.

**DNS for Netlify custom domain:**

| Type  | Host | Value                              |
|-------|------|------------------------------------|
| CNAME | www  | `<your-netlify-site>.netlify.app.` |
| A     | @    | 75.2.60.5 *(Netlify load balancer)*|

Netlify also provisions HTTPS automatically.

---

## Contact Form

The contact form in `contact.html` uses **Netlify Forms** when hosted on Netlify — no backend or third-party service needed.

- On **Netlify**: form submissions are captured automatically (free up to 100/month). View them in the Netlify dashboard under **Forms**.
- On **GitHub Pages**: a simulated success message is shown. To enable real submissions on GitHub Pages, sign up for [Formspree](https://formspree.io) and add your endpoint as the form `action`.

## License

Personal / private use.