import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoHelpCircleOutline } from "react-icons/io5";
import { HiEye, HiEyeOff } from "react-icons/hi";
import toast from "react-hot-toast";
import { VITE_API_BASE_URL } from "../../utils/api";
import { AuthContext } from "../../context/Authcontext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Login failed");
        setLoading(false);
        return;
      }

      const token = data.token;
      const role = data.role;
      const userId = data.userId || data.user?.id;

      if (!token || !role) {
        toast.error("Token or role missing from server");
        setLoading(false);
        return;
      }

      // Create user object to store in context
      const userObj = {
        id: userId,
        email: formData.email,
        role: role,
      };

      // Use the context's setAuth function to properly set user and token
      setAuth({ user: userObj, token });

      toast.success("Login Successful!");
    } catch (error) {
      console.error("Login Error (safe):", error.message);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-md mx-auto w-full p-6 pb-10">

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
          Welcome to GrowEdge
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Please sign in to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="text"
            name="email"
            placeholder="Email or Username"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold py-3 rounded-xl transition mt-6"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-3 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-semibold text-gray-800 underline hover:text-black transition"
          >
            Register As Farmer
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
