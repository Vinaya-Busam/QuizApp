import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import UserDashboard from "../pages/UserDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import QuizList from "../pages/QuizList";
import TakeQuiz from "../pages/TakeQuiz";
import QuizResult from "../pages/QuizResult";
import MyAttempts from "../pages/MyAttempts";

function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Public routes */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Protected routes */}

               <Route element={<ProtectedRoute />}>

                    <Route
                        path="/dashboard"
                        element={<UserDashboard />}
                    />

                    <Route
                        path="/quizzes"
                        element={<QuizList />}
                    />

                    <Route
                        path="/quiz/:quizId"
                        element={<TakeQuiz />}
                    />

                    <Route
                        path="/quiz/result"
                        element={<QuizResult />}
                    />

                    <Route
                        path="/attempts"
                        element={<MyAttempts />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;