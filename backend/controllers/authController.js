const { generateToken } = require("../utils/jwt");
const getConnection = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "supersecretkey"; // You can move to .env later

// Signup
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "All fields required" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO users (username, password) VALUES (:username, :password)`,
      { username, password: hashedPassword },
      { autoCommit: true }
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login function - Example
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const connection = await db.getConnection();
        const result = await connection.execute(
            `SELECT * FROM users WHERE username = :username AND password = :password`,
            { username, password },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        await connection.close();

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = result.rows[0];

        // Adding this to Generate JWT token
        const token = generateToken({ id: user.ID, username: user.USERNAME });

        return res.json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Login failed" });
    }
};