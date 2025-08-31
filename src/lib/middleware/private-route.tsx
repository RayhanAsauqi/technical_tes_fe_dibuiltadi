import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: ProtectedRouteProps) {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
