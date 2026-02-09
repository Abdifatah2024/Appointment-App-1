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



---

## 🔐 Authentication & Security

- JWT-based authentication
- Session-based authentication using Passport
- Role-Based Access Control (RBAC)
- Password hashing with bcrypt
- Protected API routes
- Secure cookies (`httpOnly`)
- Environment variables for secrets

---

## 🔑 Environment Variables

Create a `.env` file in the backend root:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/appointment_app
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=xxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxx


📡 API Endpoints
👤 Users (/api/users)
Method	Endpoint	Description
POST	/	Create user
GET	/	Get all users
GET	/:id	Get user by ID
PUT	/:id	Update user
DELETE	/:id	Soft delete user
DELETE	/users/permanent/:id	Permanent delete (Admin only)
🔐 Auth (/api/auth)
Method	Endpoint	Description
POST	/login	User login
👥 Customers (/api/customers)
Method	Endpoint	Description
POST	/	Register customer
GET	/	Get all customers
PUT	/:id	Update customer
DELETE	/:id	Delete customer
🧾 Services (/api/services)
Method	Endpoint	Description
POST	/	Create service
GET	/	Get services
PUT	/:id	Update service
DELETE	/:id	Delete service
📅 Appointments (/api/appointments)
Method	Endpoint	Description
POST	/	Create appointment
GET	/	Get appointments
PUT	/:id	Update appointment
DELETE	/:id	Delete appointment
⚙️ How to Run the Project
Backend
cd backend
npm install
npm run dev


Backend runs on:
👉 http://localhost:4000

Frontend
cd frontend
npm install
npm run dev


Frontend runs on:
👉 http://localhost:5173

🚀 Deployment

Deployed using Railway

Supports:

Environment variable management

Continuous deployment from GitHub

Automated builds

🧪 Testing & Validation

All API endpoints tested

Authentication & authorization verified

Appointment limits validated

Bug fixes applied

System stability confirmed

📌 Future Improvements

Email & SMS notifications

Appointment analytics dashboard

Multi-branch support

Advanced reporting

Public appointment tracking

🏫 Course Provider

TELESOM ACADEMY
Est. 2020


## 📁 Folder Structure

