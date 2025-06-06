// src/context/auth.context.tsx

import React, { useState, useEffect, createContext } from "react";
import type { ReactNode } from "react";

const API_URL = "http://localhost:5005";

interface User {
  // Adapte esses campos ao seu modelo de usuário
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  updateUser: (newUser: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  updateUser: () => {}, // Default implementation for updateUser
});

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProviderWrapper({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Example logic to update isLoggedIn based on user state
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  /*
    Functions for handling the authentication status (isLoggedIn, isLoading, user)
    will be added here later in the next step
  */

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper };