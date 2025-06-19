import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "Forbidden" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      message: "Selamat datang di dashboard!",
      user: decoded
    });
  } catch (err) {
    res.status(403).json({ message: "Token tidak valid" });
  }
}
