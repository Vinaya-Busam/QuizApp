import api from "./api";

export const getAllQuizzes = async () => {
    const response = await api.get("/api/getAllQuizzes");

    return response.data;
};
export const createQuiz = async (quizData) => {
    const response = await api.post("/api/quiz/create", quizData);
    return response.data;
};

export const updateQuiz = async (id, quizData) => {
    const response = await api.put(`/api/updateQuiz/${id}`, quizData);
    return response.data;
};

export const deleteQuiz = async (id) => {
    await api.delete(`/api/deleteQuiz/${id}`);
};