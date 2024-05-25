import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

import rootRouter from "./routes/api/root.js";
import login from "./routes/api/login.js";
import authenticate from "./routes/api/authenticate.js";
import register from "./routes/api/register.js";
import addCompany from "./routes/api/addCompany.js";
import getCompany from "./routes/api/getCompany.js";
import addUser from "./routes/api/addUser.js";
import getUsers from "./routes/api/getUsers.js";
import logout from "./routes/api/logout.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

const allowedOrigins = [
  "http://localhost:3000", // Local development URL
  "https://6e9669a5.role-based-login-frontend.pages.dev", // Production frontend URL
  "https://role-based-login-frontend.pages.dev",
  "https://lms-frontend.digiphins.in",
];

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, e.g., mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Static files
app.use("/", express.static(join(__dirname, "public")));

// Routes
app.use("/", rootRouter);
app.use("/authenticate", authenticate);
app.use("/register", register);
app.use("/login", login);
app.use("/add-company", addCompany);
app.use("/get-companies", getCompany);
app.use("/logout", logout);
app.use("/add-user", addUser);
app.use("/view-users", getUsers);

// 404 handler
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
