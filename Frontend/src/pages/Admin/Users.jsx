
// import { useState, useEffect } from "react";
// import {
//   IoSearch,
//   IoChevronDown,
//   IoAdd,
//   IoClose,
// } from "react-icons/io5";
// import toast from "react-hot-toast";
// import { VITE_API_BASE_URL } from "../../utils/api";

// const Users = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [formType, setFormType] = useState(""); // "shopkeeper" | "owner"
//   const [selectedRole, setSelectedRole] = useState("owner"); // FILTER
//   const [apiUsers, setApiUsers] = useState([]); // Dynamic Users from backend

//   const token = sessionStorage.getItem("token");

//   // ============================
//   // FORM STATE
//   // ============================
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     shopName: "",
//     businessName: "",
//     address: "",
//     phoneNumber: "",
//     aadharNumber: "",
//   });

//   // ============================
//   // FETCH USERS (OWNER / SHOPKEEPER)
//   // ============================
//   const fetchUsers = async () => {
//     try {
//       const roleApi =
//         selectedRole === "owner"
//           ? `${VITE_API_BASE_URL}/admin/owner`
//           : `${VITE_API_BASE_URL}/admin/shopkeeper`;

//       const res = await fetch(roleApi, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();
//       console.log("FETCHED USERS:", data);

//       if (!data.success) {
//         toast.error("Failed to load users");
//         return;
//       }

//       if (selectedRole === "owner") setApiUsers(data.owners);
//       if (selectedRole === "shopkeeper") setApiUsers(data.shopkeepers);
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong while fetching users");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [selectedRole]);

//   // ============================
//   // RESET FORM
//   // ============================
//   const openModal = (type) => {
//     setFormType(type);
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       shopName: "",
//       businessName: "",
//       address: "",
//       phoneNumber: "",
//       aadharNumber: "",
//     });
//     setShowModal(true);
//   };

//   // ============================
//   // FORM CHANGE HANDLER
//   // ============================
//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // ============================
//   // SUBMIT FORM (API CALL)
//   // ============================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.name || !formData.email || !formData.password || !formData.address) {
//       toast.error("All required fields must be filled");
//       return;
//     }
//     if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
//       toast.error("Phone number must be 10 digits");
//       return;
//     }
//     if (!/^[0-9]{12}$/.test(formData.aadharNumber)) {
//       toast.error("Aadhar number must be 12 digits");
//       return;
//     }

//     try {
//       let url = "";
//       let body = {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         address: formData.address,
//         phoneNumber: formData.phoneNumber,
//         aadharNumber: formData.aadharNumber,
//       };

//       if (formType === "shopkeeper") {
//         url = `${VITE_API_BASE_URL}/admin/shopkeeper`;
//         body.shopName = formData.shopName;
//       }
//       if (formType === "owner") {
//         url = `${VITE_API_BASE_URL}/admin/owner`;
//         body.businessName = formData.businessName;
//       }

//       const res = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();
//       console.log("API RESPONSE:", data);

//       if (!data.success) {
//         toast.error(data.message || "Failed to create user");
//         return;
//       }

//       toast.success(data.message);
//       setShowModal(false);
//       fetchUsers(); // refresh table

//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong");
//     }
//   };

//   // ============================
//   // ROLE BADGE COLORS
//   // ============================
//   const getRoleBadge = (role) => {
//     const colors = {
//       shopkeeper: "bg-orange-100 text-orange-700",
//       owner: "bg-purple-100 text-purple-700",
//     };
//     return colors[role] || "bg-gray-100 text-gray-700";
//   };

//   return (
//     <>
//       {/* PAGE */}
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

//           {/* HEADER */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Users</h1>
//               <p className="text-gray-600">Manage all platform users</p>
//             </div>

//             <button
//               onClick={() => openModal("select")}
//               className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
//             >
//               <IoAdd className="w-5 h-5" />
//               <span>Add User</span>
//             </button>
//           </div>

//           {/* FILTER */}
//           <div className="mb-4 flex">
//             <select
//               value={selectedRole}
//               onChange={(e) => setSelectedRole(e.target.value)}
//               className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500"
//             >
//               <option value="owner">Owners</option>
//               <option value="shopkeeper">Shopkeepers</option>
//             </select>
//           </div>

//           {/* TABLE */}
//           <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

//             {/* Search Bar */}
//             <div className="p-4 border-b">
//               <div className="relative">
//                 <IoSearch className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//             </div>

//             {/* SCROLLABLE TABLE */}
//             <div className="overflow-x-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-300">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-600">User</th>
//                     <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-600">Role</th>
//                     <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-600">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-600">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y">
//                   {apiUsers.map((user, index) => {
//                     const u = user.user;

//                     return (
//                       <tr key={index} className="hover:bg-gray-50">
//                         <td className="px-6 py-4">
//                           <div className="flex items-center space-x-3">
//                             <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
//                               {u.name[0]}
//                             </div>
//                             <div>
//                               <p className="font-semibold text-gray-900">{u.name}</p>
//                               <p className="text-sm text-gray-500">{u.email}</p>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="px-6 py-4">
//                           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadge(selectedRole)}`}>
//                             {selectedRole === "owner" ? "Owner" : "Shopkeeper"}
//                           </span>
//                         </td>

//                         <td className="px-6 py-4">
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                               user.status === "active"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-gray-200 text-gray-700"
//                             }`}
//                           >
//                             {user.status}
//                           </span>
//                         </td>

//                         <td className="px-6 py-4">
//                           <button className="text-green-600 hover:text-green-700 text-sm font-semibold">
//                             View Details
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>

//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ======================================================= */}
//       {/* ===================== MODAL SECTION ==================== */}
//       {/* ======================================================= */}

//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
//           <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">

//             {/* Close */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <IoClose size={25} />
//             </button>

//             {/* Choose User Type */}
//             {formType === "select" && (
//               <div className="text-center">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                   Choose User Type
//                 </h2>

//                 <div className="flex flex-col gap-4">
//                   <button
//                     onClick={() => setFormType("shopkeeper")}
//                     className="py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
//                   >
//                     Create Shopkeeper
//                   </button>

//                   <button
//                     onClick={() => setFormType("owner")}
//                     className="py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                   >
//                     Create Owner
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* FORM */}
//             {(formType === "shopkeeper" || formType === "owner") && (
//               <form onSubmit={handleSubmit} className="space-y-4 mt-4">

//                 <h2 className="text-xl font-bold text-center">
//                   {formType === "shopkeeper" ? "Create Shopkeeper" : "Create Owner"}
//                 </h2>

//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Full Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 bg-gray-50 rounded-lg"
//                   required
//                 />

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 bg-gray-50 rounded-lg"
//                   required
//                 />

//                 <input
//                   type="text"
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 bg-gray-50 rounded-lg"
//                   required
//                 />

//                 {formType === "shopkeeper" && (
//                   <input
//                     type="text"
//                     name="shopName"
//                     placeholder="Shop Name"
//                     value={formData.shopName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 bg-gray-50 rounded-lg"
//                     required
//                   />
//                 )}

//                 {formType === "owner" && (
//                   <input
//                     type="text"
//                     name="businessName"
//                     placeholder="Business Name"
//                     value={formData.businessName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 bg-gray-50 rounded-lg"
//                     required
//                   />
//                 )}

//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 bg-gray-50 rounded-lg"
//                   required
//                 />

//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   placeholder="Phone Number (10 digits)"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 bg-gray-50 rounded-lg"
//                   required
//                 />

//                 <input
//                   type="text"
//                   name="aadharNumber"
//                   placeholder="Aadhar Number (12 digits)"
//                   value={formData.aadharNumber}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 bg-gray-50 rounded-lg"
//                   required
//                 />

//                 <button
//                   type="submit"
//                   className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                 >
//                   {formType === "shopkeeper" ? "Create Shopkeeper" : "Create Owner"}
//                 </button>

//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Users;


import { useState, useEffect, useMemo } from "react";
import {
  IoSearch,
  IoAdd,
  IoClose,
} from "react-icons/io5";
import toast from "react-hot-toast";
import { VITE_API_BASE_URL } from "../../utils/api";

const Users = () => {
  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState(""); // "shopkeeper" | "owner"
  const [selectedRole, setSelectedRole] = useState("owner"); // filter
  const [apiUsers, setApiUsers] = useState([]); // list from backend
  const [loading, setLoading] = useState(false);

  // Pagination
  const PER_PAGE = 3; // as requested
  const [page, setPage] = useState(1);

  // token for protected routes
  const token = sessionStorage.getItem("token");

  // form state (modal)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
    businessName: "",
    address: "",
    phoneNumber: "",
    aadharNumber: "",
  });

  // --- Fetch users (owner or shopkeeper) ---
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const url =
        selectedRole === "owner"
          ? `${VITE_API_BASE_URL}/admin/owner`
          : `${VITE_API_BASE_URL}/admin/shopkeeper`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to load users");
        setApiUsers([]);
      } else {
        // Data shape: { owners: [...] } or { shopkeepers: [...] }
        const list = selectedRole === "owner" ? data.owners || [] : data.shopkeepers || [];
        setApiUsers(list);
        // reset page if list shorter than current page
        setPage(1);
      }
    } catch (err) {
      console.error("Fetch users error (safe):", err.message || err);
      toast.error("Unable to fetch users");
      setApiUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRole]);

  // --- Helpers ---
  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const openModal = (type) => {
    setFormType(type);
    setFormData({
      name: "",
      email: "",
      password: "",
      shopName: "",
      businessName: "",
      address: "",
      phoneNumber: "",
      aadharNumber: "",
    });
    setShowModal(true);
  };

  // client-side search + pagination
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return apiUsers;
    return apiUsers.filter((u) => {
      const userObj = u.user || {};
      const name = (userObj.name || "").toLowerCase();
      const email = (userObj.email || "").toLowerCase();
      const shop = (u.shopName || u.businessName || "").toLowerCase();
      return name.includes(q) || email.includes(q) || shop.includes(q);
    });
  }, [apiUsers, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  // --- submit new owner/shopkeeper ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // minimal validation
    if (!formData.name || !formData.email || !formData.password || !formData.address) {
      toast.error("Please fill required fields");
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      toast.error("Phone number must be 10 digits");
      return;
    }
    if (!/^[0-9]{12}$/.test(formData.aadharNumber)) {
      toast.error("Aadhar number must be 12 digits");
      return;
    }

    try {
      const url =
        formType === "owner"
          ? `${VITE_API_BASE_URL}/admin/owner`
          : `${VITE_API_BASE_URL}/admin/shopkeeper`;

      const body = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        aadharNumber: formData.aadharNumber,
        ...(formType === "owner" ? { businessName: formData.businessName } : {}),
        ...(formType === "shopkeeper" ? { shopName: formData.shopName } : {}),
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to create user");
        return;
      }

      toast.success(data.message || "Created successfully");
      setShowModal(false);
      // refresh list
      fetchUsers();
    } catch (err) {
      console.error("Create user error (safe):", err.message || err);
      toast.error("Something went wrong");
    }
  };

  // --- Toggle status (owner/shopkeeper) ---
  const handleToggleStatus = async (item) => {
    // item: owner object or shopkeeper object (has _id)
    const id = item._id;
    const role = selectedRole; // 'owner' or 'shopkeeper'
    const toggleUrl = `${VITE_API_BASE_URL}/admin/${role}/${id}/toggle-status`;

    // optimistic UI: flip status locally then confirm
    const previous = apiUsers.slice();
    const updated = apiUsers.map((u) =>
      u._id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
    );
    setApiUsers(updated);

    try {
      const res = await fetch(toggleUrl, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to update status");
        setApiUsers(previous); // rollback
        return;
      }

      toast.success(data.message || "Status updated");
      // replace the single item with returned one if provided
      if (role === "owner" && data.owner) {
        const newList = apiUsers.map((u) => (u._id === id ? data.owner : u));
        setApiUsers(newList);
      }
      if (role === "shopkeeper" && data.shopkeeper) {
        const newList = apiUsers.map((u) => (u._id === id ? data.shopkeeper : u));
        setApiUsers(newList);
      }
    } catch (err) {
      console.error("Toggle status error (safe):", err.message || err);
      toast.error("Unable to update status");
      setApiUsers(previous); // rollback
    }
  };

  // role badge colors
  const getRoleBadge = (roleKey) => {
    if (roleKey === "owner") return "bg-purple-100 text-purple-700";
    if (roleKey === "shopkeeper") return "bg-orange-100 text-orange-700";
    return "bg-gray-100 text-gray-700";
  };

  // === UI ===
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Users</h1>
              <p className="text-gray-600 mt-1">Manage all platform users</p>
            </div>

            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              {/* Role Filter buttons (improved UI) */}
              <div className="flex items-center rounded-lg bg-white border border-gray-100 shadow-sm">
                <button
                  onClick={() => setSelectedRole("owner")}
                  className={`px-4 py-2 rounded-l-lg font-medium ${selectedRole === "owner" ? "bg-green-50 text-green-700" : "text-gray-600"}`}
                >
                  Owners
                </button>
                <button
                  onClick={() => setSelectedRole("shopkeeper")}
                  className={`px-4 py-2 rounded-r-lg font-medium ${selectedRole === "shopkeeper" ? "bg-green-50 text-green-700" : "text-gray-600"}`}
                >
                  Shopkeepers
                </button>
              </div>

              <button
                onClick={() => openModal("select")}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
              >
                <IoAdd className="w-5 h-5" />
                <span>Add User</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users by name, email or shop..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Scrollable table */}
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
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  ) : paginated.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((item, idx) => {
                      const userObj = item.user || {};
                      const name = userObj.name || "Unknown";
                      const email = userObj.email || "";
                      const status = item.status || "inactive";

                      return (
                        <tr key={item._id || idx} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                                {name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{name}</div>
                                <div className="text-xs text-gray-500">{email}</div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(selectedRole)}`}>
                              {selectedRole === "owner" ? "Owner" : "Shopkeeper"}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="text-sm font-medium">
                                {status === "active" ? "Active" : "Inactive"}
                              </div>

                              {/* Toggle switch (Option B - text outside) */}
                              <div
                                role="button"
                                onClick={() => handleToggleStatus(item)}
                                className={`relative inline-flex items-center w-12 h-6 transition-colors rounded-full cursor-pointer ${status === "active" ? "bg-green-500" : "bg-gray-300"}`}
                                aria-pressed={status === "active"}
                              >
                                <span
                                  className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ${status === "active" ? "translate-x-6" : "translate-x-1"}`}
                                />
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <strong>{(page - 1) * PER_PAGE + 1}</strong> to{" "}
                <strong>{Math.min(page * PER_PAGE, filtered.length)}</strong> of{" "}
                <strong>{filtered.length}</strong> entries
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded-md border bg-white text-sm disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="text-sm">
                  Page <strong>{page}</strong> / <strong>{totalPages}</strong>
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded-md border bg-white text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal (Add user) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={25} />
            </button>

            {formType === "select" && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose User Type</h2>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setFormType("shopkeeper")}
                    className="py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Create Shopkeeper
                  </button>

                  <button
                    onClick={() => setFormType("owner")}
                    className="py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Create Owner
                  </button>
                </div>
              </div>
            )}

            {(formType === "shopkeeper" || formType === "owner") && (
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <h2 className="text-xl font-bold text-center">
                  {formType === "shopkeeper" ? "Create Shopkeeper" : "Create Owner"}
                </h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg"
                  required
                />

                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg"
                  required
                />

                {formType === "shopkeeper" && (
                  <input
                    type="text"
                    name="shopName"
                    placeholder="Shop Name"
                    value={formData.shopName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 rounded-lg"
                    required
                  />
                )}

                {formType === "owner" && (
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Business Name"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 rounded-lg"
                    required
                  />
                )}

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg"
                  required
                />

                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number (10 digits)"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg"
                  required
                />

                <input
                  type="text"
                  name="aadharNumber"
                  placeholder="Aadhar Number (12 digits)"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg"
                  required
                />

                <button
                  type="submit"
                  className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  {formType === "shopkeeper" ? "Create Shopkeeper" : "Create Owner"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
