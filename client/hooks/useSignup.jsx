import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const signup = async (email, password) => {
		setIsLoading(true);
		setError(null);
		/* 	const response = await fetch("http://localhost:5001/user/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		}); */
		try {
			const { data } = await axios.post(
				"http://localhost:5001/user/signup",
				JSON.stringify({
					email,
					password,
				}),
				{
					headers: { "Content-Type": "application/json" },
				},
			);
			// save the user to localstorage
			localStorage.setItem("user", JSON.stringify(data));
			// update the auth context
			dispatch({ type: "LOGIN", payload: data });

			setIsLoading(false);
		} catch (error) {
			const { response } = error;
			console.log(error);
			setIsLoading(false);
			setError(response.data.error);
		}
	};
	return { signup, isLoading, error };
};
