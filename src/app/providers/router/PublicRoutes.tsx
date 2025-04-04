import { Auth } from "@/pages/auth/Auth";
import { Route } from "react-router-dom";

export const PublicRoutes = (
  <>
    <Route path="/login" element={<Auth/>} />
    <Route path="/register" element={<Auth/>} />
   
  </>
);