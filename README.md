# Lifeloop by SJA Pathway

> Loop everything in your life — notes, tasks, chat, and AI in one app.

**Lifeloop** is the flagship open-source project of the SJA Pathway mobile hub: an all-in-one personal productivity app built with React Native (Expo), Firebase, and a Cloudflare Worker backend. It ships as a single cross-platform app for iOS, Android, and the web — deployed today at [apppath-app.sja-affu765.workers.dev](https://apppath-app.sja-affu765.workers.dev) (the `apppath` URL is the legacy deployment slug; the product brand is Lifeloop).

> Repository name (`AppPath`) and worker subdomains stay the same to avoid breaking existing deploy URLs and links. All user-facing branding, copy, and store metadata use **Lifeloop**.

## Repo Overview

Lifeloop is a hands-on learning playground *and* a real shipping app. One codebase covers the full stack:

- **The mobile app** (`app/`, `src/`) — an Expo Router app with auth, a tabbed dashboard (Home, Notes, Tasks, Chat, Profile), a shared component library, and a theme system that supports light/dark mode out of the box. It currently runs in demo mode so anyone can clone and try it without setting up Firebase.
- **The backend API** (`worker/`) — a Cloudflare Worker that exposes REST routes for notes, tasks, chat, and user data. It's wired for D1 (SQL), KV, and R2 (object storage) bindings so contributors can extend it without standing up new infrastructure.
- **A 100-issue contributor backlog** ([open issues](https://github.com/SJA-Pathway/AppPath/issues)) — every task is labelled `difficulty:beginner | medium | hard` or `ai`, with acceptance criteria, so newcomers can pick something matched to their skill level and AI-focused contributors have a dedicated track (RAG chat, Whisper dictation, semantic search, Claude tool-use agents, multimodal capture, and more).

### Kanban Board

Track work visually on the GitHub Projects board: **[Lifeloop Kanban](https://github.com/orgs/SJA-Pathway/projects/3)**.

Quick filtered views of the backlog (use these to triage straight from the issues list):

| Lane | Link |
|---|---|
| Good first issues | [`good first issue`](https://github.com/SJA-Pathway/AppPath/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) |
| Beginner | [`difficulty:beginner`](https://github.com/SJA-Pathway/AppPath/issues?q=is%3Aissue+is%3Aopen+label%3A%22difficulty%3Abeginner%22) |
| Medium | [`difficulty:medium`](https://github.com/SJA-Pathway/AppPath/issues?q=is%3Aissue+is%3Aopen+label%3A%22difficulty%3Amedium%22) |
| Hard | [`difficulty:hard`](https://github.com/SJA-Pathway/AppPath/issues?q=is%3Aissue+is%3Aopen+label%3A%22difficulty%3Ahard%22) |
| AI track | [`ai`](https://github.com/SJA-Pathway/AppPath/issues?q=is%3Aissue+is%3Aopen+label%3Aai) |

The project exists for two audiences at once: **interns and learners** who want a real, production-shaped codebase to grow in, and **users** who want a clean, fast personal-productivity app that loops their life into one place.

## Vision

Empowering developers, designers, and learners to collaborate on real-world mobile applications — freely, creatively, and without limits.

## Tech Stack

| Layer            | Technology              | Notes                                  |
|------------------|-------------------------|----------------------------------------|
| Frontend         | React Native (Expo)     | Cross-platform mobile + web UI         |
| Routing          | Expo Router             | File-based navigation with typed routes|
| Backend API      | Cloudflare Workers      | Serverless edge API (`/worker`)        |
| Database         | Firebase Firestore / D1 | Cloud NoSQL + Cloudflare D1 SQL        |
| Authentication   | Firebase Auth           | Email/password, social login           |
| Storage          | Firebase Storage / R2   | Media uploads                          |
| State Management | React Context           | Auth + Theme contexts built-in         |
| Language         | TypeScript              | Strict mode enabled                    |
| Design           | Figma                   | UI/UX design                           |
| Version Control  | GitHub                  | Free public repositories               |

## Project Structure

```
Lifeloop/                  # repo: github.com/SJA-Pathway/AppPath
├── app/                    # Expo Router screens (file-based routing)
│   ├── _layout.tsx         # Root layout (providers)
│   ├── index.tsx           # Entry redirect (auth check)
│   ├── (auth)/             # Auth screens
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   └── (tabs)/             # Main app tabs
│       ├── _layout.tsx     # Tab bar configuration
│       ├── home.tsx        # Dashboard with feature grid
│       ├── notes.tsx       # Notes with CRUD + colors + pinning
│       ├── tasks.tsx       # Tasks with priorities + categories + progress
│       ├── chat.tsx        # Real-time chat (demo mode)
│       └── profile.tsx     # User profile + settings
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── FeatureCard.tsx
│   │   └── EmptyState.tsx
│   ├── constants/          # Theme, features config
│   ├── contexts/           # Auth + Theme providers
│   ├── config/             # Firebase config
│   └── types/              # TypeScript type definitions
├── worker/                 # Cloudflare Worker backend
│   ├── src/index.ts        # API routes (notes, tasks, user)
│   ├── wrangler.toml       # Worker config (D1, KV, R2 bindings)
│   ├── package.json
│   └── tsconfig.json
├── assets/                 # App icons, splash screens
├── app.json                # Expo configuration
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript config
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npx expo`)
- Wrangler CLI (`npx wrangler`) for Cloudflare Workers

### Demo Login

The app runs in demo mode (no Firebase required). Use any credentials to sign in:

| Field    | Value            |
|----------|------------------|
| Email    | `test@test.com`  |
| Password | `123456`         |

### Mobile App

```bash
# Clone the repo
git clone https://github.com/yourusername/AppPath.git
cd AppPath

# Install dependencies
npm install

# Start Expo dev server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

### Cloudflare Worker (Backend API)

```bash
cd worker

# Install worker dependencies
npm install

# Run locally
npm run dev

# Deploy to Cloudflare
npm run deploy
```

## Features Built (Ready to Extend)

| Feature | Description | Status |
|---------|-------------|--------|
| Auth (Login/Signup/Forgot) | Email/password authentication flow | Ready |
| Home Dashboard | Feature grid with stats overview | Ready |
| Notes | Create, pin, color-code, delete notes | Ready |
| Tasks | Add tasks with priority, category, filters, progress bar | Ready |
| Chat | Real-time messaging UI (demo mode) | Ready |
| Profile | User info, theme toggle, settings menu | Ready |
| Dark/Light Theme | Full theme system with toggle | Ready |
| Cloudflare Worker API | REST endpoints for notes, tasks, user | Ready |

## Features for Interns to Build

Pick any of these and create a PR! Each feature lives under its own route.

| Feature | Description | Difficulty |
|---------|-------------|------------|
| Weather | Live weather with location API | Beginner |
| Pomodoro Timer | Focus timer with sessions | Beginner |
| Bookmarks | Save and organize web links | Beginner |
| Habits Tracker | Daily habits with streaks | Intermediate |
| Budget Manager | Track expenses with charts | Intermediate |
| Journal | Daily entries with mood tracking | Intermediate |
| Calendar | Events and reminders | Intermediate |
| Recipes | Save, search, and share recipes | Intermediate |
| Fitness Tracker | Workout logging with stats | Advanced |
| Push Notifications | Expo push notification system | Advanced |
| Offline Sync | Offline-first data with sync | Advanced |
| D1 Database | Migrate Worker API to use D1 | Advanced |
| Image Upload | Profile pics via R2/Firebase Storage | Advanced |
| Social Auth | Google/Apple sign-in | Advanced |

## Contribution Guidelines

1. Fork this repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Follow existing code patterns and TypeScript strict mode
4. Add your screen under `app/(tabs)/` or `app/features/`
5. Use the shared components from `src/components/`
6. Use the theme system via `useTheme()` hook
7. Submit a PR with a clear description of what you built

## Live URLs

| | URL |
|---|---|
| Frontend | https://apppath-app.sja-affu765.workers.dev |
| API | https://apppath-api.sja-affu765.workers.dev |

## Deployment

- **Mobile**: Build with `npx expo build` or EAS Build for store releases
- **Web**: `npm run build:web` exports static web build
- **Frontend Worker**: `npx wrangler deploy --config wrangler-frontend.toml`
- **API Worker**: `cd worker && npm run deploy`
