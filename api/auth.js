// File: api/auth.js

const users = [
  { growid: "admin", password: "admin123" },
  { growid: "player1", password: "secret1" },
];

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { growid, password } = req.body;

  const user = users.find(
    (u) => u.growid.toLowerCase() === growid.toLowerCase() && u.password === password
  );

  if (user) {
    return res.status(200).json({ success: true, message: "Login sukses" });
  } else {
    return res.status(401).json({ success: false, message: "GrowID atau password salah!" });
  }
}
