import axios from "axios";

export const SECRET_ADMIN_KEY = import.meta.env.VITE_SECRET_ADMIN_KEY;
export const apiURL =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_SERVER_LOCAL_URL_API
    : import.meta.env.VITE_PROD_URL_API;

export const getUser = async (userId) => {
  try {
    const { data } = await axios.get(`${apiURL}/user/${userId}`);
    console.log("data", data);
    return data; // Renvoie les informations de l'utilisateur
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur : ",
      error
    );

    // Vérifie si l'erreur est due à un statut 404 (Si l'utilisateur a été supprimé alors que l'utilisateur était connecté)
    if (error.response && error.response.status === 404) {
      // Si le statut est 404, vide la clé "user" du stockage local
      localStorage.removeItem("user");
      // Redirige l'utilisateur vers la page d'accueil
      window.location.href = "/";
    }
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await axios.get(`${apiURL}/user/`, {
      headers: {
        secretadminkey: SECRET_ADMIN_KEY,
      },
    });
    return data; // Renvoie les informations de l'utilisateur
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur : ",
      error
    );
    return null;
  }
};

export const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${apiURL}/user/login`,
      JSON.stringify({ email, password }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur : ", error);
    throw new Error(
      error.response?.data?.error ||
        "Une erreur s'est produite lors de la connexion."
    );
  }
};

export const signupUser = async (email, password, userName) => {
  try {
    const { data } = await axios.post(
      `${apiURL}/user/signup`,
      JSON.stringify({
        email,
        password,
        isAdmin: false,
        userName,
        profilePicture:
          "https://cdn.dribbble.com/users/1438762/screenshots/11159465/media/47bff5efea8682a4a28d8f10675225de.jpg?compress=1&resize=400x300&vertical=center",
        quizzSystemeSolaire: 1,
        quizzGalaxies: 1,
        quizzPhenomenesObservables: 1,
        quizzAstronautes: 1,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendVerificationEmail = async (email, userId, username) => {
  try {
    const { data } = await axios.post(
      `${apiURL}/user/send-verification-email`,
      { email, userId, username },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, data) => {
  try {
    // Effectuez la requête PATCH pour mettre à jour l'utilisateur
    await axios.patch(`${apiURL}/user/${userId}`, data, {
      headers: {
        secretadminkey: SECRET_ADMIN_KEY,
      },
    });

    // Re-récupérez les données mises à jour de l'utilisateur après le patch
    const { data: updatedUserData } = await axios.get(`/user/${userId}`);

    // Retournez les données mises à jour
    return updatedUserData;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
    throw error; // Propagez l'erreur pour la gérer au niveau supérieur si nécessaire
  }
};

export const deleteUserNeedPassword = async (userId, password) => {
  try {
    // Effectuez la requête POST pour supprimer l'utilisateur avec un mot de passe
    const response = await axios.post(
      `${apiURL}/user/delete/${userId}`,
      { password },
      {
        headers: {
          secretadminkey: SECRET_ADMIN_KEY,
        },
      }
    );

    return response; // Vous pouvez également renvoyer d'autres données en fonction de l'API
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur : ", error);
    throw error; // Propagez l'erreur pour la gérer au niveau supérieur si nécessaire
  }
};

export const createUser = async (user) => {
  try {
    const { data } = await axios.post(`${apiURL}/user/create`, user, {
      headers: {
        secretadminkey: SECRET_ADMIN_KEY,
      },
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur : ", error);
    return error;
  }
};
