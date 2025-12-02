import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <AppRoutes />
      <Toaster position="top-center" />
    </>
  </StrictMode>
);
