  // import { useState, useEffect, useMemo } from "react";
  // import { IoSearch, IoAdd, IoClose } from "react-icons/io5";
  // import toast from "react-hot-toast";
  // import { VITE_API_BASE_URL } from "../../utils/api";

  // const Users = () => {
  //   // UI state
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [showModal, setShowModal] = useState(false);
  //   const [formType, setFormType] = useState(""); // "shopkeeper" | "owner"
  //   const [selectedItemData, setSelectedItemData] = useState(null);
  //   const [detailsLoading, setDetailsLoading] = useState(false);
  //   const [selectedRole, setSelectedRole] = useState("owner"); // filter
  //   const [apiUsers, setApiUsers] = useState([]); // list from backend
  //   const [loading, setLoading] = useState(false);

  //   // Pagination
  //   const PER_PAGE = 4; // as requested
  //   const [page, setPage] = useState(1);

  //   // token for protected routes
  //   const token = sessionStorage.getItem("token");

  //   // form state (modal)
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

  //   // --- Fetch users (owner or shopkeeper) ---
  //   const fetchUsers = async () => {
  //     setLoading(true);
  //     try {
  //       const url =
  //         selectedRole === "owner"
  //           ? `${VITE_API_BASE_URL}/admin/owner`
  //           : `${VITE_API_BASE_URL}/admin/shopkeeper`;

  //       const res = await fetch(url, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       const data = await res.json();

  //       if (!data.success) {
  //         toast.error(data.message || "Failed to load users");
  //         setApiUsers([]);
  //       } else {
  //         // Data shape: { owners: [...] } or { shopkeepers: [...] }
  //         const list = selectedRole === "owner" ? data.owners || [] : data.shopkeepers || [];
  //         setApiUsers(list);
  //         // reset page if list shorter than current page
  //         setPage(1);
  //       }
  //     } catch (err) {
  //       console.error("Fetch users error (safe):", err.message || err);
  //       toast.error("Unable to fetch users");
  //       setApiUsers([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchUsers();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [selectedRole]);

  //   // --- Helpers ---
  //   const handleChange = (e) => {
  //     const { name, type, value, files } = e.target;
  //     if (type === "file") {
  //       setFormData((s) => ({ ...s, [name]: files && files[0] ? files[0] : null }));
  //     } else {
  //       setFormData((s) => ({ ...s, [name]: value }));
  //     }
  //   };

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

  //   const openDetailsModal = (data) => {
  //     setSelectedItemData(data || null);
  //     setFormType("details");
  //     setShowModal(true);
  //   };

  //   // client-side search + pagination
  //   const filtered = useMemo(() => {
  //     const q = searchTerm.trim().toLowerCase();
  //     if (!q) return apiUsers;
  //     return apiUsers.filter((u) => {
  //       const userObj = u.user || {};
  //       const name = (userObj.name || "").toLowerCase();
  //       const email = (userObj.email || "").toLowerCase();
  //       const shop = (u.shopName || u.businessName || "").toLowerCase();
  //       return name.includes(q) || email.includes(q) || shop.includes(q);
  //     });
  //   }, [apiUsers, searchTerm]);

  //   const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  //   useEffect(() => {
  //     if (page > totalPages) setPage(1);
  //   }, [totalPages, page]);

  //   const paginated = useMemo(() => {
  //     const start = (page - 1) * PER_PAGE;
  //     return filtered.slice(start, start + PER_PAGE);
  //   }, [filtered, page]);

  //   // --- submit new owner/shopkeeper ---
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // minimal validation
  //     if (!formData.name || !formData.email || !formData.password || !formData.address) {
  //       toast.error("Please fill required fields");
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
  //       const url =
  //         formType === "owner"
  //           ? `${VITE_API_BASE_URL}/admin/owner`
  //           : `${VITE_API_BASE_URL}/admin/shopkeeper`;

  //       // Use FormData because backend accepts form-data with files (ownerImage/shopImage)
  //       const form = new FormData();
  //       form.append("name", formData.name || "");
  //       form.append("email", formData.email || "");
  //       form.append("password", formData.password || "");
  //       form.append("address", formData.address || "");
  //       form.append("phoneNumber", formData.phoneNumber || "");
  //       form.append("aadharNumber", formData.aadharNumber || "");
  //       if (formType === "owner") form.append("businessName", formData.businessName || "");
  //       if (formType === "shopkeeper") form.append("shopName", formData.shopName || "");

  //       if (formData.ownerImage) form.append("ownerImage", formData.ownerImage);
  //       if (formData.shopImage) form.append("shopImage", formData.shopImage);

  //       const res = await fetch(url, {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: form,
  //       });

  //       const data = await res.json();

  //       if (!data.success) {
  //         toast.error(data.message || "Failed to create user");
  //         return;
  //       }

  //       toast.success(data.message || "Created successfully");
  //       setShowModal(false);
  //       // refresh list
  //       fetchUsers();
  //     } catch (err) {
  //       console.error("Create user error (safe):", err.message || err);
  //       toast.error("Something went wrong");
  //     }
  //   };

  //   // --- View details by id (owner/shopkeeper) ---
  //   const handleViewDetails = async (item) => {
  //     if (!item?._id) return;
  //     setDetailsLoading(true);
  //     try {
  //       const url = `${VITE_API_BASE_URL}/admin/${selectedRole}/${item._id}`;
  //       const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  //       const data = await res.json();
  //       if (!data.success) {
  //         toast.error(data.message || "Failed to fetch details");
  //         return;
  //       }
  //       const payload = data.owner || data.shopkeeper || null;
  //       openDetailsModal(payload);
  //     } catch (err) {
  //       console.error("View details error (safe):", err.message || err);
  //       toast.error("Unable to fetch details");
  //     } finally {
  //       setDetailsLoading(false);
  //     }
  //   };

  //   // --- Toggle status (owner/shopkeeper) ---
  //   const handleToggleStatus = async (item) => {
  //     // item: owner object or shopkeeper object (has _id)
  //     const id = item._id;
  //     const role = selectedRole; // 'owner' or 'shopkeeper'
  //     const toggleUrl = `${VITE_API_BASE_URL}/admin/${role}/${id}/toggle-status`;

  //     // optimistic UI: flip status locally then confirm
  //     const previous = apiUsers.slice();
  //     const updated = apiUsers.map((u) =>
  //       u._id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
  //     );
  //     setApiUsers(updated);

  //     try {
  //       const res = await fetch(toggleUrl, {
  //         method: "PATCH",
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       const data = await res.json();

  //       if (!data.success) {
  //         toast.error(data.message || "Failed to update status");
  //         setApiUsers(previous); // rollback
  //         return;
  //       }

  //       toast.success(data.message || "Status updated");
  //       // replace the single item with returned one if provided
  //       if (role === "owner" && data.owner) {
  //         const newList = apiUsers.map((u) => (u._id === id ? data.owner : u));
  //         setApiUsers(newList);
  //       }
  //       if (role === "shopkeeper" && data.shopkeeper) {
  //         const newList = apiUsers.map((u) => (u._id === id ? data.shopkeeper : u));
  //         setApiUsers(newList);
  //       }
  //     } catch (err) {
  //       console.error("Toggle status error (safe):", err.message || err);
  //       toast.error("Unable to update status");
  //       setApiUsers(previous); // rollback
  //     }
  //   };

  //   // role badge colors
  //   const getRoleBadge = (roleKey) => {
  //     if (roleKey === "owner") return "bg-purple-100 text-purple-700";
  //     if (roleKey === "shopkeeper") return "bg-orange-100 text-orange-700";
  //     return "bg-gray-100 text-gray-700";
  //   };

  //   // === UI ===
  //   return (
  //     <>
  //       <div className="min-h-screen bg-gray-50">
  //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
  //           {/* Header */}
  //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
  //             <div>
  //               <h1 className="text-3xl font-bold text-gray-900">Users</h1>
  //               <p className="text-gray-600 mt-1">Manage all platform users</p>
  //             </div>

  //             <div className="flex items-center gap-3 mt-4 sm:mt-0">
  //               {/* Role Filter buttons (improved UI) */}
  //               <div className="flex items-center rounded-lg bg-white border border-gray-100 shadow-sm">
  //                 <button
  //                   onClick={() => setSelectedRole("owner")}
  //                   className={`px-4 py-2 rounded-l-lg font-medium ${selectedRole === "owner" ? "bg-green-50 text-green-700" : "text-gray-600"}`}
  //                 >
  //                   Owners
  //                 </button>
  //                 <button
  //                   onClick={() => setSelectedRole("shopkeeper")}
  //                   className={`px-4 py-2 rounded-r-lg font-medium ${selectedRole === "shopkeeper" ? "bg-green-50 text-green-700" : "text-gray-600"}`}
  //                 >
  //                   Shopkeepers
  //                 </button>
  //               </div>

  //               <div className="flex items-center gap-3">
  //                 <button
  //                   onClick={() => openModal("owner")}
  //                   className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full shadow-lg"
  //                 >
  //                   <span className="font-semibold">+ Add Owner</span>
  //                 </button>

  //                 <button
  //                   onClick={() => openModal("shopkeeper")}
  //                   className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-full shadow-lg"
  //                 >
  //                   <span className="font-semibold">+ Add Shopkeeper</span>
  //                 </button>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Table Container */}
  //           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
  //             {/* Search */}
  //             <div className="p-4 border-b border-gray-100">
  //               <div className="flex items-center gap-3">
  //                 <div className="relative flex-1">
  //                   <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  //                   <input
  //                     type="text"
  //                     placeholder="Search users by name, email or shop..."
  //                     value={searchTerm}
  //                     onChange={(e) => setSearchTerm(e.target.value)}
  //                     className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-500"
  //                   />
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Scrollable table with fixed height */}
  //             <div className="overflow-x-auto">
  //              <div className="h-[50vh] overflow-y-auto">

  //                 <table className="w-full">
  //                   <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-100">
  //                   <tr>
  //                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
  //                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
  //                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
  //                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
  //                   </tr>
  //                   </thead>

  //                 <tbody className="divide-y divide-gray-100">
  //                   {loading ? (
  //                     <tr>
  //                       <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
  //                         Loading...
  //                       </td>
  //                     </tr>
  //                   ) : paginated.length === 0 ? (
  //                     <tr>
  //                       <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
  //                         No users found.
  //                       </td>
  //                     </tr>
  //                   ) : (
  //                     paginated.map((item, idx) => {
  //                       const userObj = item.user || {};
  //                       const name = userObj.name || "Unknown";
  //                       const email = userObj.email || "";
  //                       const status = item.status || "inactive";

  //                       return (
  //                         <tr key={item._id || idx} className="hover:bg-gray-50 transition">
  //                           <td className="px-6 py-4">
  //                             <div className="flex items-center space-x-3">
  //                               <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
  //                                 {name.charAt(0).toUpperCase()}
  //                               </div>
  //                               <div>
  //                                 <div className="font-medium text-gray-900">{name}</div>
  //                                 <div className="text-xs text-gray-500">{email}</div>
  //                               </div>
  //                             </div>
  //                           </td>

  //                           <td className="px-6 py-4">
  //                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(selectedRole)}`}>
  //                               {selectedRole === "owner" ? "Owner" : "Shopkeeper"}
  //                             </span>
  //                           </td>

  //                           <td className="px-6 py-4">
  //                             <div className="flex items-center gap-3">
  //                               <div className="text-sm font-medium">
  //                                 {status === "active" ? "Active" : "Inactive"}
  //                               </div>

  //                               {/* Toggle switch (Option B - text outside) */}
  //                               <div
  //                                 role="button"
  //                                 onClick={() => handleToggleStatus(item)}
  //                                 className={`relative inline-flex items-center w-12 h-6 transition-colors rounded-full cursor-pointer ${status === "active" ? "bg-green-500" : "bg-gray-300"}`}
  //                                 aria-pressed={status === "active"}
  //                               >
  //                                 <span
  //                                   className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ${status === "active" ? "translate-x-6" : "translate-x-1"}`}
  //                                 />
  //                               </div>
  //                             </div>
  //                           </td>

  //                           <td className="px-6 py-4">
  //                             <button onClick={() => handleViewDetails(item)} className="text-green-600 hover:text-green-700 font-medium text-sm">
  //                               {detailsLoading ? "Loading..." : "View Details"}
  //                             </button>
  //                           </td>
  //                         </tr>
  //                       );
  //                     })
  //                   )}
  //                 </tbody>
  //               </table>
  //               </div>
  //             </div>

  //             {/* Pagination footer */}
  //             <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
  //               <div className="text-sm text-gray-600">
  //                 Showing <strong>{(page - 1) * PER_PAGE + 1}</strong> to{" "}
  //                 <strong>{Math.min(page * PER_PAGE, filtered.length)}</strong> of{" "}
  //                 <strong>{filtered.length}</strong> entries
  //               </div>

  //               <div className="flex items-center gap-2">
  //                 <button
  //                   onClick={() => setPage((p) => Math.max(1, p - 1))}
  //                   disabled={page === 1}
  //                   className="px-3 py-1 rounded-md border bg-white text-sm disabled:opacity-50"
  //                 >
  //                   Previous
  //                 </button>

  //                 <div className="text-sm">
  //                   Page <strong>{page}</strong> / <strong>{totalPages}</strong>
  //                 </div>

  //                 <button
  //                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
  //                   disabled={page === totalPages}
  //                   className="px-3 py-1 rounded-md border bg-white text-sm disabled:opacity-50"
  //                 >
  //                   Next
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Modal (Add user) */}
  //       {showModal && (
  //         <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
  //           <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">
  //             <button
  //               onClick={() => setShowModal(false)}
  //               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
  //             >
  //               <IoClose size={25} />
  //             </button>

  //             {formType === "select" && (
  //               <div className="text-center">
  //                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose User Type</h2>

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

  //             {formType === "details" && (
  //               <div className="mt-2">
  //                 <div className="flex items-start gap-6">
  //                   <div className="flex-1">
  //                     <div className="flex items-center justify-between">
  //                       <h2 className="text-2xl font-bold text-gray-900">{selectedItemData?.user?.name || "User Details"}</h2>
  //                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadge(selectedRole)}`}>
  //                         {selectedRole === "owner" ? "Owner" : "Shopkeeper"}
  //                       </span>
  //                     </div>

  //                     {detailsLoading ? (
  //                       <div className="text-gray-500 mt-4">Loading...</div>
  //                     ) : selectedItemData ? (
  //                       <div className="grid grid-cols-1 gap-3 mt-4">
  //                         <div className="grid grid-cols-2 gap-4">
  //                           <div className="text-sm text-gray-600"><strong>Email:</strong> <div className="text-gray-800">{selectedItemData.user?.email}</div></div>
  //                           <div className="text-sm text-gray-600"><strong>Status:</strong> <div className={`inline-block text-sm px-2 py-1 rounded ${selectedItemData?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{selectedItemData?.status || '-'}</div></div>
  //                         </div>

  //                         <div className="grid grid-cols-2 gap-4">
  //                           <div className="text-sm text-gray-600"><strong>Business / Shop:</strong> <div className="text-gray-800">{selectedItemData.businessName || selectedItemData.shopName || '-'}</div></div>
  //                           <div className="text-sm text-gray-600"><strong>Phone:</strong> <div className="text-gray-800">{selectedItemData.phoneNumber || '-'}</div></div>
  //                         </div>

  //                         <div className="text-sm text-gray-600"><strong>Address:</strong> <div className="text-gray-800">{selectedItemData.address || '-'}</div></div>
  //                         <div className="text-sm text-gray-600"><strong>Aadhar:</strong> <div className="text-gray-800">{selectedItemData.aadharNumber || '-'}</div></div>
  //                       </div>
  //                     ) : (
  //                       <div className="text-center text-gray-500 mt-4">No details available</div>
  //                     )}
  //                   </div>

  //                   <div className="w-48">
  //                     <div className="bg-gray-50 rounded-lg p-3 h-full flex flex-col items-center gap-3">
  //                       {selectedItemData?.ownerImage ? (
  //                         <img src={selectedItemData.ownerImage} alt="owner" className="w-full h-36 object-cover rounded" />
  //                       ) : (
  //                         <div className="w-full h-36 bg-gray-200 rounded flex items-center justify-center text-gray-500">No Owner Image</div>
  //                       )}

  //                       {selectedItemData?.shopImage ? (
  //                         <img src={selectedItemData.shopImage} alt="shop" className="w-full h-24 object-cover rounded" />
  //                       ) : (
  //                         <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500">No Shop Image</div>
  //                       )}

  //                       <button onClick={() => setShowModal(false)} className="mt-2 w-full py-2 bg-gray-100 text-gray-700 rounded">Close</button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             )}

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
  //                   type="password"
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

  //                                {/* File uploads (owner/shop images) */}
  //                       <div className="grid grid-cols-2 gap-3">
  //                        {/* Owner Image */}
  //                        <label className="cursor-pointer">
  //                          <div className="border border-dashed rounded-lg p-2 text-center hover:border-green-500 transition">
  //                            <div className="text-xs font-medium text-gray-700">Owner Image</div>
  //                            <div className="text-[10px] text-gray-500 mb-1">PNG / JPG</div>
                      
  //                            <div className="h-14 bg-gray-50 rounded flex items-center justify-center text-[11px] text-gray-400 px-1">
  //                              {formData.ownerImage ? formData.ownerImage.name : "Upload"}
  //                            </div>
  //                          </div>
                      
  //                          <input
  //                            type="file"
  //                            name="ownerImage"
  //                            accept="image/*"
  //                            onChange={handleChange}
  //                            className="hidden"
  //                          />
  //                        </label>
                      
  //                        {/* Shop Image */}
  //                        <label className="cursor-pointer">
  //                          <div className="border border-dashed rounded-lg p-2 text-center hover:border-green-500 transition">
  //                            <div className="text-xs font-medium text-gray-700">Shop Image</div>
  //                            <div className="text-[10px] text-gray-500 mb-1">PNG / JPG</div>
                      
  //                            <div className="h-14 bg-gray-50 rounded flex items-center justify-center text-[11px] text-gray-400 px-1">
  //                              {formData.shopImage ? formData.shopImage.name : "Upload"}
  //                            </div>
  //                          </div>
                      
  //                          <input
  //                            type="file"
  //                            name="shopImage"
  //                            accept="image/*"
  //                            onChange={handleChange}
  //                            className="hidden"
  //                          />
  //                        </label>
  //                           </div>
                      
                      
  //                <button
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
import { IoSearch, IoAdd, IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { VITE_API_BASE_URL } from "../../utils/api";

const Users = () => {
  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState(""); // "shopkeeper" | "owner"
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("owner"); // filter
  const [apiUsers, setApiUsers] = useState([]); // list from backend
  const [loading, setLoading] = useState(false);

  // Pagination
  const PER_PAGE = 4; // as requested
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
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setFormData((s) => ({ ...s, [name]: files && files[0] ? files[0] : null }));
    } else {
      setFormData((s) => ({ ...s, [name]: value }));
    }
  };

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

  const openDetailsModal = (data) => {
    setSelectedItemData(data || null);
    setFormType("details");
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

      // Use FormData because backend accepts form-data with files (ownerImage/shopImage)
      const form = new FormData();
      form.append("name", formData.name || "");
      form.append("email", formData.email || "");
      form.append("password", formData.password || "");
      form.append("address", formData.address || "");
      form.append("phoneNumber", formData.phoneNumber || "");
      form.append("aadharNumber", formData.aadharNumber || "");
      if (formType === "owner") form.append("businessName", formData.businessName || "");
      if (formType === "shopkeeper") form.append("shopName", formData.shopName || "");

      if (formData.ownerImage) form.append("ownerImage", formData.ownerImage);
      if (formData.shopImage) form.append("shopImage", formData.shopImage);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
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

  // --- View details by id (owner/shopkeeper) ---
  const handleViewDetails = async (item) => {
    if (!item?._id) return;
    setDetailsLoading(true);
    try {
      const url = `${VITE_API_BASE_URL}/admin/${selectedRole}/${item._id}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Failed to fetch details");
        return;
      }
      const payload = data.owner || data.shopkeeper || null;
      openDetailsModal(payload);
    } catch (err) {
      console.error("View details error (safe):", err.message || err);
      toast.error("Unable to fetch details");
    } finally {
      setDetailsLoading(false);
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:gap-6 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Users</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Manage all platform users</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Role Filter buttons (improved UI) */}
              <div className="flex items-center rounded-lg bg-white border border-gray-100 shadow-sm w-fit">
                <button
                  onClick={() => setSelectedRole("owner")}
                  className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-l-lg font-medium transition-colors ${selectedRole === "owner" ? "bg-green-50 text-green-700" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Owners
                </button>
                <button
                  onClick={() => setSelectedRole("shopkeeper")}
                  className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-r-lg font-medium transition-colors ${selectedRole === "shopkeeper" ? "bg-green-50 text-green-700" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Shopkeepers
                </button>
              </div>

              {/* Add buttons - Desktop */}
              <div className="hidden sm:flex items-center gap-3">
                <button
                  onClick={() => openModal("owner")}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full shadow-lg transition-all"
                >
                  <IoAdd size={18} />
                  <span className="font-semibold">Add Owner</span>
                </button>

                <button
                  onClick={() => openModal("shopkeeper")}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-full shadow-lg transition-all"
                >
                  <IoAdd size={18} />
                  <span className="font-semibold">Add Shopkeeper</span>
                </button>
              </div>

              {/* Add button - Mobile */}
              <div className="sm:hidden flex justify-end">
                <button
                  onClick={() => {
                    setFormType("select");
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg transition-all"
                >
                  <IoAdd size={20} />
                  <span className="font-semibold">Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Search */}
            <div className="p-3 sm:p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Scrollable table with fixed height */}
            <div className="overflow-x-auto">
              <div className="h-[50vh] overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="px-3 sm:px-6 py-8 text-center text-gray-500 text-sm">
                          Loading...
                        </td>
                      </tr>
                    ) : paginated.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-3 sm:px-6 py-8 text-center text-gray-500 text-sm">
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
                            <td className="px-3 sm:px-6 py-4">
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-sm">
                                  {name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{name}</div>
                                  <div className="text-xs text-gray-500 truncate">{email}</div>
                                </div>
                              </div>
                            </td>

                            <td className="px-3 sm:px-6 py-4">
                              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(selectedRole)}`}>
                                {selectedRole === "owner" ? "Owner" : "Shopkeeper"}
                              </span>
                            </td>

                            <td className="px-3 sm:px-6 py-4">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="text-xs sm:text-sm font-medium">
                                  {status === "active" ? "Active" : "Inactive"}
                                </div>

                                {/* Toggle switch */}
                                <div
                                  role="button"
                                  onClick={() => handleToggleStatus(item)}
                                  className={`relative inline-flex items-center w-11 h-5 sm:w-12 sm:h-6 transition-colors rounded-full cursor-pointer ${status === "active" ? "bg-green-500" : "bg-gray-300"}`}
                                  aria-pressed={status === "active"}
                                >
                                  <span
                                    className={`inline-block w-4 h-4 sm:w-5 sm:h-5 transform bg-white rounded-full transition-transform ${status === "active" ? "translate-x-5 sm:translate-x-6" : "translate-x-1"}`}
                                  />
                                </div>
                              </div>
                            </td>

                            <td className="px-3 sm:px-6 py-4">
                              <button onClick={() => handleViewDetails(item)} className="text-green-600 hover:text-green-700 font-medium text-xs sm:text-sm whitespace-nowrap">
                                {detailsLoading ? "Loading..." : "View Details"}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination footer */}
            <div className="px-3 sm:px-6 py-3 sm:py-4 border-t bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                Showing <strong>{(page - 1) * PER_PAGE + 1}</strong> to{" "}
                <strong>{Math.min(page * PER_PAGE, filtered.length)}</strong> of{" "}
                <strong>{filtered.length}</strong> entries
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-2 sm:px-3 py-1 rounded-md border bg-white text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                <div className="text-xs sm:text-sm">
                  Page <strong>{page}</strong> / <strong>{totalPages}</strong>
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-2 sm:px-3 py-1 rounded-md border bg-white text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-3 sm:p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={25} />
            </button>

            {formType === "select" && (
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Choose User Type</h2>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <button
                    onClick={() => setFormType("shopkeeper")}
                    className="py-2 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors"
                  >
                    Create Shopkeeper
                  </button>

                  <button
                    onClick={() => setFormType("owner")}
                    className="py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
                  >
                    Create Owner
                  </button>
                </div>
              </div>
            )}

            {formType === "details" && (
              <div className="mt-2">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedItemData?.user?.name || "User Details"}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit ${getRoleBadge(selectedRole)}`}>
                        {selectedRole === "owner" ? "Owner" : "Shopkeeper"}
                      </span>
                    </div>

                    {detailsLoading ? (
                      <div className="text-gray-500 mt-4 text-sm">Loading...</div>
                    ) : selectedItemData ? (
                      <div className="grid grid-cols-1 gap-3 mt-4 text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="text-gray-600"><strong className="block text-xs uppercase text-gray-500 mb-1">Email:</strong> <div className="text-gray-800 break-words">{selectedItemData.user?.email}</div></div>
                          <div className="text-gray-600"><strong className="block text-xs uppercase text-gray-500 mb-1">Status:</strong> <div className={`inline-block text-xs px-2 py-1 rounded ${selectedItemData?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{selectedItemData?.status || '-'}</div></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="text-gray-600"><strong className="block text-xs uppercase text-gray-500 mb-1">Business / Shop:</strong> <div className="text-gray-800">{selectedItemData.businessName || selectedItemData.shopName || '-'}</div></div>
                          <div className="text-gray-600"><strong className="block text-xs uppercase text-gray-500 mb-1">Phone:</strong> <div className="text-gray-800">{selectedItemData.phoneNumber || '-'}</div></div>
                        </div>

                        <div className="text-gray-600"><strong className="block text-xs uppercase text-gray-500 mb-1">Address:</strong> <div className="text-gray-800">{selectedItemData.address || '-'}</div></div>
                        <div className="text-gray-600"><strong className="block text-xs uppercase text-gray-500 mb-1">Aadhar:</strong> <div className="text-gray-800">{selectedItemData.aadharNumber || '-'}</div></div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 mt-4 text-sm">No details available</div>
                    )}
                  </div>

                  <div className="w-full sm:w-48">
                    <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-3">
                      {selectedItemData?.ownerImage ? (
                        <img src={selectedItemData.ownerImage} alt="owner" className="w-full h-32 sm:h-36 object-cover rounded" />
                      ) : (
                        <div className="w-full h-32 sm:h-36 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs text-center px-2">No Owner Image</div>
                      )}

                      {selectedItemData?.shopImage ? (
                        <img src={selectedItemData.shopImage} alt="shop" className="w-full h-20 sm:h-24 object-cover rounded" />
                      ) : (
                        <div className="w-full h-20 sm:h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs text-center px-2">No Shop Image</div>
                      )}

                      <button onClick={() => setShowModal(false)} className="mt-2 w-full py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(formType === "shopkeeper" || formType === "owner") && (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-4">
                <h2 className="text-lg sm:text-xl font-bold text-center">
                  {formType === "shopkeeper" ? "Create Shopkeeper" : "Create Owner"}
                </h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                {formType === "shopkeeper" && (
                  <input
                    type="text"
                    name="shopName"
                    placeholder="Shop Name"
                    value={formData.shopName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-4 py-2 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                )}

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number (10 digits)"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="text"
                  name="aadharNumber"
                  placeholder="Aadhar Number (12 digits)"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                {/* File uploads (owner/shop images) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Owner Image */}
                  <label className="cursor-pointer">
                    <div className="border border-dashed rounded-lg p-2 text-center hover:border-green-500 transition">
                      <div className="text-xs font-medium text-gray-700">Owner Image</div>
                      <div className="text-[10px] text-gray-500 mb-1">PNG / JPG</div>

                      <div className="h-14 bg-gray-50 rounded flex items-center justify-center text-[11px] text-gray-400 px-1 overflow-hidden">
                        {formData.ownerImage ? formData.ownerImage.name : "Upload"}
                      </div>
                    </div>

                    <input
                      type="file"
                      name="ownerImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>

                  {/* Shop Image */}
                  <label className="cursor-pointer">
                    <div className="border border-dashed rounded-lg p-2 text-center hover:border-green-500 transition">
                      <div className="text-xs font-medium text-gray-700">Shop Image</div>
                      <div className="text-[10px] text-gray-500 mb-1">PNG / JPG</div>

                      <div className="h-14 bg-gray-50 rounded flex items-center justify-center text-[11px] text-gray-400 px-1 overflow-hidden">
                        {formData.shopImage ? formData.shopImage.name : "Upload"}
                      </div>
                    </div>

                    <input
                      type="file"
                      name="shopImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 sm:py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition-colors"
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
