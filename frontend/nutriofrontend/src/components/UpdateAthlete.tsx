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








