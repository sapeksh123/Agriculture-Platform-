import { IoAdd, IoSearch } from "react-icons/io5";

const Equipment = () => {
  const equipment = [
    { name: "John Deere 5075E", type: "Tractor", emoji: "🚜", status: "Available", price: "$150/day" },
    { name: "Case IH 7250", type: "Harvester", emoji: "🌾", status: "Available", price: "$200/day" },
    { name: "Kuhn Vari-Master 153", type: "Plow", emoji: "🚜", status: "Rented", price: "$80/day" },
    { name: "Hardi Navigator 4000", type: "Sprayer", emoji: "💧", status: "Available", price: "$120/day" },
    { name: "Great Plains 3000", type: "Seeder", emoji: "🌱", status: "Available", price: "$100/day" },
    { name: "Landoll 8530", type: "Cultivator", emoji: "🚜", status: "Maintenance", price: "$90/day" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Equipment</h1>
            <p className="text-gray-600 mt-1">Manage agricultural equipment</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
            <IoAdd className="w-5 h-5" />
            <span>Add Equipment</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4">
            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search equipment..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className="text-6xl mb-4 text-center">{item.emoji}</div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.type}</p>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === "Available" ? "bg-green-100 text-green-700" :
                  item.status === "Rented" ? "bg-orange-100 text-orange-700" :
                  "bg-gray-100 text-gray-700"
                }`}>
                  {item.status}
                </span>
                <span className="font-bold text-green-600">{item.price}</span>
              </div>
              <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-900 font-medium rounded-lg transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Equipment;
