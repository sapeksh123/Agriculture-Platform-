import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoHelpCircleOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-md mx-auto w-full p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="w-10 h-10 rounded-full border-2 border-gray-200"></div>

          {/* Logo in center */}
          <img
            src="/LogoD.png"
            alt="GrowEdge Logo"
            className="h-12 w-auto object-contain"
          />

          <IoHelpCircleOutline className="w-7 h-7 text-gray-400" />
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Welcome to GrowEdge
        </h2>
        <p className="text-gray-500 text-center mb-8">Please sign in to continue</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="email"
            placeholder="Email or Username"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          <a href="#" className="block text-sm text-gray-500 hover:text-gray-700">
            Forgot Password?
          </a>

          <button
            type="submit"
            className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold py-3 rounded-xl transition mt-6"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-gray-700 underline hover:text-gray-900"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
