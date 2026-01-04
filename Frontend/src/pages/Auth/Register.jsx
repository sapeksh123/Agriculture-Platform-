import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoHelpCircleOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { VITE_API_BASE_URL } from "../../utils/api";

const Register = () => {
  const { setAuth } = useContext(AuthContext); // assuming you expose this
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${VITE_API_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Registration failed");
      }

      // Save auth data (traditional approach)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update global auth state
      setAuth({
        token: data.token,
        user: data.user,
      });

      // Redirect farmer
      navigate("/login");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-md mx-auto w-full p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="w-10 h-10 rounded-full border-2 border-gray-200"></div>

          <img
            src="/LogoD.png"
            alt="GrowEdge Logo"
            className="h-12 w-auto object-contain"
          />

          <IoHelpCircleOutline className="w-7 h-7 text-gray-400" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Farmer Registration
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Create your GrowEdge farmer account
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-200"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-200"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-200"
          />

          {/* Role (fixed farmer, shown for clarity) */}
          <input
            type="text"
            value="Farmer"
            disabled
            className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold py-3 rounded-xl transition"
          >
            {loading ? "Registering..." : "Register as Farmer"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="underline text-gray-700"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
