import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import rootRouter from "./routes/api/root.js";
import login from "./routes/api/login.js";
import authenticate from "./routes/api/authenticate.js";
import register from "./routes/api/register.js";
import addCompany from "./routes/api/addCompany.js";
import getCompany from "./routes/api/getCompany.js";
import addUser from "./routes/api/addUser.js";
import getUsers from "./routes/api/getUsers.js";
import logout from "./routes/api/logout.js";
import verifyUser from "./middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", express.static(join(__dirname, "public")));
app.use("/", rootRouter);
app.use("/authenticate", authenticate);
app.use("/register", register);
app.use("/login", login);
app.use("/add-company", addCompany);
app.use("/get-companies", getCompany);
app.use("/logout", logout);
app.use("/add-user", addUser);
app.use("/view-users", getUsers);
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
