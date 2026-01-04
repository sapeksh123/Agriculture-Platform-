// src/config/menuItems.jsx
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const menuItems = {
  // 🟢 Admin Menu
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: DashboardIcon },
    { label: "Users", path: "/admin/users", icon: PeopleIcon },
    { label: "Equipment", path: "/admin/equipment", icon: AgricultureIcon },
    { label: "Vehicles", path: "/admin/vehicles", icon: LocalShippingIcon },
    { label: "Shops", path: "/admin/shops", icon: StoreIcon },
    { label: "Settings", path: "/admin/settings", icon: SettingsIcon },
  ],

  // 🟢 Farmer Menu
  farmer: [
    { label: "Dashboard", path: "/farmer/dashboard", icon: DashboardIcon },
    { label: "My Crops", path: "/farmer/crops", icon: AgricultureIcon },
    { label: "Buy Equipments", path: "/farmer/buy", icon: StoreIcon },
    { label: "My Orders", path: "/farmer/orders", icon: ListAltIcon },
    { label: "Profile", path: "/farmer/profile", icon: AccountCircleIcon },
  ],

  // 🟢 Shopkeeper Menu
  shopkeeper: [
    { label: "Dashboard", path: "/shopkeeper/dashboard", icon: DashboardIcon },
    { label: "Add Products", path: "/shopkeeper/add-product", icon: AddCircleOutlineIcon },
    { label: "Inventory", path: "/shopkeeper/inventory", icon: InventoryIcon },
    { label: "Orders", path: "/shopkeeper/orders", icon: ListAltIcon },
    { label: "Settings", path: "/shopkeeper/settings", icon: SettingsIcon },
  ],

  // 🟢 Owner Menu
  owner: [
    { label: "Dashboard", path: "/owner/dashboard", icon: DashboardIcon },
    { label: "Equipments", path: "/owner/equipments", icon: LocalShippingIcon },
    { label: "Bookings", path: "/owner/bookings", icon: ListAltIcon },
    { label: "Profile", path: "/owner/profile", icon: AccountCircleIcon },
    { label: "Settings", path: "/owner/settings", icon: SettingsIcon },
  ],
};

export default menuItems;
