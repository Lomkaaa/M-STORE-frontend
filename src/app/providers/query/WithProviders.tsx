import { Provider } from "react-redux";
import { store } from "../store/index";
import { ReactQueryProvider } from "./ReactQueryProvider";

export const withProviders = (Component: React.FC) => () => {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <Component />
      </ReactQueryProvider>
    </Provider>
  );
};