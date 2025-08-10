/*
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { getImageUrl } from "../utils/getImageUrl";

function ReadAthlete() {
    const [data, setData] = useState<any>({});
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        axiosInstance.get(`/AthleteUpdate/${id}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        })
            .then((res) => setData(res.data))
            .catch((err) => {
                console.error("Failed to fetch athlete data:", err);
            });
    }, [id]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-700 to-black flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-8 space-y-4">
                <h2 className="text-3xl font-bold text-purple-800 text-center"> Athlete Details</h2>
                <img
                    src={getImageUrl(data.profile_pic)}
                    alt="Profile"
                    className="mx-auto w-24 h-24 rounded-full"
                />
                <div className="text-gray-800 space-y-2">
                    <p><strong className="text-purple-700">Athlete:</strong> {data.athlete}</p>
                    <p><strong className="text-purple-700">Age:</strong> {data.age}</p>
                    <p><strong className="text-purple-700">Gender:</strong> {data.sex}</p>
                    <p><strong className="text-purple-700">Height:</strong> {data.height}</p>
                    <p><strong className="text-purple-700">Weight:</strong> {data.weight}</p>
                    <p><strong className="text-purple-700">About:</strong> {data.about_athlete}</p>
                </div>
                <div className="flex justify-between mt-6">
                    <Link to={`/update/${id}`} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Edit</Link>
                    <Link to="/chatbox" className="text-purple-700 hover:underline">Back</Link>
                </div>
            </div>
        </div>
    );
}

export default ReadAthlete;
*/
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { getImageUrl } from "../utils/getImageUrl";

const ReadAthlete = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<any>({});

    useEffect(() => {
        if (id) {
            axiosInstance.get(`/AthleteUpdate/${id}/`).then(r => setData(r.data));
        }
    }, [id]);

    return (
        <div>
            <img src={getImageUrl(data.profile_pic)} alt="" />
            <p>Athlete: {data.athlete}</p>
            <p>Sex: {data.sex}</p>
            <p>Birthdate: {data.bday}</p>
            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>
            <p>About: {data.about_athlete}</p>
            <Link to={`/updateathlete/${id}`}>Edit</Link>
        </div>
    );
};

export default ReadAthlete;