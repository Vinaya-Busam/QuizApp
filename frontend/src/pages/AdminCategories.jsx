import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../services/categoryService";


function AdminCategories() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });


    const fetchCategories = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllCategories();

            setCategories(data);

        } catch (error) {

            console.error(
                "Category API Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load categories."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCategories();
    }, []);


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    const openCreateForm = () => {

        setEditingCategory(null);

        setFormData({
            name: "",
            description: ""
        });

        setShowForm(true);
    };


    const openEditForm = (category) => {

        setEditingCategory(category);

        setFormData({
            name: category.name,
            description: category.description
        });

        setShowForm(true);
    };


    const closeForm = () => {

        setShowForm(false);
        setEditingCategory(null);

        setFormData({
            name: "",
            description: ""
        });
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const categoryData = {
                name: formData.name,
                description: formData.description
            };


            if (editingCategory) {

                await updateCategory(
                    editingCategory.id,
                    categoryData
                );

            } else {

                await createCategory(categoryData);
            }


            closeForm();

            await fetchCategories();

        } catch (error) {

            console.error(
                "Save Category Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to save category."
            );
        }
    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) {
            return;
        }


        try {

            await deleteCategory(id);

            setCategories((previous) =>
                previous.filter(
                    (category) => category.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Delete Category Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to delete category."
            );
        }
    };


    return (
        <div className="admin-categories-page">

            <Navbar />

            <main className="admin-categories-content">

                <div className="admin-categories-heading">

                    <div>
                        <h1>Category Management</h1>

                        <p>
                            Create and manage quiz categories.
                        </p>
                    </div>


                    <div className="admin-category-actions">

                        <button
                            className="back-button"
                            onClick={() =>
                                navigate("/admin/dashboard")
                            }
                        >
                            ← Dashboard
                        </button>

                        <button
                            className="create-category-button"
                            onClick={openCreateForm}
                        >
                            + Create Category
                        </button>

                    </div>

                </div>


                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}


                {showForm && (

                    <div className="category-form-card">

                        <div className="category-form-header">

                            <h2>
                                {editingCategory
                                    ? "Edit Category"
                                    : "Create Category"}
                            </h2>

                            <button
                                onClick={closeForm}
                            >
                                ✕
                            </button>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="form-group">

                                <label>
                                    Category Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                />

                            </div>


                            <div className="form-actions">

                                <button
                                    type="button"
                                    onClick={closeForm}
                                >
                                    Cancel
                                </button>

                                <button type="submit">
                                    {editingCategory
                                        ? "Update Category"
                                        : "Create Category"}
                                </button>

                            </div>

                        </form>

                    </div>

                )}


                {loading ? (

                    <div className="dashboard-message">
                        Loading categories...
                    </div>

                ) : categories.length === 0 ? (

                    <div className="empty-state">

                        <h3>
                            No categories found
                        </h3>

                        <p>
                            Create your first category.
                        </p>

                    </div>

                ) : (

                    <div className="admin-category-list">

                        {categories.map((category) => (

                            <div
                                className="admin-category-card"
                                key={category.id}
                            >

                                <div className="admin-category-info">

                                    <h3>
                                        {category.name}
                                    </h3>

                                    <p>
                                        {category.description}
                                    </p>

                                </div>


                                <div className="admin-category-card-actions">

                                    <button
                                        onClick={() =>
                                            openEditForm(category)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default AdminCategories;