
# GrowEdge : Agriculture Platform

## Overview

A platform connecting *Farmers, Equipment Owners, Shopkeepers, and Admins* to manage *equipment renting, product shopping, and revenue tracking*, with role-based dashboards and analytics.

---

## 1. Roles & Overview

| Role            | Dashboard Features                                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Farmer          | Search & rent equipment, shop products, wishlist/cart, track orders, contact owners, area-wise tracking, subscription rentals, notifications |
| Equipment Owner | Manage equipment (add/update/delete), track rentals, revenue tracking, maintenance alerts, message farmers, ratings, dynamic pricing         |
| Shopkeeper      | Manage products (add/update/delete), track orders, revenue tracking, discounts, wishlist/cart management, ratings, stock alerts              |
| Admin           | Full platform oversight, revenue dashboards, user management, analytics, dispute resolution, notifications, reports, commission tracking     |

---

## 2. Core Features

1. Role-based routing and dashboards
2. Equipment/product search & filter by category, location, or availability
3. Cart/Wishlist features
4. Messaging & notifications
5. Analytics dashboards (charts for revenue, rentals, sales)
6. Forms for adding/updating equipment/products

---

## 3. Features by Role

### 3.1 Farmer

* Search & rent equipment (filter by type, availability, location)
* Shop products (add to cart/wishlist)
* Track orders & rentals (status updates)
* Contact equipment owners & shopkeepers
* Area-wise equipment tracking (map view)
* Notifications & subscription rentals
* Analytics: rental history, spending overview

### 3.2 Equipment Owner

* Add/update/delete equipment
* Track rental requests & approve/reject
* Revenue tracking & analytics
* Maintenance alerts & schedules
* Contact farmers
* Ratings & reviews
* Dynamic pricing & rental pooling

### 3.3 Shopkeeper

* Add/update/delete products
* Track orders & update status
* Revenue tracking & analytics
* Wishlist & cart support for farmers
* Discounts / promotions
* Stock alerts & customer ratings

### 3.4 Admin

* Full platform access: users, equipment, products, orders
* Revenue dashboard: platform commission % from owners/shopkeepers
* Analytics: total sales, rentals, active users
* Dispute management
* Platform notifications & announcements
* Export reports (CSV/PDF)

---

## 4. Revenue & Commission Flow

* Owner/Shopkeeper Revenue: rentalPrice * quantity or productPrice * quantity
* Platform Commission: Admin takes a percentage (e.g., 10%) from each transaction
* Admin Revenue Dashboard: Tracks total commission, monthly/seasonal trends, owner/shopkeeper-wise revenue

---

## 5. Basic Structure

```
agriculture-platform/
├── frontend/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.js
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── server.js
│   │   ├── app.js
│   │   └── config/
│   │       └── db.js
│   ├── package.json
│   └── .env
├── README.md
```

---

## 6. Tech Stack

**Frontend:**

* React.js
* React Router
* Tailwind CSS (or any CSS framework)
* Axios (for API requests)
* Material UI

**Backend:**

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* Multer / Cloudinary for file uploads

---

## 7. Requirements

* Node.js >= 18.x
* MongoDB (local or Atlas)
* npm or yarn

---

## 8. Installation

### Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`.

4. Run the server in development mode:

```bash
npm run dev
```

5. Check in browser or Postman:

```
http://localhost:5000/
```

If you see a response, the backend is working correctly.

---

### Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open in browser:

```
http://localhost:5173/
```

---

## 9. Deployment

**Frontend:**
`https://growedge.vercel.app`

**Backend:**
`https://growedge-backend.onrender.com`

⚠️ If the backend is not deployed yet, users can run it locally using the `.env.example` file and `npm run dev`.

---

## 10. License

This project is licensed under the **ISC License**.
See [LICENSE](LICENSE) for more details.

---

## 11. Developer

* **Frontend Developer:** Srajal Vishwakarma — [GitHub](https://github.com/srajal591)
* **Backend Developer:** Sapeksh Vishwakarma — [GitHub](https://github.com/sapeksh123)
