import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./styles/globals.scss";
import { Layout } from "./components/index.ts";
import ColorModeProvider from "./context/ColorModeContext.tsx";
import { DetailPage, FavouritePage } from "./pages/index.ts";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/detail/:id",
    element: <DetailPage />,
  },
  {
    path: "/favourite",
    element: <FavouritePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeProvider>
      <Layout>
        <CssBaseline />
        <RouterProvider router={router} />
      </Layout>
    </ColorModeProvider>
  </React.StrictMode>
);
