import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { getAllQuizzes } from "../services/quizService";

import {
    getQuestionsByQuiz,
    createQuestion,
    updateQuestion,
    deleteQuestion
} from "../services/questionService";


function AdminQuestions() {

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);

    // Stores questions by quiz ID
    const [questionsByQuiz, setQuestionsByQuiz] = useState({});

    // Which quiz is currently expanded
    const [expandedQuiz, setExpandedQuiz] = useState(null);

    // Keeps track of quizzes whose questions are loading
    const [loadingQuiz, setLoadingQuiz] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);

    const [formData, setFormData] = useState({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOption: "",
        questionOrder: "",
        quizId: ""
    });


    // Load quizzes
    const fetchQuizzes = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllQuizzes();

            setQuizzes(data);

        } catch (error) {

            console.error(
                "Quiz API Error:",
                error
            );

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


    // Load questions for selected quiz
    const loadQuestionsForQuiz = async (quizId) => {

        try {

            setLoadingQuiz(quizId);
            setError("");

            const questions =
                await getQuestionsByQuiz(quizId);

            setQuestionsByQuiz((previous) => ({
                ...previous,
                [quizId]: questions
            }));

        } catch (error) {

            console.error(
                "Questions API Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load questions."
            );

        } finally {

            setLoadingQuiz(null);
        }
    };


    // Expand / collapse quiz
    const handleQuizClick = async (quizId) => {

        if (expandedQuiz === quizId) {

            setExpandedQuiz(null);
            return;
        }

        setExpandedQuiz(quizId);

        // Don't call API again if already loaded
        if (!questionsByQuiz[quizId]) {
            await loadQuestionsForQuiz(quizId);
        }
    };


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    const resetForm = () => {

        setFormData({
            questionText: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correctOption: "",
            questionOrder: "",
            quizId: ""
        });

        setEditingQuestion(null);
        setShowForm(false);
    };


    const openCreateForm = () => {

        resetForm();

        setShowForm(true);
    };


    const openEditForm = (question) => {

        setEditingQuestion(question);

        setFormData({
            questionText: question.questionText,
            optionA: question.optionA,
            optionB: question.optionB,
            optionC: question.optionC,
            optionD: question.optionD,
            correctOption: question.correctOption,
            questionOrder: question.questionOrder,
            quizId: question.quizId
        });

        setShowForm(true);
    };


    
    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setError("");

            const quizId = Number(formData.quizId);

            const questionData = {
                questionText: formData.questionText,
                optionA: formData.optionA,
                optionB: formData.optionB,
                optionC: formData.optionC,
                optionD: formData.optionD,
                correctOption: formData.correctOption,
                questionOrder: Number(
                    formData.questionOrder
                ),
                quizId: quizId
            };


            if (editingQuestion) {

                await updateQuestion(
                    editingQuestion.id,
                    questionData
                );

            } else {

                await createQuestion(questionData);
            }


            resetForm();

            await loadQuestionsForQuiz(quizId);

        } catch (error) {

            console.error(
                "Save Question Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to save question."
            );
        }
    };


    const handleDelete = async (question) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmed) {
            return;
        }


        try {

            setError("");

            await deleteQuestion(question.id);

            // Remove from currently loaded quiz
            setQuestionsByQuiz((previous) => ({
                ...previous,
                [question.quizId]:
                    previous[question.quizId]?.filter(
                        (item) =>
                            item.id !== question.id
                    ) || []
            }));

        } catch (error) {

            console.error(
                "Delete Question Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to delete question."
            );
        }
    };

    const formatDate = (dateTime) => {

        if (!dateTime) {
            return "N/A";
        }

        return new Date(dateTime).toLocaleString();
    };


    return (
        <div className="admin-questions-page">

            <Navbar />

            <main className="admin-questions-content">

                {/* Header */}

                <div className="admin-questions-heading">

                    <div>

                        <h1>
                            Question Management
                        </h1>

                        <p>
                            Select a quiz to manage its questions.
                        </p>

                    </div>


                    <div className="admin-question-actions">

                        <button
                            className="back-button"
                            onClick={() =>
                                navigate("/admin/dashboard")
                            }
                        >
                            ← Dashboard
                        </button>


                        <button
                            className="create-question-button"
                            onClick={openCreateForm}
                        >
                            + Create Question
                        </button>

                    </div>

                </div>


                {/* Error */}

                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}


                {/* Create / Edit Form */}

                {showForm && (

                    <div className="question-form-card">

                        <div className="question-form-header">

                            <h2>
                                {editingQuestion
                                    ? "Edit Question"
                                    : "Create Question"}
                            </h2>

                            <button
                                onClick={resetForm}
                            >
                                ✕
                            </button>

                        </div>


                        <form onSubmit={handleSubmit}>

                            {/* Quiz */}

                            <div className="form-group">

                                <label>
                                    Quiz
                                </label>

                                <select
                                    name="quizId"
                                    value={formData.quizId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Quiz
                                    </option>

                                    {quizzes.map((quiz) => (

                                        <option
                                            key={quiz.id}
                                            value={quiz.id}
                                        >
                                            {quiz.title}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* Question */}

                            <div className="form-group">

                                <label>
                                    Question
                                </label>

                                <textarea
                                    name="questionText"
                                    value={formData.questionText}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                />

                            </div>


                            {/* Options */}

                            <div className="form-row">

                                <div className="form-group">

                                    <label>
                                        Option A
                                    </label>

                                    <input
                                        type="text"
                                        name="optionA"
                                        value={formData.optionA}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Option B
                                    </label>

                                    <input
                                        type="text"
                                        name="optionB"
                                        value={formData.optionB}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            <div className="form-row">

                                <div className="form-group">

                                    <label>
                                        Option C
                                    </label>

                                    <input
                                        type="text"
                                        name="optionC"
                                        value={formData.optionC}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Option D
                                    </label>

                                    <input
                                        type="text"
                                        name="optionD"
                                        value={formData.optionD}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            {/* Correct option + order */}

                            <div className="form-row">

                                <div className="form-group">

                                    <label>
                                        Correct Option
                                    </label>

                                    <select
                                        name="correctOption"
                                        value={formData.correctOption}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select Correct Option
                                        </option>

                                        <option value="A">
                                            A
                                        </option>

                                        <option value="B">
                                            B
                                        </option>

                                        <option value="C">
                                            C
                                        </option>

                                        <option value="D">
                                            D
                                        </option>

                                    </select>

                                </div>


                                <div className="form-group">

                                    <label>
                                        Question Order
                                    </label>

                                    <input
                                        type="number"
                                        name="questionOrder"
                                        value={formData.questionOrder}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Form buttons */}

                            <div className="form-actions">

                                <button
                                    type="button"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>

                                <button type="submit">

                                    {editingQuestion
                                        ? "Update Question"
                                        : "Create Question"}

                                </button>

                            </div>

                        </form>

                    </div>
                )}


                {/* Quiz List */}

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
                            Create a quiz first.
                        </p>

                    </div>

                ) : (

                    <div className="quiz-question-list">

                        {quizzes.map((quiz) => {

                            const isExpanded =
                                expandedQuiz === quiz.id;

                            const questions =
                                questionsByQuiz[quiz.id] || [];

                            const isLoading =
                                loadingQuiz === quiz.id;


                            return (
                                <div
                                    className="quiz-question-group"
                                    key={quiz.id}
                                >

                                    {/* Quiz Header */}

                                    <button
                                        className="quiz-question-header"
                                        onClick={() =>
                                            handleQuizClick(
                                                quiz.id
                                            )
                                        }
                                    >

                                        <div className="quiz-header-left">

                                            <span className="expand-icon">
                                                {isExpanded
                                                    ? "▼"
                                                    : "▶"}
                                            </span>

                                            <div>

                                                <h2>
                                                    {quiz.title}
                                                </h2>

                                                <p>
                                                    {quiz.categoryName}
                                                </p>

                                            </div>

                                        </div>


                                        <span className="question-count">

                                            {isLoading
                                                ? "Loading..."
                                                : questionsByQuiz[
                                                    quiz.id
                                                ]
                                                    ? `${questions.length} ${
                                                        questions.length === 1
                                                            ? "Question"
                                                            : "Questions"
                                                    }`
                                                    : "View Questions"}

                                        </span>

                                    </button>


                                    {/* Questions */}

                                    {isExpanded && (

                                        <div className="quiz-questions">

                                            {isLoading ? (

                                                <div className="questions-loading">
                                                    Loading questions...
                                                </div>

                                            ) : questions.length === 0 ? (

                                                <div className="no-questions">

                                                    <p>
                                                        No questions in this quiz.
                                                    </p>

                                                    <button
                                                        onClick={openCreateForm}
                                                    >
                                                        + Add Question
                                                    </button>

                                                </div>

                                            ) : (

                                                questions.map(
                                                    (question) => (

                                                        <div
                                                            className="admin-question-card"
                                                            key={question.id}
                                                        >

                                                            <div className="question-number">

                                                                {
                                                                    question.questionOrder
                                                                }

                                                            </div>


                                                            <div className="admin-question-info">

                                                                <h3>
                                                                    {
                                                                        question.questionText
                                                                    }
                                                                </h3>


                                                                <div className="question-options">

                                                                    <span>
                                                                        <b>A:</b>{" "}
                                                                        {
                                                                            question.optionA
                                                                        }
                                                                    </span>

                                                                    <span>
                                                                        <b>B:</b>{" "}
                                                                        {
                                                                            question.optionB
                                                                        }
                                                                    </span>

                                                                    <span>
                                                                        <b>C:</b>{" "}
                                                                        {
                                                                            question.optionC
                                                                        }
                                                                    </span>

                                                                    <span>
                                                                        <b>D:</b>{" "}
                                                                        {
                                                                            question.optionD
                                                                        }
                                                                    </span>

                                                                </div>


                                                                <div className="correct-answer">

                                                                    Correct Option:{" "}
                                                                    <strong>
                                                                        {question.correctOption}
                                                                    </strong>

                                                                </div>

                                                                <div className="question-dates">

                                                                    <span>
                                                                        Created: {formatDate(question.createdAt)}
                                                                    </span>

                                                                    <span>
                                                                        Updated: {formatDate(question.updatedAt)}
                                                                    </span>

                                                                </div>
                                                            </div>


                                                            <div className="admin-question-card-actions">

                                                                <button
                                                                    onClick={() =>
                                                                        openEditForm(
                                                                            question
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>


                                                                <button
                                                                    className="delete-button"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            question
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>

                                                            </div>

                                                        </div>

                                                    )
                                                )

                                            )}

                                        </div>

                                    )}

                                </div>
                            );
                        })}

                    </div>

                )}

            </main>

        </div>
    );
}

export default AdminQuestions;