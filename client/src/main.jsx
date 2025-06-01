import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { lazy } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.jsx";
import "./index.css";

const App = lazy(() => import("./App.jsx"));
const CustomErrors = lazy(() =>
  import("./components/CustomErrorBoundry/Error.jsx")
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback={<Error />}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
