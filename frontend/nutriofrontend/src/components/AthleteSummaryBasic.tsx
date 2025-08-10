
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import VerticalNavbar from "./VerticalNavbar";

interface AIResponse {
    summary: string;
    fitness_plan: string;
    meal_plan: string;
}

const AthleteSummaryBasic = () => {
    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState<AIResponse>({
        summary: "",
        fitness_plan: "",
        meal_plan: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // User choices for saving plans
    const [saveFitnessPlan, setSaveFitnessPlan] = useState(false);
    const [saveMealPlan, setSaveMealPlan] = useState(false);

    const fetchSummary = async () => {
        if (!id) return;
        setLoading(true);
        setError("");
        try {
            const res = await axiosInstance.get<AIResponse>(`/AthleteSummaryApiView/${id}/`, { withCredentials: true });
            setData(res.data);
        } catch (e) {
            console.error(e);
            setError("Failed to fetch athlete summary.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, [id]);

    const handleSavePlans = async () => {
        try {
            // POST to your backend save endpoint (create it if you don't have one)
            await axiosInstance.post(
                `/AthleteSavePlans/${id}/`,
                {
                    fitness_plan: saveFitnessPlan ? data.fitness_plan : null,
                    meal_plan: saveMealPlan ? data.meal_plan : null,
                },
                { withCredentials: true }
            );
            alert("Plans saved successfully!");
        } catch (e) {
            console.error(e);
            alert("Failed to save plans.");
        }
    };

    return (
        <div className="flex h-screen bg-gray-950 text-white">
            <VerticalNavbar />
            <main className="flex-1 overflow-auto bg-gradient-to-r from-blue-600 via-black to-blue-900 p-8">
                <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-blue-400 mb-4">Athlete Summary & Plans</h1>

                    {loading && <p className="text-gray-300">Loading summary...</p>}
                    {error && <p className="text-red-400">{error}</p>}

                    {!loading && !error && (
                        <>
                            <section className="mb-6">
                                <h2 className="text-xl font-semibold text-blue-300 mb-2">Summary</h2>
                                <pre className="whitespace-pre-wrap text-gray-100">{data.summary}</pre>
                            </section>

                            <section className="mb-6">
                                <h2 className="text-xl font-semibold text-blue-300 mb-2">Fitness Plan</h2>
                                <pre className="whitespace-pre-wrap text-gray-100">{data.fitness_plan}</pre>
                                <label className="inline-flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        checked={saveFitnessPlan}
                                        onChange={() => setSaveFitnessPlan(!saveFitnessPlan)}
                                        className="mr-2"
                                    />
                                    Save Fitness Plan
                                </label>
                            </section>

                            <section className="mb-6">
                                <h2 className="text-xl font-semibold text-blue-300 mb-2">Meal Plan</h2>
                                <pre className="whitespace-pre-wrap text-gray-100">{data.meal_plan}</pre>
                                <label className="inline-flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        checked={saveMealPlan}
                                        onChange={() => setSaveMealPlan(!saveMealPlan)}
                                        className="mr-2"
                                    />
                                    Save Meal Plan
                                </label>
                            </section>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={fetchSummary}
                                    disabled={loading}
                                    className="bg-blue-400 font-black text-amber-100 w-32 h-10 border-b-purple-500 border-2 rounded-2xl"
                                >
                                    Regenerate
                                </button>

                                <button
                                    onClick={handleSavePlans}
                                    disabled={loading || (!saveFitnessPlan && !saveMealPlan)}
                                    className={`w-32 h-10 rounded-2xl text-white ${saveFitnessPlan || saveMealPlan ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 cursor-not-allowed"
                                        }`}
                                >
                                    Save Plans
                                </button>

                                <button
                                    onClick={() => alert("Download PDF coming soon!")}
                                    className="bg-blue-600 w-32 h-10 rounded-2xl text-white"
                                >
                                    Download PDF
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AthleteSummaryBasic;