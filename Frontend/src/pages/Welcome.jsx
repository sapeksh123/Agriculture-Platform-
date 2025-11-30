import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🌾</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">AgriConnect</h1>
        <p className="text-lg text-gray-600 mb-8">
          Connecting Farmers, Vendors, and Shopkeepers
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-green-400 hover:bg-green-500 text-black font-semibold rounded-xl transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 border-2 border-green-400 text-green-600 hover:bg-green-50 font-semibold rounded-xl transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
