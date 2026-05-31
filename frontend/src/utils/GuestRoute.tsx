import { Navigate } from "react-router-dom";

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
