import api from "./api";

export const getAllUsers = async (page = 0, size = 10) => {

    const response = await api.get("/api/users/getAllUsers", {
        params: {
            page,
            size
        }
    });

    return response.data;
};