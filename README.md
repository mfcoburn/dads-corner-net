# Dad's Corner – dadscorner.net

A modern static website replacing the previous GoDaddy-hosted www.dadscorner.net.

## Project Structure

```
dads-corner-net/
├── index.html        # Home page
├── about.html        # About page
├── contact.html      # Contact page
├── css/
│   └── styles.css    # All styles (responsive, mobile-first)
├── js/
│   └── main.js       # Mobile nav, form handling, scroll effects
└── images/           # Place any site images here
```

## Developing Locally

No build step required – it's plain HTML, CSS, and JavaScript.

```bash
# Open in your browser directly, or use any static server:
npx serve .
# Then open http://localhost:3000
```

## Deploying

### GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to the `main` branch and `/ (root)`.
4. Your site will be live at `https://<username>.github.io/<repo>/`.

### GoDaddy / cPanel File Manager

1. Zip the repository contents (not the folder, just the files inside).
2. Log in to GoDaddy → **cPanel → File Manager**.
3. Navigate to `public_html`.
4. Upload and extract the zip.
5. The site will be live at your domain.

### Netlify / Vercel (recommended)

1. Connect your GitHub repository.
2. Set the **publish directory** to `.` (root).
3. No build command required.
4. Add your custom domain `dadscorner.net` in the site settings.

## Contact Form

The contact form (`contact.html`) uses client-side JavaScript for validation and simulates submission. To wire it up to a real backend:

- **Formspree**: Replace the `form` action with your Formspree endpoint.
- **Netlify Forms**: Add `netlify` attribute to the `<form>` tag when deploying on Netlify.
- **EmailJS**: Integrate the EmailJS SDK for fully client-side email sending.

## License

Personal / private use.