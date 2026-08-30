import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AdminDashboard() {

    const { user } = useAuth();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const response = await api.get("/api/admin/dashboard");

                setDashboard(response.data);

            } catch (error) {

                console.error("Admin Dashboard Error:", error);

                setError(
                    error.response?.data?.message ||
                    "Unable to load admin dashboard."
                );

            } finally {

                setLoading(false);
            }
        };

        fetchDashboard();

    }, []);


    if (loading) {
        return <div className="dashboard-message">
            Loading dashboard...
        </div>;
    }


    if (error) {
        return <div className="dashboard-message">
            {error}
        </div>;
    }


    return (
        <div className="admin-dashboard-page">

            <Navbar />

            <main className="admin-dashboard-content">

                <div className="admin-heading">

                    <div>
                        <h1>Admin Dashboard</h1>

                        <p>
                            Welcome back, {user?.name}
                        </p>
                    </div>

                </div>


                <div className="admin-stat-grid">

                    <div className="admin-stat-card">
                        <span>Total Users</span>
                        <strong>{dashboard.totalUsers}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Total Quizzes</span>
                        <strong>{dashboard.totalQuizzes}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Total Questions</span>
                        <strong>{dashboard.totalQuestions}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Total Attempts</span>
                        <strong>{dashboard.totalAttempts}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Average Score</span>
                        <strong>
                            {dashboard.averageScore != null
                                ? `${dashboard.averageScore.toFixed(2)}%`
                                : "0.00%"}
                        </strong>
                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminDashboard;