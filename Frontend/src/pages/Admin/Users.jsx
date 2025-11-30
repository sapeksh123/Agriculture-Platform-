import { useState } from "react";
import { IoSearch, IoChevronDown, IoAdd } from "react-icons/io5";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { name: "Ethan Carter", role: "Farmer", avatar: "https://i.pravatar.cc/150?img=12", status: "Active" },
    { name: "Olivia Bennett", role: "Shopkeeper", avatar: "https://i.pravatar.cc/150?img=5", status: "Active" },
    { name: "Noah Thompson", role: "Owner", avatar: "https://i.pravatar.cc/150?img=13", status: "Active" },
    { name: "Sophia Clark", role: "Admin", avatar: "https://i.pravatar.cc/150?img=9", status: "Active" },
    { name: "Liam Foster", role: "Farmer", avatar: "https://i.pravatar.cc/150?img=14", status: "Inactive" },
    { name: "Ava Mitchell", role: "Shopkeeper", avatar: "https://i.pravatar.cc/150?img=10", status: "Active" },
    { name: "Jackson Reed", role: "Owner", avatar: "https://i.pravatar.cc/150?img=15", status: "Active" },
    { name: "Isabella Wright", role: "Admin", avatar: "https://i.pravatar.cc/150?img=16", status: "Active" },
  ];

  const getRoleBadge = (role) => {
    const colors = {
      Farmer: "bg-green-100 text-green-700",
      Shopkeeper: "bg-orange-100 text-orange-700",
      Owner: "bg-purple-100 text-purple-700",
      Admin: "bg-blue-100 text-blue-700",
    };
    return colors[role] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600 mt-1">Manage all platform users</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
            <IoAdd className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  Role <IoChevronDown className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  Status <IoChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
