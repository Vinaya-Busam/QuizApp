import api from "./api";

export const getQuestionsForQuiz = async (quizId) => {
    const response = await api.get(`/api/quiz/${quizId}/questions`);

    return response.data;
};