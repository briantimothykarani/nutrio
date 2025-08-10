
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sun, Moon } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    // Load theme from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        const isDark = !darkMode;
        setDarkMode(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', isDark);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/register/', formData);
            alert('Signup successful!');
            navigate('/addathlete');
        } catch (err) {
            setError('Signup failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-300 dark:bg-gray-900 transition duration-300">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded shadow-md w-full max-w-md border border-orange-200 dark:border-gray-600"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-orange-400 dark:text-orange-300">Sign Up</h2>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="text-gray-700 dark:text-gray-200 hover:text-orange-400"
                        aria-label="Toggle theme"
                    >
                        {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                    </button>
                </div>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-orange-400"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-orange-400"
                    onChange={handleChange}
                />

                {/* Password Field */}
                <div className="relative mb-4">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded pr-10 bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-orange-400"
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-2 text-gray-600 dark:text-gray-300 hover:text-orange-400"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {/* Error */}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition"
                >
                    Sign Up
                </button>

                {/* Divider */}
                <div className="my-4 text-center text-gray-500">or</div>

                {/* Google Sign-In Placeholder */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    <span className="text-sm">Sign up with Google</span>
                </button>

                <p className="text-center font-light mt-6">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-700 dark:text-blue-400">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
