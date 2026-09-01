import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Navbar from "../components/Navbar";

function QuizResult() {

    const location = useLocation();
    const navigate = useNavigate();

    const { user } = useAuth();

    const result = location.state?.result;

    if (!result) {

        return (
            <div className="dashboard-message">

                <h2>
                    Result not found
                </h2>

                <button
                    onClick={() => navigate("/quizzes")}
                >
                    Go to Quizzes
                </button>

            </div>
        );
    }

    return (
        <div className="result-page">

            <Navbar />

            <main className="result-content">

                <div className="result-card">

                    <h2>
                        Quiz Completed 🎉
                    </h2>

                    <h3>
                        {result.quizTitle}
                    </h3>


                    <div className="score-circle">

                        <span>
                            {Number(result.percentage).toFixed(2).replace(/\.?0+$/, "")}%
                        </span>

                    </div>


                    <div className="result-stats">

                        <div>
                            <span>Total Questions</span>
                            <strong>
                                {result.totalQuestions}
                            </strong>
                        </div>


                        <div>
                            <span>Correct Answers</span>
                            <strong>
                                {result.correctAnswers}
                            </strong>
                        </div>


                        <div>
                            <span>Wrong Answers</span>
                            <strong>
                                {result.wrongAnswers}
                            </strong>
                        </div>


                        <div>
                            <span>Score</span>
                            <strong>
                                {result.score}
                            </strong>
                        </div>

                    </div>


                    <div className="result-actions">

                        <button
                            onClick={() => navigate("/quizzes")}
                        >
                            Try Another Quiz
                        </button>

                        <button
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default QuizResult;