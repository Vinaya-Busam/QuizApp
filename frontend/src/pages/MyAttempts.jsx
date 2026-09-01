import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyAttempts } from "../services/attemptService";
import { useAuth } from "../context/authContext";
import Navbar from "../components/Navbar";

function MyAttempts() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchAttempts = async () => {

            try {

                const data = await getMyAttempts();

                setAttempts(data);

            } catch (error) {

                console.error("Attempts API Error:", error);

                setError("Unable to load your attempts.");

            } finally {

                setLoading(false);
            }
        };

        fetchAttempts();

    }, []);


    const formatDate = (dateString) => {

        return new Date(dateString).toLocaleString();
    };


    return (
        <div className="attempts-page">

            <Navbar />

            <main className="attempts-content">

                <div className="attempts-heading">

                    <div>

                        <h2>My Attempts</h2>

                        <p>
                            View your previous quiz performance.
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
                        Loading attempts...
                    </div>
                )}


                {!loading && error && (
                    <div className="dashboard-message">
                        {error}
                    </div>
                )}


                {!loading && !error && attempts.length === 0 && (

                    <div className="empty-state">

                        <h3>No attempts yet</h3>

                        <p>
                            You haven't attempted any quizzes.
                        </p>

                        <button
                            onClick={() => navigate("/quizzes")}
                        >
                            Browse Quizzes
                        </button>

                    </div>

                )}


                {!loading && !error && attempts.length > 0 && (

                    <div className="attempts-list">

                        {attempts.map((attempt) => (

                            <div
                                className="attempt-card"
                                key={attempt.id}
                            >

                                <div className="attempt-main">

                                    <h3>
                                        {attempt.quizTitle}
                                    </h3>

                                    <p>
                                        Attempted:{" "}
                                        {formatDate(attempt.attemptedAt)}
                                    </p>

                                </div>


                                <div className="attempt-stat">

                                    <span>Score</span>

                                    <strong>
                                        {attempt.score}
                                    </strong>

                                </div>


                                <div className="attempt-stat">

                                    <span>Correct</span>

                                    <strong>
                                        {attempt.correctAnswers}
                                    </strong>

                                </div>


                                <div className="attempt-stat">

                                    <span>Wrong</span>

                                    <strong>
                                        {attempt.wrongAnswers}
                                    </strong>

                                </div>


                                <div className="attempt-percentage">

                                    <strong>
                                        {Number(attempt.percentage).toFixed(2).replace(/\.?0+$/, "")}%
                                    </strong>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default MyAttempts;