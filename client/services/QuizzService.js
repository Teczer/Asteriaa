import axios from "axios";

const apiURL = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_URL_API
  : import.meta.env.VITE_SERVER_LOCAL_URL_API;

export async function getSqlQuizz(params) {
  try {
    const response = await axios.post(`${apiURL}/quizz`, {
      quizzType: params.quizzType,
      quizzProgression: params.quizzProgression,
    });

    console.log("Axios SQL Response", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
