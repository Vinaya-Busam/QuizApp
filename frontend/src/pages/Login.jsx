import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/authContext";
import { useNavigate, useSearchParams } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const selectedRole = searchParams.get("role");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const data = await loginUser(email, password);

            login(data);

            console.log("Login successful:", data);

            // Always use the role returned by backend
            if (data.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {

            console.error("Login failed:", error);

            if (error.response?.status === 401) {
                setError("Invalid email or password");
            } else {
                setError("Something went wrong. Please try again.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <h1>Quiz App</h1>


                <p className="login-subtitle">
                    {selectedRole === "admin"
                        ? "Sign in to access the administration panel."
                        : "Sign in to continue taking quizzes."}
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Enter your email"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter your password"
                            required
                        />

                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <div className="register-footer">
                </div>

                <button
                    className="back-to-home"
                    onClick={() => navigate("/")}
                >
                    ← Back to Home
                </button>

            </div>

        </div>
    );
}

export default Login;