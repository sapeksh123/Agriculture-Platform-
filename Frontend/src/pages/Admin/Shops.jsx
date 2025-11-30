import { IoAdd, IoSearch, IoLocationSharp } from "react-icons/io5";

const Shops = () => {
  const shops = [
    { name: "Green Valley Seeds", owner: "John Smith", location: "California", avatar: "https://i.pravatar.cc/150?img=33", rating: 4.8 },
    { name: "Farm Equipment Co.", owner: "Sarah Johnson", location: "Texas", avatar: "https://i.pravatar.cc/150?img=44", rating: 4.5 },
    { name: "Organic Fertilizers", owner: "Mike Brown", location: "Iowa", avatar: "https://i.pravatar.cc/150?img=55", rating: 4.9 },
    { name: "AgriTools Plus", owner: "Emily Davis", location: "Nebraska", avatar: "https://i.pravatar.cc/150?img=66", rating: 4.7 },
    { name: "Harvest Supplies", owner: "David Wilson", location: "Kansas", avatar: "https://i.pravatar.cc/150?img=77", rating: 4.6 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Shops</h1>
            <p className="text-gray-600 mt-1">Manage registered shops</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
            <IoAdd className="w-5 h-5" />
            <span>Add Shop</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4">
            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search shops..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                <img src={shop.avatar} alt={shop.name} className="w-12 h-12 rounded-full" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{shop.name}</h3>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <span>⭐</span>
                    <span className="ml-1 text-gray-600">{shop.rating}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">Owner: <span className="font-medium text-gray-900">{shop.owner}</span></p>
                <div className="flex items-center text-sm text-gray-600">
                  <IoLocationSharp className="w-4 h-4 mr-1" />
                  <span>{shop.location}</span>
                </div>
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

export default Shops;
