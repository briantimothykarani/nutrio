
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../utils/getImageUrl";

interface User {

    id: number;
    athlete: string;

    profile_pic?: string;
}

const VerticalNavbar = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/current_user/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                });
                setCurrentUser(res.data);
            } catch (err) {
                console.error("Failed to fetch current user:", err);
            }
        };

        fetchUser();
    }, []);

    return (
        <nav className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg">
            {/* User profile */}
            {currentUser && (
                <div className="p-4 border-b border-gray-800 flex items-center space-x-3">
                    <img
                        src={getImageUrl(currentUser.profile_pic)}
                        alt={currentUser.athlete}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <p className="font-semibold">{currentUser.athlete}</p>
                </div>
            )}

            {/* App title */}
            <div className="text-2xl font-bold p-6 border-b border-gray-700">Nutrio</div>

            {/* Navigation links */}
            <ul className="flex flex-col flex-grow">
                <li className="hover:bg-gray-700">
                    <Link
                        to="/viewathletes"
                        className="block px-6 py-4 border-l-4 border-transparent hover:border-purple-600 transition"
                    >
                        Home
                    </Link>
                </li>

                {currentUser && (
                    <li className="hover:bg-gray-700">
                        <Link
                            to={`/readathlete/${currentUser.id}`}
                            className="block px-6 py-4 border-l-4 border-transparent hover:border-purple-600 transition"
                        >
                            Profile
                        </Link>
                    </li>
                )}

                <li className="hover:bg-gray-700">
                    <Link
                        to="/settings"
                        className="block px-6 py-4 border-l-4 border-transparent hover:border-purple-600 transition"
                    >
                        Settings
                    </Link>
                </li>

                <li className="hover:bg-gray-700">
                    <Link
                        to="/g-a-c"
                        className="block px-6 py-4 border-l-4 border-transparent hover:border-purple-600 transition"
                    >
                        Get help
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default VerticalNavbar;
