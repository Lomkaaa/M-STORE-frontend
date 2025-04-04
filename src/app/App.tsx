import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./providers/router/AppRoutes";
import { withProviders } from "@/app/providers/query/WithProviders";

const App = () => {
  return (
    <Router>
      <AppRoutes/>
    </Router>
  );
};

export default withProviders(App);
