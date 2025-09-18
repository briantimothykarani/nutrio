import { useNavigate } from "react-router-dom";
import { useAthleteForm } from "../context/AthleteFormContext";

const AddAthlete = () => {
  const { values, updateValues } = useAthleteForm();
  const [local, setLocal] = useState({
    athlete: values.athlete,
    bday: values.bday,
    weight: values.weight,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/login");
  }, [navigate]);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    updateValues(local);
    navigate("/addathleteb");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 p-6">
      <form onSubmit={handle} className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-5">
        <h2 className="text-2xl font-bold text-purple-700 text-center">Create Athlete Info</h2>
        {["athlete", "bday", "weight"].map((f) => (
          <div key={f}>
            <label className="block mb-1 font-medium text-gray-700 capitalize">{f.replace("_", " ")}</label>
            <input
              type={f === "bday" ? "date" : "text"}
              name={f}
              value={(local as any)[f]}
              onChange={(e) => setLocal((prev) => ({ ...prev, [f]: e.target.value }))}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">Next</button>
      </form>
    </div>
  );
};

export default AddAthlete;
