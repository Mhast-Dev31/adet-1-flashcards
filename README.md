# ADET 1 Flashcards

Gizmo-style ADET 1 multiple-choice reviewer built with React, TypeScript, Vite, and Tailwind CSS.

## Included

- 80 multiple-choice questions
- Immediate correct/incorrect feedback
- Explanation after each answer
- Score and progress tracking
- Topic filtering
- Restart button
- Mobile-friendly layout
- GitHub Pages-ready Vite configuration

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload/push all files in this folder.
3. In the repository, open **Settings → Pages**.
4. Choose **GitHub Actions** as the build/deployment source.
5. Add a Vite/Node GitHub Pages workflow, or deploy the generated `dist` folder with your preferred Pages workflow.
6. Push to the default branch and wait for the Pages workflow to finish.

The Vite config uses `base: './'`, so generated asset paths are relative and suitable for a repository subpath.

## Main files

- `src/App.tsx` — flashcard questions and UI
- `src/index.css` — Tailwind/CSS setup
- `src/main.tsx` — React entry point
- `vite.config.ts` — Vite and GitHub Pages configuration
