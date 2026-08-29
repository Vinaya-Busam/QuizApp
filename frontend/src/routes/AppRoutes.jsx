import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import UserDashboard from "../pages/UserDashboard";
import ProtectedRoute from "../components/ProtectedRoute";

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

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;