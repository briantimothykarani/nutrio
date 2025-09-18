import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const DeleteAthlete = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!localStorage.getItem("access")) navigate("/login");
    }, [navigate]);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.delete(`http://127.0.0.1:8000/api/AthleteDelete/${id}/`);
            navigate("/viewathletes");
        } catch {
            setError("Failed to delete the athletes. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-black">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-bold mb-6 text-purple-800">Confirm Deletion</h2>
                <p className="mb-6 text-gray-700">Are you sure you want to delete this student (ID: <span className="font-semibold text-blue-600">{id}</span>)?</p>
                {error && <p className="mb-4 text-red-600 font-medium">{error}</p>}
                <div className="flex justify-center space-x-4">
                    <button onClick={handleDelete} disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2 px-6 rounded transition">
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                    <button onClick={() => navigate("/viewathletes")} disabled={loading} className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold py-2 px-6 rounded transition">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAthlete;
