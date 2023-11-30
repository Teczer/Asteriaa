import axios from "axios";

const apiURL =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_SERVER_LOCAL_URL_API
    : import.meta.env.VITE_PROD_URL_API;

// POST QUIZZ CONTROLLER
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

// GET ALL QUIZZ
export async function getAllQuizz() {
  try {
    const response = await axios.get(`${apiURL}/quizz/all`);
    console.log("Axios GET All Quizz Response", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// GET QUIZZ BY ID
export async function getFullQuizzById(quizzId) {
  try {
    const response = await axios.get(`${apiURL}/quizz/${quizzId}`);
    console.log("Axios Get Full Quizz Response", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// POST CREATE QUIZZ
export async function createQuizz(params) {
  try {
    const response = await axios.post(`${apiURL}/quizz/create`, params);
    console.log("Axios POST Create Quizz Response", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// DELETE QUIZZ
export async function deleteQuizz(quizzId) {
  try {
    const response = await axios.delete(`${apiURL}/quizz/${quizzId}`);
    console.log("Axios DELETE Quizz Response", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
