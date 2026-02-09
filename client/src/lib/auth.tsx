import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { auth, isFirebaseConfigured, db } from "./firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser && isFirebaseConfigured()) {
        try {
          // Verify admin role
          const userDocRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDocRef);
          
          if (userSnap.exists() && userSnap.data().role === "admin") {
            setIsAdmin(true);
          } else {
            console.warn("User is not an admin");
            setIsAdmin(false);
            // Optional: Auto logout if strictly admin-only app
            // await signOut(auth);
            // setUser(null);
          }
        } catch (e) {
          console.error("Error verifying admin role:", e);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      if (!isFirebaseConfigured()) {
        // Fallback for mockup mode only if no keys provided
        if (password === "admin123") {
          // ... (mock user creation)
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
          setIsAdmin(true); // Mock admin is always admin
          setLocation("/admin");
          return;
        } else {
           throw new Error("Invalid credentials (Mock mode: use 'admin123')");
        }
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Verify role immediately after login
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userSnap = await getDoc(userDocRef);
      
      if (userSnap.exists() && userSnap.data().role === "admin") {
        setIsAdmin(true);
        setLocation("/admin");
      } else {
        await signOut(auth);
        throw new Error("Access Denied: Admin privileges required.");
      }
      
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
        setIsAdmin(false);
        setLocation("/login");
        return;
      }
      
      await signOut(auth);
      setIsAdmin(false);
      setLocation("/login");
    } catch (err: any) {
      console.error("Logout error:", err);
      setError(err.message || "Failed to logout");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, isLoading, error }}>
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
