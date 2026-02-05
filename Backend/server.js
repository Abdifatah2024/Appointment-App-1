require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const connectDB = require("./src/config/db");
const passport = require("./src/config/passport");

const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes");

const app = express();

/* =========================
   CORS CONFIG
========================= */

app.use(
  cors({
    origin: "http://localhost:5173", // EXACT frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


/* =========================
   BODY PARSER
========================= */
app.use(express.json());

/* =========================
   CONNECT DATABASE
========================= */
connectDB();

/* =========================
   SESSION (REQUIRED for passport)
========================= */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "google-oauth-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

/* =========================
   PASSPORT (ORDER IS IMPORTANT)
========================= */
app.use(passport.initialize());
app.use(passport.session());

/* =========================
   ROUTES
========================= */
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

/* =========================
   ROOT TEST
========================= */
app.get("/", (req, res) => {
  res.send("API Running");
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

