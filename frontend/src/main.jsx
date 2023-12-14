import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { QuizzContextProvider } from "../context/QuizzContext";

const LazyApp = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <QuizzContextProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyApp />
        </Suspense>
      </BrowserRouter>
    </QuizzContextProvider>
  </AuthContextProvider>
);
