import api from "./api";

export const submitQuiz = async (quizId, answers) => {

    const request = {
        quizId: Number(quizId),

        answers: answers.map((answer) => ({
            questionId: answer.questionId,
            selectedOption: answer.selectedOption
        }))
    };

    const response = await api.post("/api/quiz/submit", request);

    return response.data;
};

export const getMyAttempts = async () => {

    const response = await api.get("/api/attempts/myAttempts");

    return response.data;
};