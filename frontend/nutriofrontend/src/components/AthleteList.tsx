import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from '../utils/axiosInstance';
import { getImageUrl } from '../utils/getImageUrl';

function AthleteList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("http://127.0.0.1:8000/api/AthleteList/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("API fetch error:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-black p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-800">Athletes</h1>
          <Link
            to="/addathlete"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Add Athlete
          </Link>
        </div>

        <table className="min-w-full border border-gray-300">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="py-3 px-4 border-r border-purple-900">Profile</th>
              <th className="py-3 px-4 border-r border-purple-900">athlete</th>
              <th className="py-3 px-4 border-r border-purple-900">Age</th>
              <th className="py-3 px-4 border-r border-purple-900">height</th>
              <th className="py-3 px-4 border-r border-purple-900">weight</th>
              <th className="py-3 px-4 border-r border-purple-900">Gender</th>

              <th className="py-3 px-4 border-r border-purple-900">About Student</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No athletes found.
                </td>
              </tr>
            )}
            {data.map((athlete: any) => (
              <tr key={athlete.id} className="hover:bg-purple-100 even:bg-purple-50 transition">
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  <img
                    src={getImageUrl(athlete.profile_pic)}
                    alt={athlete.athlete}
                    className="w-12 h-12 rounded-full object-cover mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{athlete.athlete}</td>
                <td className="py-2 px-4 border-b border-gray-200">{athlete.bday}</td>
                <td className="py-2 px-4 border-b border-gray-200">{athlete.height}</td>
                <td className="py-2 px-4 border-b border-gray-200 capitalize">{athlete.weight}</td>
                <td className="py-2 px-4 border-b border-gray-200">{athlete.about_athlete}</td>                <td className="py-2 px-4 border-b border-gray-200 space-x-2">
                  <Link to={`/readathlete/${athlete.id}`} className="text-blue-600 hover:underline">Read</Link>
                  <Link to={`/updateathlete/${athlete.id}`} className="text-purple-700 hover:underline">Edit</Link>
                  <Link to={`/deleteathlete/${athlete.id}`} className="text-red-600 hover:underline">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-center">

          <Link to="/logout" className="inline-block text-white bg-black hover:bg-purple-700 font-semibold py-2 px-6 rounded transition">
            Logout
          </Link>

          <Link to="/athletesummarybasic/:id" className="inline-block text-white bg-black hover:bg-purple-700 font-semibold py-2 px-6 rounded transition">
            gpt
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AthleteList;
