import { useState, useEffect } from "react";
import { IoAdd, IoSearch, IoClose, IoCreate } from "react-icons/io5";
  import {
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import toast from "react-hot-toast";
import { VITE_API_BASE_URL } from "../../utils/api";

const CategoryManagement = () => {
  
  // State Management
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", isActive: true });
  const [submitLoading, setSubmitLoading] = useState(false);

  const token = sessionStorage.getItem("token");

  // Fetch Categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/product-category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openCreateModal = () => {
    setModalType("create");
    setFormData({ name: "", isActive: true });
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setModalType("edit");
    setFormData({ name: category.name, isActive: category.isActive });
    setEditingId(category._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: "", isActive: true });
    setEditingId(null);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setSubmitLoading(true);
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/product-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Category created successfully");
        setCategories([data.data, ...categories]);
        closeModal();
      } else {
        toast.error(data.message || "Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setSubmitLoading(true);
    try {
      const response = await fetch(
        `${VITE_API_BASE_URL}/product-category/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Category updated successfully");
        setCategories(
          categories.map((cat) =>
            cat._id === editingId ? data.data : cat
          )
        );
        closeModal();
      } else {
        toast.error(data.message || "Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleToggleStatus = async (categoryId) => {
    try {
      const response = await fetch(
        `${VITE_API_BASE_URL}/product-category/${categoryId}/toggle`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Category status updated");
        setCategories(
          categories.map((cat) =>
            cat._id === categoryId ? data.data : cat
          )
        );
      } else {
        toast.error(data.message || "Failed to toggle status");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Failed to toggle status");
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-1">Manage product categories</p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition font-medium"
          >
            <IoAdd className="w-5 h-5" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4">
            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-500"></div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500 text-lg">
              No categories found. {searchTerm && "Try a different search."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100"
              >
                {/* Category Icon/Name */}
                <div className="text-4xl mb-4 text-center text-green-600">📦</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">
                  {category.name}
                </h3>

                {/* Status Badge */}
                <div className="flex justify-center mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      category.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(category)}
                    className="flex-1 py-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <IoCreate size={18} />
                    Edit
                  </button>
                    
           <button
  onClick={() => handleToggleStatus(category._id)}
  className="flex items-center justify-center p-1 transition hover:scale-105"
  title={category.isActive ? "Deactivate" : "Activate"}
>
  {category.isActive ? (
    <AiFillCheckCircle
      size={24}
      className="text-green-600 transition-colors"
    />
  ) : (
    <AiFillCloseCircle
      size={24}
      className="text-red-500 transition-colors"
    />
  )}
</button>



                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalType === "create" ? "Create Category" : "Edit Category"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={
                modalType === "create"
                  ? handleCreateCategory
                  : handleUpdateCategory
              }
            >
              {/* Name Input */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Enter category name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                />
              </div>

              {/* Active Status */}
              <div className="mb-6 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={handleFormChange}
                  className="w-4 h-4 rounded cursor-pointer accent-green-500"
                />
                <label
                  htmlFor="isActive"
                  className="font-semibold text-gray-900 cursor-pointer"
                >
                  Active
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                >
                  {submitLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
