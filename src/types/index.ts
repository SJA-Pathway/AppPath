export type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  category: string;
  createdAt: string;
  userId: string;
};

export type ChatRoom = {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageAt?: string;
  members: string[];
  photoURL?: string;
};

export type ChatMessage = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: string;
  roomId: string;
};
