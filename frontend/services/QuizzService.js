import axios from "axios";

// POST QUIZZ CONTROLLER
export async function getSqlQuizz(params) {
  try {
    const response = await axios.post(`/quizz`, {
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
    const response = await axios.get(`/quizz/all`);
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
    const response = await axios.get(`/quizz/${quizzId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// POST CREATE QUIZZ
export async function createQuizz(quizz) {
  try {
    const response = await axios.post(`/quizz/create`, quizz);
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
    const response = await axios.delete(`/quizz/${quizzId}`);
    console.log("Axios DELETE Quizz Response", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// PATCH UPDATE QUIZZ
export async function updateQuizz(quizzId, updatedQuizz) {
  try {
    const response = await axios.patch(`/quizz/${quizzId}`, updatedQuizz);
    console.log("Axios PATCH Update Quizz Response", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
