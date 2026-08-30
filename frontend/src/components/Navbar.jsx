import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Navbar() {

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const isAdmin = user?.role === "ADMIN";

    return (
        <nav className="navbar">

            <div
                className="navbar-logo"
                onClick={() =>
                    navigate(isAdmin ? "/admin/dashboard" : "/dashboard")
                }
            >
                🧠 Quiz App
            </div>


            <div className="navbar-links">

                {isAdmin ? (
                    <>
                        <button
                            onClick={() =>
                                navigate("/admin/dashboard")
                            }
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={() =>
                                navigate("/admin/categories")
                            }
                        >
                            Categories
                        </button>

                        <button
                            onClick={() =>
                                navigate("/admin/quizzes")
                            }
                        >
                            Quizzes
                        </button>

                        <button
                            onClick={() =>
                                navigate("/admin/questions")
                            }
                        >
                            Questions
                        </button>

                        <button
                            onClick={() =>
                                navigate("/admin/users")
                            }
                        >
                            Users
                        </button>
                        
                    </>
                ) : (
                    <>
                        <button
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={() =>
                                navigate("/quizzes")
                            }
                        >
                            Quizzes
                        </button>

                        <button
                            onClick={() =>
                                navigate("/attempts")
                            }
                        >
                            My Attempts
                        </button>
                    </>
                )}

            </div>


            <div className="navbar-user">

                <span>
                    {user?.name}
                </span>

                <button
                    className="logout-button"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;