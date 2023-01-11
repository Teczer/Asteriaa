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
		try {
			const { data } = await axios.post(
				"http://146.59.150.192:5001/user/signup",
				JSON.stringify({
					email,
					password,
					quizzSystemeSolaire: 1,
					quizzGalaxies: 1,
					quizzPhenomenesObservables: 1,
					quizzAstronautes: 1,
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
