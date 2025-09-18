import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAthleteForm } from "../context/AthleteFormContext";
import axiosInstance from "../utils/axiosInstance";

const AddAthletec = () => {
    const { values } = useAthleteForm();
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get("/csrf/", { withCredentials: true });
    }, []);

    const handle = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(values).forEach(([k, v]) => data.append(k, v as string));
        if (file) data.append("profile_pic", file);

        try {
            await axiosInstance.post("/AthleteListCreate/", data, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            navigate("/viewathletes");
        } catch (err: any) {
            setError(JSON.stringify(err.response?.data || err.message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 p-6">
            <form onSubmit={handle} encType="multipart/form-data" className="bg-white rounded-lg shadow-lg p-8 space-y-5 max-w-md w-full">
                <h2 className="text-2xl font-bold text-purple-700 text-center">Upload Profile Image</h2>
                <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
                {error && <p className="text-red-600">{error}</p>}
                <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">Submit</button>
            </form>
        </div>
    );
};

export default AddAthletec;
