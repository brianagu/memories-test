# Photo Portfolio Site

A dynamic photo portfolio built from a Figma design. The site features:

- **Filesystem-based CMS**: Drop images into `public/media/` folder with filenames like `Title_Year.jpg` or `Title_Year_CreditLabel.jpg`
- **Randomized layouts**: Content order and layout variant randomize on every page load
- **Scroll animations**: Images fade in, unblur, and scale down as they enter the viewport
- **8 layout variants**: Small left/right/center, medium left/right/center, large center, and full-width blocks
- **No adjacent duplicates**: The same layout variant never appears twice in a row

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Adding Photos

1. Create an image file in `public/media/` using one of these filename formats:
   - `Title_Year.jpg` — image with just title and year caption
   - `Title_Year_CreditLabel.jpg` — image with title, year, and a credit line

   Example: `SanFrancisco_2019_ShotForGoogle.jpg`

2. The filename is parsed automatically: the year must be 4 digits, credit label is optional

3. Refresh the page — your image appears with a random layout variant

### Build & Deploy

```bash
npm run build
npm start
```

Deploy to **Vercel**:
1. Push the repo to GitHub
2. Import into Vercel (free tier)
3. Add a CNAME record in your domain registrar pointing to Vercel's servers

## Architecture

- **`lib/variants.ts`** — Layout variant definitions (8 total, with sizes/alignment)
- **`lib/media.ts`** — Reads and parses image filenames from `public/media/`
- **`lib/shuffle.ts`** — Fisher-Yates shuffle + adjacent-safe variant assignment
- **`components/MediaBlock.tsx`** — Single media item with scroll-triggered animations (Framer Motion)
- **`components/Gallery.tsx`** — Client-side wrapper that randomizes on mount
- **`components/Nav.tsx`** — Sticky navigation bar
- **`components/Footer.tsx`** — Footer with copyright and social links
- **`config/site.ts`** — Site text constants

## Stack

- [Next.js 16](https://nextjs.org) — App Router, TypeScript
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Framer Motion](https://www.framer.com/motion) — Scroll animations
- [Vercel](https://vercel.com) — Hosting (free tier)
