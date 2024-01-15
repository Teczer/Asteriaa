import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { QuizzContextProvider } from "../context/QuizzContext";
import { Spinner } from "@chakra-ui/spinner";

const LazyApp = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <QuizzContextProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <Spinner
              color="red.500"
              size="xl"
              style={{
                width: "50px",
                height: "50px",
                position: "fixed",
                color: "white",
                bottom: "50%",
                right: "50%",
              }}
            />
          }
        >
          <LazyApp />
        </Suspense>
      </BrowserRouter>
    </QuizzContextProvider>
  </AuthContextProvider>
);
