import { Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRouter";
import { AdminRoutes } from "./AdminRouter";
import { Layout } from "@/widgets/layout/";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {PrivateRoutes}
        {AdminRoutes} {/* Админ маршруты внутри общего Layout */}
      </Route>
      {PublicRoutes}
    </Routes>
  );
};