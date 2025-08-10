/*
import { useNavigate } from "react-router-dom";

import { useImagePreview } from "../utils/UseImagePreview";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAthleteForm } from "../context/AthleteFormContext";

function AddAthletec() {
    const { values } = useAthleteForm();
    const [file, setFile] = useState<File | null>(null);
    const preview = useImagePreview(file);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // 🔐 Fetch CSRF cookie on mount
    useEffect(() => {
        axios.get("http://localhost:8000/api/csrf/", {
            withCredentials: true,
        })
            .then(() => console.log("✅ CSRF cookie set"))
            .catch((err) => console.error("CSRF error:", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (file && file.size > 2_000_000) {
            setError("Image must be under 2MB.");
            return;
        }

        const formData = new FormData();
        Object.entries(values).forEach(([key, val]) => {
            formData.append(key, val);
        });
        if (file) formData.append("profile_pic", file);

        try {
            await axios.post("http://localhost:8000/api/AthleteListCreate/", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            navigate("/viewathletes");
        } catch (err: any) {
            const data = err?.response?.data;
            setError(typeof data === "object" ? JSON.stringify(data) : "Error submitting data");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-800 p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-5"
            >
                <h2 className="text-2xl font-bold text-indigo-700 text-center"> Upload Profile Picture</h2>

                <div>
                    <label className="block mb-2 font-medium text-gray-700">
                        Upload Profile Picture:
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        className="w-full"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-3 w-24 h-24 rounded-full object-cover border border-gray-300"
                        />
                    )}
                </div>

                {error && <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddAthletec;

import React, { useEffect, useState } from "react";
import { useAthleteForm } from "../context/AthleteFormContext";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

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
      setError(JSON.stringify(err.response?.data || "Error"));
    }
  };

  return (
    <form onSubmit={handle} encType="multipart/form-data">
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};
export default AddAthletec;
*/
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