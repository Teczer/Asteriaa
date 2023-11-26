import axios from "axios";

const apiURL = import.meta.env.VITE_PROD_URL_API;

export const getUserInfo = async (userId) => {
  try {
    const { data } = await axios.get(
      `http://146.59.150.192:5001/user/${userId}`
    );
    return data; // Renvoie les informations de l'utilisateur
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur : ",
      error
    );
    return null;
  }
};
