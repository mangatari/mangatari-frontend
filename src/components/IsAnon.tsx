import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import type { ReactNode } from 'react';

interface IsAnonProps {
  children: ReactNode;
}

function IsAnon({ children }: IsAnonProps) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default IsAnon;
