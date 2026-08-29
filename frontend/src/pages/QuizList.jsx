import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import QuizCard from "../components/QuizCard";
import { getAllQuizzes } from "../services/quizService";
import { useAuth } from "../context/authContext";
import Navbar from "../components/Navbar";

function QuizList() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchQuizzes = async () => {

            try {

                const data = await getAllQuizzes();

                setQuizzes(data);

            } catch (error) {

                console.error("Quiz API Error:", error);

                setError("Unable to load quizzes.");

            } finally {

                setLoading(false);

            }
        };

        fetchQuizzes();

    }, []);

    const handleStartQuiz = (quizId) => {

        navigate(`/quiz/${quizId}`);

    };

    return (
        <div className="quiz-list-page">

            <Navbar />
            <main className="quiz-list-content">

                <div className="quiz-list-heading">

                    <div>

                        <h2>Available Quizzes</h2>

                        <p>
                            Choose a quiz and test your knowledge.
                        </p>

                    </div>

                    <button
                        className="back-button"
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Dashboard
                    </button>

                </div>


                {loading && (
                    <div className="dashboard-message">
                        Loading quizzes...
                    </div>
                )}


                {!loading && error && (
                    <div className="dashboard-message error-message">
                        {error}
                    </div>
                )}


                {!loading && !error && quizzes.length === 0 && (
                    <div className="empty-state">
                        <h3>No quizzes available</h3>
                        <p>
                            There are currently no quizzes to attempt.
                        </p>
                    </div>
                )}


                {!loading && !error && quizzes.length > 0 && (

                    <div className="quiz-grid">

                        {quizzes.map((quiz) => (

                            <QuizCard
                                key={quiz.id}
                                quiz={quiz}
                                onStart={handleStartQuiz}
                            />

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default QuizList;