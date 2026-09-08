import api from "./api";

export const loginUser = async (email, password) => {
    const response = await api.post("/api/auth/login", {
        email,
        password
    });

    return response.data;
};

export const registerUser = async (userData) => {

    const response = await api.post(
        "/api/users/register",
        userData
    );

    return response.data;
};