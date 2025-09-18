
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAthleteForm } from "../context/AthleteFormContext";

const AddAthleteb = () => {
    const { values, updateValues } = useAthleteForm();
    const [local, setLocal] = useState({
        height: values.height,
        sex: values.sex,
        about_athlete: values.about_athlete,
    });
    const navigate = useNavigate();

    const handle = (e: React.FormEvent) => {
        e.preventDefault();
        updateValues(local);
        navigate("/addathletec");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 p-6">
            <form onSubmit={handle} className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-5">
                <h2 className="text-2xl font-bold text-purple-700 text-center">Additional Info</h2>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Height (inches)</label>
                    <input
                        type="number"
                        name="height"
                        value={local.height}
                        onChange={(e) => setLocal({ ...local, height: e.target.value })}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Sex</label>
                    <select
                        name="sex"
                        value={local.sex}
                        onChange={(e) => setLocal({ ...local, sex: e.target.value })}
                        required
                        className="w-full px-4 py-2 border rounded"
                    >
                        <option value="">Select sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">About Athlete</label>
                    <textarea
                        name="about_athlete"
                        value={local.about_athlete}
                        onChange={(e) => setLocal({ ...local, about_athlete: e.target.value })}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">Next</button>
            </form>
        </div>
    );
};

export default AddAthleteb;
