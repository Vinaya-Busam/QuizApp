import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getAllUsers } from "../services/userService";

function AdminUsers() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(0);
    const [pageData, setPageData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const pageSize = 10;


    useEffect(() => {

        const fetchUsers = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getAllUsers(page, pageSize);

                setUsers(data.content);
                setPageData(data);

            } catch (error) {

                console.error("Users API Error:", error);

                setError(
                    error.response?.data?.message ||
                    "Unable to load users."
                );

            } finally {

                setLoading(false);
            }
        };

        fetchUsers();

    }, [page]);


    const handlePrevious = () => {

        if (!pageData?.first) {
            setPage(page - 1);
        }
    };


    const handleNext = () => {

        if (!pageData?.last) {
            setPage(page + 1);
        }
    };


    return (
        <div className="admin-users-page">

            <Navbar />

            <main className="admin-users-content">

                <div className="admin-users-heading">

                    <div>
                        <h1>User Management</h1>

                        <p>
                            View registered users.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/admin/dashboard")}
                    >
                        ← Dashboard
                    </button>

                </div>


                {loading && (
                    <div className="dashboard-message">
                        Loading users...
                    </div>
                )}


                {!loading && error && (
                    <div className="dashboard-message">
                        {error}
                    </div>
                )}


                {!loading && !error && (

                    <div className="users-container">

                        <div className="users-table-wrapper">

                            <table className="users-table">

                                <thead>

                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>

                                </thead>


                                <tbody>

                                    {users.map((user) => (

                                        <tr key={user.id}>

                                            <td>
                                                {user.id}
                                            </td>

                                            <td>
                                                {user.name}
                                            </td>

                                            <td>
                                                {user.email}
                                            </td>

                                            <td>
                                                <span className="role-badge">
                                                    {user.role}
                                                </span>
                                            </td>

                                        </tr>

                                    ))}


                                    {users.length === 0 && (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="empty-table"
                                            >
                                                No users found.
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>


                        <div className="pagination">

                            <button
                                onClick={handlePrevious}
                                disabled={pageData?.first}
                            >
                                ← Previous
                            </button>


                            <span>
                                Page {page + 1} of{" "}
                                {pageData?.totalPages || 1}
                            </span>


                            <button
                                onClick={handleNext}
                                disabled={pageData?.last}
                            >
                                Next →
                            </button>

                        </div>

                    </div>

                )}

            </main>

        </div>
    );
}

export default AdminUsers;