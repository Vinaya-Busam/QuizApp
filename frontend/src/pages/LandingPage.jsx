import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {

    const navigate = useNavigate();

    return (
        <div className="landing-page">

            <div className="landing-container">

                {/* Header */}
                <header className="landing-header">

                    <div className="landing-logo">
                        Quiz<span>App</span>
                    </div>

                    <button
                        className="landing-login-button"
                        onClick={() => navigate("/login?role=user")}
                    >
                        Login
                    </button>

                </header>


                {/* Main */}
                <main className="landing-main">

                    {/* Hero */}
                    <section className="landing-content">

                        <div className="landing-badge">
                            Test Your Knowledge
                        </div>

                        <h1>
                            Challenge Yourself.
                            <br />
                            <span>Learn Something New.</span>
                        </h1>

                        <p>
                            Test your knowledge with interactive quizzes,
                            track your performance, and improve your skills.
                        </p>

                    </section>


                    {/* Role Selection */}
                    <section className="role-section">

                        <h2>How would you like to continue?</h2>

                        <p className="role-subtitle">
                            Choose your account type
                        </p>


                        <div className="role-cards">

                            {/* USER CARD */}
                            <div className="role-card">

                                <div className="role-icon">
                                    👨‍🎓
                                </div>

                                <h3>User</h3>

                                <p>
                                    Take quizzes, test your knowledge,
                                    view your results, and track your
                                    performance.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate("/login?role=user")
                                    }
                                >
                                    Login as User →
                                </button>

                                <div className="role-register">
                                    <span>
                                        Don't have an account?
                                    </span>

                                    <button
                                        className="register-link"
                                        onClick={() =>
                                            navigate("/register")
                                        }
                                    >
                                        Register
                                    </button>
                                </div>

                            </div>


                            {/* ADMIN CARD */}
                            <div className="role-card admin-card">

                                <div className="role-icon">
                                    ⚙️
                                </div>

                                <h3>Admin</h3>

                                <p>
                                    Manage users, quizzes, questions,
                                    categories, and the overall quiz
                                    platform.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate("/login?role=admin")
                                    }
                                >
                                    Login as Admin →
                                </button>

                                <span className="admin-note">
                                    Administrator access only
                                </span>

                            </div>

                        </div>

                    </section>

                </main>


                {/* Footer */}
                <footer className="landing-footer">

                    <p>
                        © 2026 QuizApp. Test. Learn. Improve.
                    </p>

                </footer>

            </div>

        </div>
    );
}

export default LandingPage;