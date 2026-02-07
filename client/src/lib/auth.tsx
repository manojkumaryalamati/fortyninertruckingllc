import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { auth, isFirebaseConfigured } from "./firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // If firebase is not configured, we might want to just stop loading or show an error
    // For now, we'll try to listen to auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      if (!isFirebaseConfigured()) {
        // Fallback for mockup mode if no keys provided
        if (password === "admin123" || password === "password") {
          // Create a fake user object that looks like a Firebase User
          const mockUser = { 
            uid: "mock-uid-123", 
            email, 
            displayName: "Admin User",
            emailVerified: true,
            isAnonymous: false,
            metadata: {},
            providerData: [],
            refreshToken: "",
            tenantId: null,
            delete: async () => {},
            getIdToken: async () => "mock-token",
            getIdTokenResult: async () => ({
              token: "mock-token",
              signInProvider: "password",
              claims: {},
              authTime: Date.now().toString(),
              issuedAtTime: Date.now().toString(),
              expirationTime: (Date.now() + 3600000).toString(),
            }),
            reload: async () => {},
            toJSON: () => ({}),
            phoneNumber: null,
            photoURL: null,
            providerId: "firebase"
          } as unknown as User;
          
          setUser(mockUser);
          setLocation("/admin");
          return;
        } else {
           throw new Error("Invalid credentials (Mock mode: use 'admin123')");
        }
      }

      await signInWithEmailAndPassword(auth, email, password);
      setLocation("/admin");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to login");
      throw err;
    }
  };

  const logout = async () => {
    try {
      if (!isFirebaseConfigured()) {
        setUser(null);
        setLocation("/login");
        return;
      }
      
      await signOut(auth);
      setLocation("/login");
    } catch (err: any) {
      console.error("Logout error:", err);
      setError(err.message || "Failed to logout");
    }
  };

  const updateProfile = async (displayName?: string) => {
    if (user && displayName) {
       // Note: updateProfile is imported from firebase/auth
       // We need to import it at the top level
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function ProtectedRoute({ component: Component, ...rest }: { component: React.ComponentType<any> }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect
  }

  return <Component {...rest} />;
}
