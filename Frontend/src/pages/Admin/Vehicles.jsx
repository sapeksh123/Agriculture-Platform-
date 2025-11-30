import { IoAdd, IoSearch } from "react-icons/io5";

const Vehicles = () => {
  const vehicles = [
    { name: "John Deere 5075E", type: "Tractor", emoji: "🚜", owner: "Mike Johnson", status: "Available" },
    { name: "Case IH 7250", type: "Combine Harvester", emoji: "🌾", owner: "Sarah Smith", status: "Rented" },
    { name: "New Holland SP400F", type: "Sprayer", emoji: "💧", owner: "Tom Brown", status: "Available" },
    { name: "Kinze 3600", type: "Planter", emoji: "🌱", owner: "Lisa Davis", status: "Available" },
    { name: "Landoll 875", type: "Tillage Equipment", emoji: "🚜", owner: "John Wilson", status: "Maintenance" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Vehicles</h1>
            <p className="text-gray-600 mt-1">Manage rental vehicles</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
            <IoAdd className="w-5 h-5" />
            <span>Add Vehicle</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4">
            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search vehicles..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {vehicles.map((vehicle, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                    {vehicle.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{vehicle.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{vehicle.type}</p>
                    <p className="text-gray-500 text-sm">Owner: {vehicle.owner}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      vehicle.status === "Available" ? "bg-green-100 text-green-700" :
                      vehicle.status === "Rented" ? "bg-orange-100 text-orange-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {vehicle.status}
                    </span>
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
