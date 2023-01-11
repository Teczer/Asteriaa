import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setIsLoading(true);
		setError(null);
		try {
			const { data } = await axios.post(
				"http://146.59.150.192:5001/user/login",
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
			console.log("dkoaokda", data);
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
	return { login, isLoading, error };
};
