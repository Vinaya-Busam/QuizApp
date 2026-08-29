import api from "./api";

export const getUserDashboard = async () => {
    const response = await api.get("/api/user/dashboard");

    return response.data;
};