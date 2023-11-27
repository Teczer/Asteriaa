import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    case "UPDATE_USER":
      return { user: action.payload };
    default:
      return state;
  }
};

// AuthContextProvider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  const updateUserContext = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch({ type: "UPDATE_USER", payload: userData });
  };

  const logoutUser = () => {
    // Pour se déconnecter, vous pouvez simplement effacer les données utilisateur du 'localStorage'
    localStorage.removeItem("user");
    // Ensuite, utilisez le dispatch pour mettre à jour le contexte avec 'user: null'
    dispatch({ type: "LOGOUT" });
  };

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, updateUserContext, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
