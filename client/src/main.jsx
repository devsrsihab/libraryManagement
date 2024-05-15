import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import AuthProvider from "./Providers/AuthProvider";
import ThemeChangeProvider from "./Providers/ThemeChangeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ThemeChangeProvider>
      <RouterProvider router={router} />
    </ThemeChangeProvider>
  </AuthProvider>
);
