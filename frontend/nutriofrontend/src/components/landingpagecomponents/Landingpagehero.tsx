
import { Link } from "react-router-dom";

import { motion } from 'framer-motion';

function LandingPagehero() {


    return (
        <>

            <nav className="fixed top-0 w-full flex justify-between items-center p-6 z-20 bg-black via-black bg-opacity-50">
                <div className="text-2xl font-bold text-white">Nutrio</div>
                <div className="flex gap-6">

                    <Link to="/login" className=" text-white hover:text-purple-300">
                        Login
                    </Link>
                    <Link to="/signup" className="text-white hover:text-purple-300">
                        Sign Up
                    </Link>

                </div>
            </nav>

            <div className="h-145 w-full bg-gradient-to-br from-gray-600 via-black to-black text-white overflow-hidden">
                <br /><br /><br /><br />
                < motion.h1
                style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="text-5xl md:text-6xl font-extrabold mb-4 text-center">
                Your next Ai powered fitness instructor
                </motion.h1>
                <div className="flex justify-around">
                    <div>
                        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                            Track ,Create  your fitness info in one platform
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/signup"
                                className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-4xl"
                            >
                                Get Started
                            </Link>

                        </div>
                    </div>
                    <motion.div
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}>
                        <img src="./images/hero.jpeg " alt="hero image" className="w-100 h-100" />
                    </motion.div>
                </div>
            </div>

        </>

    )
}
export default LandingPagehero;

