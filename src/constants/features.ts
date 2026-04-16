import { Ionicons } from "@expo/vector-icons";

export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route: string;
  status: "ready" | "coming-soon" | "in-progress";
};

export const FEATURES: FeatureItem[] = [
  {
    id: "notes",
    title: "Notes",
    description: "Create, organize, and sync your notes",
    icon: "document-text",
    color: "#e94560",
    route: "/(tabs)/notes",
    status: "ready",
  },
  {
    id: "tasks",
    title: "Tasks",
    description: "Track your to-dos and stay productive",
    icon: "checkmark-circle",
    color: "#4ade80",
    route: "/(tabs)/tasks",
    status: "ready",
  },
  {
    id: "chat",
    title: "Chat",
    description: "Real-time messaging with friends",
    icon: "chatbubbles",
    color: "#38bdf8",
    route: "/(tabs)/chat",
    status: "ready",
  },
  {
    id: "weather",
    title: "Weather",
    description: "Live weather updates for your location",
    icon: "cloud",
    color: "#fbbf24",
    route: "/features/weather",
    status: "coming-soon",
  },
  {
    id: "fitness",
    title: "Fitness",
    description: "Track workouts and health goals",
    icon: "fitness",
    color: "#f472b6",
    route: "/features/fitness",
    status: "coming-soon",
  },
  {
    id: "budget",
    title: "Budget",
    description: "Manage expenses and savings",
    icon: "wallet",
    color: "#a78bfa",
    route: "/features/budget",
    status: "coming-soon",
  },
  {
    id: "habits",
    title: "Habits",
    description: "Build and track daily habits",
    icon: "trending-up",
    color: "#fb923c",
    route: "/features/habits",
    status: "coming-soon",
  },
  {
    id: "journal",
    title: "Journal",
    description: "Write daily reflections and thoughts",
    icon: "book",
    color: "#2dd4bf",
    route: "/features/journal",
    status: "coming-soon",
  },
  {
    id: "recipes",
    title: "Recipes",
    description: "Save and discover recipes",
    icon: "restaurant",
    color: "#f87171",
    route: "/features/recipes",
    status: "coming-soon",
  },
  {
    id: "pomodoro",
    title: "Pomodoro",
    description: "Focus timer for deep work sessions",
    icon: "timer",
    color: "#34d399",
    route: "/features/pomodoro",
    status: "coming-soon",
  },
  {
    id: "bookmarks",
    title: "Bookmarks",
    description: "Save and organize web links",
    icon: "bookmark",
    color: "#818cf8",
    route: "/features/bookmarks",
    status: "coming-soon",
  },
  {
    id: "calendar",
    title: "Calendar",
    description: "Schedule events and reminders",
    icon: "calendar",
    color: "#fb7185",
    route: "/features/calendar",
    status: "coming-soon",
  },
];
