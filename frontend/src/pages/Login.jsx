import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
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
                    Test your knowledge. Challenge yourself.
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

            </div>

        </div>
    );
}

export default Login;