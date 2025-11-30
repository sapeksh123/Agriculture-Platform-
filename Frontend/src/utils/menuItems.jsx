import {
  Dashboard,
  ShoppingBag,
  People,
  Settings,
  Tractor,
  Inventory,
} from "@mui/icons-material";

const menuItems = {
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: Dashboard },
    { label: "Users", path: "/admin/users", icon: People },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ],
  farmer: [
    { label: "Home", path: "/farmer/home", icon: Dashboard },
    { label: "Book Equipment", path: "/farmer/book", icon: Tractor },
    { label: "My Orders", path: "/farmer/orders", icon: ShoppingBag },
  ],
  shopkeeper: [
    { label: "Dashboard", path: "/shopkeeper/dashboard", icon: Dashboard },
    { label: "Inventory", path: "/shopkeeper/inventory", icon: Inventory },
    { label: "Bookings", path: "/shopkeeper/bookings", icon: ShoppingBag },
  ],
  owner: [
    { label: "My Equipment", path: "/owner/equipment", icon: Tractor },
    { label: "Bookings", path: "/owner/bookings", icon: ShoppingBag },
    { label: "Settings", path: "/owner/settings", icon: Settings },
  ],
};

export default menuItems;
