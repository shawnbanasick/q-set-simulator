import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import "./i18n.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        toastOptions={{
          classNames: {
            toast: "bg-zinc-950 border border-zinc-800 text-white rounded-xl",
            title: "font-semibold",
            description: "text-zinc-400",
            actionButton:
              "bg-blue-500 text-white font-medium py-1 px-3 rounded-md",
            cancelButton: "bg-zinc-800 text-zinc-300",
            success: "!bg-blue-300 border-l-4 border-l-green-500",
          },
        }}
      />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
