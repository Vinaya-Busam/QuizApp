import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import QuizList from "../pages/QuizList";
import TakeQuiz from "../pages/TakeQuiz";
import QuizResult from "../pages/QuizResult";
import MyAttempts from "../pages/MyAttempts";
import AdminUsers from "../pages/AdminUser";
import AdminQuizzes from "../pages/AdminQuizzes";
import AdminQuestions from "../pages/AdminQuestions";
import AdminRoute from "./AdminRoute";
import AdminCategories from "../pages/AdminCategories";
import QuizDetails from "../pages/QuizDetails";

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
                        path="/quiz/:id"
                        element={<QuizDetails />}
                    />

                    <Route
                        path="/quiz/:quizId/attempt"
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

                <Route element={<AdminRoute />}>

                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="/admin/users"
                        element={<AdminUsers />}
                    />

                    <Route
                        path="/admin/quizzes"
                        element={<AdminQuizzes />}
                    />

                    <Route
                        path="/admin/questions"
                        element={<AdminQuestions />}
                    />

                    <Route
                        path="/admin/categories"
                        element={<AdminCategories />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;