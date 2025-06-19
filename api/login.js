import jwt from "jsonwebtoken";

const users = [
  { username: "admin", password: "12345" },
  { username: "guest", password: "gtps" }
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ status: "failed", message: "Login gagal" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "2h"
  });

  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    "127.0.0.1";

  res.status(200).json({
    status: "success",
    token,
    message: "Login berhasil!",
    ip
  });
}
