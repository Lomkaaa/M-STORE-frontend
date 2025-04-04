import { useCurrentUser } from "@/entities/user/api/api";
import { LoadingSpinner } from "@/shared/ui/Spinner/Spinner";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <LoadingSpinner/>;

  if (!user) return <Navigate to="/login" replace />; // Неавторизованный → на логин
  if (user.role !== "ADMIN") return <Navigate to="/" replace />; // Не админ → на главную

  return <Outlet />;
};