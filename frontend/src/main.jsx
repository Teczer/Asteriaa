import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { QuizzContextProvider } from "../context/QuizzContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthContextProvider>
		<QuizzContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QuizzContextProvider>
	</AuthContextProvider>,
);
