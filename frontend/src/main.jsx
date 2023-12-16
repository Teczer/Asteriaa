import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { QuizzContextProvider } from "../context/QuizzContext";
import { Spinner } from "@chakra-ui/spinner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const LazyApp = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="311077699536-r6i1fchgbu9q7n70bhtfl0rqei5kqc3d.apps.googleusercontent.com">
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
  </GoogleOAuthProvider>
);
