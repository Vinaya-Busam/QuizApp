import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getQuizById } from "../services/quizService";


function QuizDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const fetchQuiz = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getQuizById(id);

            setQuiz(data);

        } catch (error) {

            console.error("Quiz Details Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load quiz."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {
        fetchQuiz();
    }, [id]);


    const handleStartQuiz = () => {

        navigate(`/quiz/${id}/attempt`);
    };


    if (loading) {

        return (
            <>
                <Navbar />

                <div className="quiz-details-message">
                    Loading quiz...
                </div>
            </>
        );
    }


    if (error) {

        return (
            <>
                <Navbar />

                <div className="quiz-details-message error">
                    {error}
                </div>
            </>
        );
    }


    if (!quiz) {
        return null;
    }


    return (
        <div className="quiz-details-page">

            <Navbar />

            <main className="quiz-details-container">

                <button
                    className="back-button"
                    onClick={() => navigate("/quizzes")}
                >
                    ← Back to Quizzes
                </button>


                <div className="quiz-details-card">

                    <div className="quiz-details-content">

                        <span className="quiz-category">
                            {quiz.categoryName}
                        </span>

                        <h1>
                            {quiz.title}
                        </h1>

                        <p className="quiz-description">
                            {quiz.description}
                        </p>


                        <div className="quiz-meta">

                            <div className="quiz-meta-item">

                                <span className="meta-label">
                                    Time Limit
                                </span>

                                <strong>
                                    {quiz.timeLimit
                                        ? `${quiz.timeLimit} minutes`
                                        : "No time limit"}
                                </strong>

                            </div>


                            <div className="quiz-meta-item">

                                <span className="meta-label">
                                    Quiz
                                </span>

                                <strong>
                                    Ready to Start
                                </strong>

                            </div>

                        </div>


                        <div className="quiz-start-section">

                            <p>
                                Once you start the quiz,
                                your attempt will begin.
                            </p>

                            <button
                                className="start-quiz-button"
                                onClick={handleStartQuiz}
                            >
                                Start Quiz →
                            </button>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default QuizDetails;