// File: api/auth.js

export const config = {
  api: {
    bodyParser: true, // Memastikan body JSON bisa diparsing otomatis oleh Vercel
  },
};

// Contoh database akun (bisa diganti MongoDB / MySQL nanti)
const users = [
  { growid: "admin", password: "admin123" },
  { growid: "player1", password: "secret1" },
];

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }

  const { growid, password } = req.body || {};

  if (!growid || !password) {
    return res.status(400).json({ success: false, message: "GrowID dan password wajib diisi" });
  }

  const user = users.find(
    (u) =>
      u.growid.toLowerCase() === growid.toLowerCase() &&
      u.password === password
  );

  if (user) {
    return res.status(200).json({ success: true, message: "Login sukses" });
  } else {
    return res.status(401).json({ success: false, message: "GrowID atau password salah" });
  }
}
