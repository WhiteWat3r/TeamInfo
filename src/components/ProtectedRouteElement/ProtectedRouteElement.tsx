import { ReactNode } from 'react';
import { useAppSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRouteElement = ({
  element,
  anonymous = false,
}: {
  element: ReactNode;
  anonymous?: boolean;
}) => {
  const location = useLocation();
  const from = location.state?.from || '/';

  const isAuthenticated = useAppSelector((store) => store.main.isAuthenticated);

  if (anonymous && isAuthenticated) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuthenticated) {
    return <Navigate to="/authentification" state={{ from: location }} />;
  }
  return <>{element}</>;
};
