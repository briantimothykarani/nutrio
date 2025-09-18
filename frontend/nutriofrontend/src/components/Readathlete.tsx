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
