import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function RootRoute() {
  const accessToken = Cookies.get("accessToken");

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/auth" replace />;
}
