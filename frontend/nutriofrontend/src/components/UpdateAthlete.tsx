/*
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useImagePreview } from "../utils/UseImagePreview";
import { getImageUrl } from "../utils/getImageUrl";
import axios from "axios";

function UpdateAthlete() {
    const { id } = useParams();
    const [values, setValues] = useState({
        athlete: "",


        sex: "male",
        bday: "",
        height: "",
        weight: "",
        about_athlete: ""
    });

    const [file, setFile] = useState<File | null>(null);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const preview = useImagePreview(file);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        axios.get(`AthleteUpdate/${id}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`
            }
        })
            .then((res) => {
                setValues({
                    athlete: res.data.athlete,
                    bday: res.data.bday,
                    height: res.data.height,
                    weight: res.data.weight,
                    sex: res.data.sex,

                    about_athlete: res.data.about_athlete
                });
                setCurrentImage(res.data.profile_pic ?? null);
            })
            .catch((err) => {
                console.error("Failed to fetch athlete data:", err);
            });
    }, [id]);



    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (file && file.size > 2_000_000) return;

        const form = new FormData();
        Object.entries(values).forEach(([k, v]) => form.append(k, v as string));
        if (file) form.append("profile_pic", file);

        axios.put(`AthleteUpdate/${id}/`, form, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => navigate("/athletelist"))
            .catch((err) => {
                console.error("Update failed:", err);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-700 via-blue-800 to-black flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-8">
                <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">Update Student</h2>
                <form onSubmit={handleUpdate} className="space-y-5">
                    {["athlete", "sex", "bday", "height", "weight", "about_athlete"].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-semibold text-gray-700 mb-1">
                                {field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                            </label>
                            <input
                                type={field === "bday" ? "date" : (["height", "weight"].includes(field) ? "number" : "text")}
                                name={field}
                                value={(values as any)[field]}
                                onChange={(e) => setValues({ ...values, [field]: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>
                    ))}

                    <div>
                        <label htmlFor="sex" className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                        <select
                            name="sex"
                            value={values.sex}
                            onChange={(e) => setValues({ ...values, sex: e.target.value })}



                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        />
                        {(preview || currentImage) && (
                            <img
                                src={preview ?? getImageUrl(currentImage)}
                                alt="Profile"
                                className="mt-2 w-24 h-24 object-cover rounded-full"
                            />
                        )}
                        <p className="text-xs text-gray-500">Max size: 2MB.</p>
                    </div>

                    <div className="flex justify-between">
                        <button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded">Submit</button>
                        <Link to="/athletelist" className="text-purple-700 hover:underline">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateAthlete;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useImagePreview } from "../utils/UseImagePreview";
import { getImageUrl } from "../utils/getImageUrl";

const UpdateAthlete = () => {
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();
    const [values, setValues] = useState<any>({});
    const [file, setFile] = useState<File | null>(null);
    const [currentImg, setCurrentImg] = useState<string | null>(null);
    const preview = useImagePreview(file);

    useEffect(() => {
        if (id) {
            axiosInstance.get(`/AthleteUpdate/${id}/`).then(r => {
                setValues(r.data);
                setCurrentImg(r.data.profile_pic || null);
            });
        }
    }, [id]);



    const handle = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(values).forEach(([k, v]) => data.append(k, v as string));
        if (file) data.append("profile_pic", file);
        await axiosInstance.put(`/AthleteUpdate/${id}/`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        nav("/viewathletes");

    };
   

    return (
        <form onSubmit={handle}>
            {["athlete", "bday", "height", "weight"].map(f => (
                <div key={f}>
                    <label>{f}</label>
                   <input
                        type={f === "bday" ? "date" : "text"}
                        name={f}
                        value={values[f] || ""}
                        onChange={e => setValues({ ...values, [f]: e.target.value })}
                        required
                    />
                </div>
            ))}
            <select value={values.sex || ""} onChange={e => setValues({ ...values, sex: e.target.value })} required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <textarea
                value={values.about_athlete || ""}
                onChange={e => setValues({ ...values, about_athlete: e.target.value })}
                required
            />
            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
            {(preview || currentImg) && <img src={preview || getImageUrl(currentImg!)} alt="" />}
            <button type="submit">Update</button>
            <Link to="/viewathletes">Cancel</Link>
        </form>
    );
};

export default UpdateAthlete;










    */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useImagePreview } from "../utils/UseImagePreview";
import axiosInstance from "../utils/axiosInstance";
import { getImageUrl } from "../utils/getImageUrl";

function UpdateAthlete() {
    const { id } = useParams();
    const [values, setValues] = useState({
        athlete: "",
        bday: "",
        weight: "",
        height: "",
        sex: "",
        about_athlete: "",

    });

    const [file, setFile] = useState<File | null>(null);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const preview = useImagePreview(file);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        axiosInstance.get(`AthleteUpdate/${id}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`
            }
        })
            .then((res) => {
                setValues({
                    athlete: res.data.athlete,
                    bday: res.data.bday,
                    weight: res.data.weight,
                    height: res.data.height,
                    sex: res.data.sex,
                    about_athlete: res.data.about_athlete
                });
                setCurrentImage(res.data.profile_pic ?? null);
            })
            .catch((err) => {
                console.error("Failed to fetch student data:", err);
            });
    }, [id]);

    const handle = (e: React.FormEvent) => {
        e.preventDefault();
        if (file && file.size > 2_000_000) return;

        const form = new FormData();
        Object.entries(values).forEach(([k, v]) => form.append(k, v as string));
        if (file) form.append("profile_pic", file);

        axiosInstance.put(`AthleteUpdate/${id}/`, form, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => navigate("/viewathletes"))
            .catch((err) => {
                console.error("Update failed:", err);
            });
    };
    return (
        <form onSubmit={handle}>
            {["athlete", "bday", "height", "weight"].map(f => (
                <div key={f}>
                    <label>{f}</label>
                    <input
                        type={f === "bday" ? "date" : "text"}
                        name={f}
                        value={(values as any)[f]}
                        onChange={(e) => setValues({ ...values, [f]: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        required
                    />


                </div>
            ))}
            <select value={values.sex || ""} onChange={e => setValues({ ...values, sex: e.target.value })} required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <textarea
                value={values.about_athlete || ""}
                onChange={e => setValues({ ...values, about_athlete: e.target.value })}
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            {(preview || currentImage) && (
                <img
                    src={preview ?? getImageUrl(currentImage)}
                    alt="Profile"
                    className="mt-2 w-24 h-24 object-cover rounded-full"
                />
            )}
            <p className="text-xs text-gray-500">Max size: 2MB.</p>
            <button type="submit">Update</button>
            <Link to="/viewathletes">Cancel</Link>
        </form>
    );
};

export default UpdateAthlete;








