import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

// Cors middleware for handling cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

const USER = { email: "test@example.com", password: "123456" };
const JWT_SECRET = "secret123";

// POST /login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check email and password
  if (email === USER.email && password === USER.password) {
    // Generate JWT token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Middleware
function auth(req, res, next) {
  const header = req.header.authorization;

  // Extract token from header
  const token = header && header.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Missing token" });

  // Token validation
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// Protected route
app.get("/profile", auth, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

// Start server
app.listen(3000, () => console.log("Backend running on port 3000"));
