import { Route } from "react-router-dom";
import LoginForm from "@/features/auth/ui/LoginForm";
import RegisterForm from "@/features/auth/ui/RegisterForm";

export const PublicRoutes = (
  <>
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<RegisterForm />} />
  </>
);