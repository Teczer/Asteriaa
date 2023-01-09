import { QuizzContext } from "../context/QuizzContext";
import { useContext } from "react";

export const useQuizzContext = () => {
	const context = useContext(QuizzContext);

	if (!context) {
		throw Error("useQuizzContext must be used inside an QuizzContextProvider");
	}

	return context;
};
