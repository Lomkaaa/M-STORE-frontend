import { Route } from "react-router-dom";
import ProfilePage from "@/pages/ProfilePage";
import PrivateRoute from "@/shared/lib/PrivateRoute";

export const PrivateRoutes = (
  <Route element={<PrivateRoute />}>
    <Route path="/profile" element={<ProfilePage />} />
  </Route>
);