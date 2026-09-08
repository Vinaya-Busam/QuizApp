import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./LandingPage.css";


function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            await registerUser({
                name,
                email,
                password
            });

            setSuccess(
                "Registration successful! Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login?role=user");
            }, 1500);

        } catch (error) {

            console.error("Registration failed:", error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError(
                    "Registration failed. Please try again."
                );
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
                    Create your user account and start taking quizzes.
                </p>


                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="form-group">

                        <label htmlFor="name">
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Enter your name"
                            required
                        />

                    </div>


                    {/* Email */}
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


                    {/* Password */}
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
                            placeholder="Create a password"
                            required
                        />

                    </div>


                    {/* Error */}
                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}


                    {/* Success */}
                    {success && (
                        <p className="success-message">
                            {success}
                        </p>
                    )}


                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
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

export default Register;