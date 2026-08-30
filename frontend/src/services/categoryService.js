import api from "./api";

export const getAllCategories = async () => {
    const response = await api.get("/api/categories");
    return response.data;
};

export const createCategory = async (categoryData) => {
    const response = await api.post(
        "/api/category/create",
        categoryData
    );
    return response.data;
};

export const updateCategory = async (id, categoryData) => {
    const response = await api.put(
        `/api/categories/${id}`,
        categoryData
    );
    return response.data;
};

export const deleteCategory = async (id) => {
    await api.delete(`/api/categories/${id}`);
};