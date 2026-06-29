# Curry Chiropractic — Windsor, CT

Modern 2025 rebuild of the Curry Chiropractic website (Windsor, Connecticut). Static site, no build step.

- **Stack:** plain HTML + CSS + vanilla JS (zero dependencies)
- **Brand:** black + white + blue accent (original circular logo retained)
- **Content:** services, first-visit process, three phases of care, the Curry doctors, patient testimonials, hours & location

## Business
- **Address:** 15 Central Street, Windsor, CT 06095
- **Phone:** (860) 688-1218

## Develop
Open `index.html` in a browser, or serve locally:

```bash
npx serve .
```

## Deploy
Deployed on Vercel as a static site. Pushes to `main` deploy automatically.

```bash
npx vercel --prod
```

## Structure
```
index.html     # all sections
styles.css     # brand styling
script.js      # nav, scroll reveal
assets/logo.png
vercel.json    # static config
```
