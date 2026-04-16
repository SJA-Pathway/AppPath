# AppPath by SJA Pathway

AppPath is an open-source mobile app development hub under SJA Pathway. The flagship project is **LifeHub** — an all-in-one personal productivity app built with React Native (Expo), Firebase, and a Cloudflare Worker backend.

Anyone can contribute, learn, and grow through hands-on mobile development experience.

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
AppPath/
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

## Deployment

- **Mobile**: Build with `npx expo build` or EAS Build for store releases
- **Web**: `npm run build:web` exports static web build
- **Backend**: `cd worker && npm run deploy` deploys to Cloudflare Workers edge network globally
