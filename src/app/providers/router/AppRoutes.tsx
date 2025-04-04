import { Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRouter";
import { Layout } from "@/widgets/layout/";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {PrivateRoutes}
      </Route>
      {PublicRoutes}
    </Routes>
  );
};
