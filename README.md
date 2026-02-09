# 📅 Appointment Management System

A web-based **Appointment Management System** designed to digitize and automate appointment scheduling for government and service-based offices.  
The system reduces queues, enforces daily limits, improves service efficiency, and ensures secure, role-based access control.

---

## 🚀 Project Overview

The Appointment Management System allows citizens/customers to book appointments online while enabling administrators to manage users, services, and appointment limits efficiently.

### 🎯 Key Objectives
- Digitize appointment scheduling
- Reduce overcrowding and long queues
- Enforce daily appointment limits automatically
- Improve transparency and service delivery
- Provide secure, role-based system access

---

## 👥 User Roles

### 🔑 Admin
- Manage users, customers, services, and appointments
- Approve or suspend users
- Assign permissions and roles
- Set daily appointment limits
- Monitor system activity and data integrity

### 👤 Staff / Clerk
- Manage daily operations
- View and process appointments
- Limited permissions (no permanent deletion)

---

## 🧱 System Architecture

The system follows a **client–server architecture**:

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ODM)

### 🔄 System Flow
1. User interacts with React frontend
2. Frontend sends HTTP requests via Axios
3. Express API processes requests
4. Authentication handled with JWT & Sessions
5. Data stored and retrieved from MongoDB
6. Response returned to frontend

---

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- JWT (jsonwebtoken)
- express-session
- bcryptjs
- dotenv
- CORS
- Multer
- Nodemon

### Frontend
- React (Vite)
- Axios
- Tailwind CSS (optional)

---

backend/
│── src/
│ ├── config/
│ │ ├── db.js
│ │ └── passport.js
│ ├── controllers/
│ │ ├── user.controller.js
│ │ ├── auth.controller.js
│ │ ├── customer.controller.js
│ │ ├── service.controller.js
│ │ └── appointment.controller.js
│ ├── middlewares/
│ │ └── auth.middleware.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Customer.js
│ │ ├── Service.js
│ │ └── Appointment.js
│ ├── routes/
│ │ ├── user.routes.js
│ │ ├── auth.routes.js
│ │ ├── customer.routes.js
│ │ ├── service.routes.js
│ │ └── appointment.routes.js
│ └── server.js
│── package.json
│── .env

## 📁 Folder Structure

