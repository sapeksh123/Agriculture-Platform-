import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoHelpCircleOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Auto-login after registration
    login(formData.email, formData.password);
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

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Join GrowEdge today
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
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

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="farmer">Farmer</option>
            <option value="shopkeeper">Shopkeeper</option>
            <option value="owner">Owner/Vendor</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold py-3 rounded-xl transition mt-6"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-gray-700 underline hover:text-gray-900"
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
