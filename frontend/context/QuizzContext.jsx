import { createContext, useReducer } from "react";

export const QuizzContext = createContext();

export const quizzReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUIZZ":
      return {
        quizz: action.payload,
      };
    case "PATCH_QUIZZ":
      return {
        quizz: [action.payload, ...state.quizz],
      };
    default:
      return state;
  }
};

export const QuizzContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizzReducer, {
    quizz: null,
  });

  return (
    <QuizzContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizzContext.Provider>
  );
};
