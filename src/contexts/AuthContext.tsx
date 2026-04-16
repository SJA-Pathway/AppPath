import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // TODO: Replace with real Firebase auth calls
  // See src/config/firebase.ts to set up your Firebase project

  const login = async (email: string, _password: string) => {
    setLoading(true);
    try {
      // Simulated login — replace with Firebase Auth
      // import { signInWithEmailAndPassword } from "firebase/auth";
      // const credential = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        uid: "demo-user-id",
        email,
        displayName: email.split("@")[0],
        createdAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, _password: string, name: string) => {
    setLoading(true);
    try {
      // Simulated signup — replace with Firebase Auth
      // import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
      // const credential = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(credential.user, { displayName: name });
      setUser({
        uid: "demo-user-id",
        email,
        displayName: name,
        createdAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // import { signOut } from "firebase/auth";
    // await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
