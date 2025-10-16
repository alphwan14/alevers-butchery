Alevers Butcher — Next.js + Tailwind + Firebase

Project Structure

src/
- app/
  - layout.tsx
  - page.tsx
  - globals.css
  - admin/page.tsx
  - login/page.tsx
- lib/
  - firebase.ts
  - whatsapp.ts
public/
- hero-meat.jpg
- goat.jpg
- beef.jpg
- chicken.jpg

Environment Variables (.env.local)

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

Scripts

- dev: next dev --turbopack
- build: next build --turbopack
- start: next start
- lint: next lint

Local Development

1) npm install
2) create .env.local with Firebase web config
3) npm run dev

Build & Run

1) npm run build
2) npm run start

Admin

- /login for email/password auth
- /admin dashboard (protected): upload images, manage products/offers

Hosting

- Vercel: import repo, set env vars, deploy
- Firebase Hosting: build locally, deploy hosting, ensure env vars present at build
