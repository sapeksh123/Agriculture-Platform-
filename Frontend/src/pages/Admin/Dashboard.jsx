import { useNavigate } from "react-router-dom";
import { IoChevronForward, IoPeople, IoBuild, IoCar, IoTrendingUp } from "react-icons/io5";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Users", value: "125", icon: IoPeople, color: "bg-blue-500", trend: "+12%" },
    { label: "Total Equipment", value: "75", icon: IoBuild, color: "bg-green-500", trend: "+8%" },
    { label: "Total Vehicles", value: "50", icon: IoCar, color: "bg-purple-500", trend: "+5%" },
  ];

  const manageItems = [
    { label: "Manage Users", path: "/admin/users", icon: IoPeople, color: "text-blue-600" },
    { label: "Manage Equipment", path: "/admin/equipment", icon: IoBuild, color: "text-green-600" },
    { label: "Manage Vehicles", path: "/admin/vehicles", icon: IoCar, color: "text-purple-600" },
    { label: "Manage Shops", path: "/admin/shops", icon: IoTrendingUp, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-semibold flex items-center">
                  <IoTrendingUp className="w-4 h-4 mr-1" />
                  {stat.trend}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Manage Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {manageItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-gray-900 font-medium">{item.label}</span>
                </div>
                <IoChevronForward className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
