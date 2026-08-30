import api from "./api";

export const getQuestionsForQuiz = async (quizId) => {
    const response = await api.get(`/api/quiz/${quizId}/questions`);

    return response.data;
};

export const getAllQuestions = async () => {
    const response = await api.get("/api/getAllQuestions");
    return response.data;
};

export const getQuestionsByQuiz = async (quizId) => {
    const response = await api.get(
        `/api/admin/quizzes/${quizId}/questions`
    );

    return response.data;
};

export const createQuestion = async (questionData) => {
    const response = await api.post(
        "/api/question/create",
        questionData
    );

    return response.data;
};

export const updateQuestion = async (id, questionData) => {
    const response = await api.put(
        `/api/updateQuestion/${id}`,
        questionData
    );

    return response.data;
};

export const deleteQuestion = async (id) => {
    await api.delete(`/api/deleteQuestion/${id}`);
};