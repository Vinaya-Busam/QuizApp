import api from "./api";

export const getAllQuizzes = async () => {
    const response = await api.get("/api/getAllQuizzes");

    return response.data;
};