import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import type { ReactNode } from "react";

interface IsPrivateProps {
  children: ReactNode;
}   

function IsPrivate({ children }: IsPrivateProps) {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    // If the user is not logged in, redirect to the login page ❌
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, allow to see the page ✅
  return <>{children}</>;
}
export default IsPrivate;