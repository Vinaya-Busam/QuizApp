import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import QuestionCard from "../components/QuestionCard";
import { getQuestionsForQuiz } from "../services/questionService";
import { useAuth } from "../context/authContext";
import { submitQuiz } from "../services/attemptService";
import Navbar from "../components/Navbar";

function TakeQuiz() {

    const { quizId } = useParams();
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchQuestions = async () => {

            try {

                const data = await getQuestionsForQuiz(quizId);

                setQuestions(data);

            } catch (error) {

                console.error("Question API Error:", error);

                setError("Unable to load questions.");

            } finally {

                setLoading(false);
            }
        };

        fetchQuestions();

    }, [quizId]);


    const handleOptionSelect = (option) => {

        const questionId = questions[currentQuestion].id;

        setAnswers((previousAnswers) => ({
            ...previousAnswers,
            [questionId]: option
        }));
    };


    const handleNext = () => {

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };


    const handlePrevious = () => {

        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async () => {

        if (Object.keys(answers).length !== questions.length) {

            alert("Please answer all questions before submitting.");

            return;
        }

        const answerList = Object.entries(answers).map(
            ([questionId, selectedOption]) => ({
                questionId: Number(questionId),
                selectedOption: selectedOption
            })
        );

        try {

            setSubmitting(true);

            const result = await submitQuiz(quizId, answerList);

            console.log("Quiz Result:", result);

            navigate("/quiz/result", {
                state: {
                    result: result
                }
            });

        } catch (error) {

            console.error("Quiz submission error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to submit quiz."
            );

        } finally {

            setSubmitting(false);
        }
    };


    if (loading) {
        return (
            <div className="take-quiz-page">

                <Navbar />

                <main className="take-quiz-content">

                    <div className="dashboard-message">
                        Loading quiz...
                    </div>

                </main>

            </div>
        );
    }


    if (error) {
        return (
            <div className="take-quiz-page">

                <Navbar />

                <main className="take-quiz-content">

                    <div className="dashboard-message error-message">
                        {error}
                    </div>

                </main>

            </div>
        );
    }


    if (questions.length === 0) {
        return (
            <div className="take-quiz-page">

                <Navbar />

                <main className="take-quiz-content">

                    <div className="no-questions-container">

                        <div className="no-questions-card">

                            <h2>
                                No Questions Available
                            </h2>

                            <p>
                                This quiz does not have any questions yet.
                            </p>

                            <button
                                onClick={() => navigate("/quizzes")}
                            >
                                ← Back to Quizzes
                            </button>

                        </div>

                    </div>

                </main>

            </div>
        );
    }


    const question = questions[currentQuestion];

    const selectedOption = answers[question.id];


    return (
        <div className="take-quiz-page">

            <Navbar />

            <main className="take-quiz-content">

                <div className="quiz-top">

                    <div>

                        <h2>
                            {question.quizTitle}
                        </h2>

                        <p>
                            Question {currentQuestion + 1} of{" "}
                            {questions.length}
                        </p>

                    </div>

                </div>


                <QuestionCard
                    question={question}
                    selectedOption={selectedOption}
                    onOptionSelect={handleOptionSelect}
                />


                <div className="quiz-navigation">

                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                    >
                        ← Previous
                    </button>


                    {currentQuestion < questions.length - 1 ? (

                        <button
                            onClick={handleNext}
                        >
                            Next →
                        </button>

                    ) : (

                        <button
                            className="submit-button"
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Submit Quiz"}
                        </button>

                    )}

                </div>

            </main>

        </div>
    );
}

export default TakeQuiz;