import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { getUserDashboard } from "../services/dashboardService";

function UserDashboard() {

    const { user, logout } = useAuth();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const data = await getUserDashboard();

                setDashboard(data);

            } catch (error) {

                console.error("Dashboard API Error:", error);

                setError("Unable to load dashboard.");

            } finally {

                setLoading(false);
            }
        };

        fetchDashboard();

    }, []);

    if (loading) {
        return (
            <div className="dashboard-message">
                Loading dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-message error-message">
                {error}
            </div>
        );
    }

    return (
        <div className="dashboard-page">

            <header className="dashboard-header">

                <div>
                    <h1>Quiz App</h1>
                </div>

                <div className="user-section">

                    <span>
                        {user?.name}
                    </span>

                    <button onClick={logout}>
                        Logout
                    </button>

                </div>

            </header>


            <main className="dashboard-content">

                <div className="welcome-section">

                    <h2>
                        Welcome back, {user?.name} 👋
                    </h2>

                    <p>
                        Here's a summary of your quiz performance.
                    </p>

                </div>


                <div className="stats-grid">

                    <div className="stat-card">

                        <h3>Quizzes Attempted</h3>

                        <p>
                            {dashboard.quizzesAttempted}
                        </p>

                    </div>


                    <div className="stat-card">

                        <h3>Total Questions</h3>

                        <p>
                            {dashboard.totalQuestions}
                        </p>

                    </div>


                    <div className="stat-card">

                        <h3>Correct Answers</h3>

                        <p>
                            {dashboard.correctAnswers}
                        </p>

                    </div>


                    <div className="stat-card">

                        <h3>Wrong Answers</h3>

                        <p>
                            {dashboard.wrongAnswers}
                        </p>

                    </div>


                    <div className="stat-card">

                        <h3>Average Score</h3>

                        <p>
                            {dashboard.averageScore}%
                        </p>

                    </div>


                    <div className="stat-card">

                        <h3>Best Score</h3>

                        <p>
                            {dashboard.bestScore}%
                        </p>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default UserDashboard;