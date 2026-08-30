import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import {
    getAllQuizzes,
    createQuiz,
    updateQuiz,
    deleteQuiz
} from "../services/quizService";

function AdminQuizzes() {

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingQuiz, setEditingQuiz] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        categoryId: "",
        timeLimit: ""
    });


    const fetchQuizzes = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllQuizzes();

            setQuizzes(data);

        } catch (error) {

            console.error("Quiz API Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load quizzes."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {
        fetchQuizzes();
    }, []);


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    const openCreateForm = () => {

        setEditingQuiz(null);

        setFormData({
            title: "",
            description: "",
            categoryId: "",
            timeLimit: ""
        });

        setShowForm(true);
    };


    const openEditForm = (quiz) => {

        setEditingQuiz(quiz);

        setFormData({
            title: quiz.title,
            description: quiz.description,
            categoryId: quiz.categoryId,
            timeLimit: quiz.timeLimit ?? ""
        });

        setShowForm(true);
    };


    const closeForm = () => {

        setShowForm(false);
        setEditingQuiz(null);

        setFormData({
            title: "",
            description: "",
            categoryId: "",
            timeLimit: ""
        });
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const quizData = {
                title: formData.title,
                description: formData.description,
                categoryId: Number(formData.categoryId),
                timeLimit:
                    formData.timeLimit === ""
                        ? null
                        : Number(formData.timeLimit)
            };


            if (editingQuiz) {

                await updateQuiz(
                    editingQuiz.id,
                    quizData
                );

            } else {

                await createQuiz(quizData);
            }


            closeForm();

            await fetchQuizzes();

        } catch (error) {

            console.error("Save Quiz Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to save quiz."
            );
        }
    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this quiz?"
        );

        if (!confirmed) {
            return;
        }


        try {

            await deleteQuiz(id);

            setQuizzes((previous) =>
                previous.filter((quiz) => quiz.id !== id)
            );

        } catch (error) {

            console.error("Delete Quiz Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to delete quiz."
            );
        }
    };


    return (
        <div className="admin-quizzes-page">

            <Navbar />

            <main className="admin-quizzes-content">

                <div className="admin-quizzes-heading">

                    <div>
                        <h1>Quiz Management</h1>

                        <p>
                            Create and manage quizzes.
                        </p>
                    </div>

                    <div className="admin-quiz-actions">

                        <button
                            className="back-button"
                            onClick={() =>
                                navigate("/admin/dashboard")
                            }
                        >
                            ← Dashboard
                        </button>

                        <button
                            className="create-quiz-button"
                            onClick={openCreateForm}
                        >
                            + Create Quiz
                        </button>

                    </div>

                </div>


                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}


                {showForm && (

                    <div className="quiz-form-card">

                        <div className="quiz-form-header">

                            <h2>
                                {editingQuiz
                                    ? "Edit Quiz"
                                    : "Create Quiz"}
                            </h2>

                            <button onClick={closeForm}>
                                ✕
                            </button>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="form-group">

                                <label>
                                    Quiz Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
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


                            <div className="form-row">

                                <div className="form-group">

                                    <label>
                                        Category ID
                                    </label>

                                    <input
                                        type="number"
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Time Limit (minutes)
                                    </label>

                                    <input
                                        type="number"
                                        name="timeLimit"
                                        value={formData.timeLimit}
                                        onChange={handleChange}
                                        min="1"
                                    />

                                </div>

                            </div>


                            <div className="form-actions">

                                <button
                                    type="button"
                                    onClick={closeForm}
                                >
                                    Cancel
                                </button>

                                <button type="submit">
                                    {editingQuiz
                                        ? "Update Quiz"
                                        : "Create Quiz"}
                                </button>

                            </div>

                        </form>

                    </div>

                )}


                {loading ? (

                    <div className="dashboard-message">
                        Loading quizzes...
                    </div>

                ) : quizzes.length === 0 ? (

                    <div className="empty-state">

                        <h3>
                            No quizzes found
                        </h3>

                        <p>
                            Create your first quiz.
                        </p>

                    </div>

                ) : (

                    <div className="admin-quiz-list">

                        {quizzes.map((quiz) => (

                            <div
                                className="admin-quiz-card"
                                key={quiz.id}
                            >

                                <div className="admin-quiz-info">

                                    <h3>
                                        {quiz.title}
                                    </h3>

                                    <p>
                                        {quiz.description}
                                    </p>

                                    <div className="quiz-meta">

                                        <span>
                                            Category:{" "}
                                            {quiz.categoryName}
                                        </span>

                                        <span>
                                            {quiz.timeLimit
                                                ? `${quiz.timeLimit} min`
                                                : "No time limit"}
                                        </span>

                                    </div>

                                </div>


                                <div className="admin-quiz-card-actions">

                                    <button
                                        onClick={() =>
                                            openEditForm(quiz)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(quiz.id)
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

export default AdminQuizzes;