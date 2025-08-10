
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/token/', formData);
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            navigate('/viewathletes');
        } catch (err) {
            setError('Invalid credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-300 dark:bg-gray-900 transition duration-300">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded shadow-md w-full max-w-md border border-orange-200 dark:border-gray-600">
                <h2 className="text-2xl font-bold mb-6 text-orange-400 text-center">Login</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-orange-400"
                    onChange={handleChange}
                />


                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-orange-400"
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-2 top-2 text-gray-500 hover:text-orange-400"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button type="submit" className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 cursor-pointer">
                    Log In
                </button>

                <p className='text-center font-light mt-4'>
                    Don't have an account?{' '}
                    <a href='/signup' className='text-blue-700'>Sign up</a>
                </p>

                <p className='text-center font-light mt-2'>
                    Forgot your password?{' '}
                    <a href='/passwordreset' className='text-blue-700 italic'>Reset here</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
