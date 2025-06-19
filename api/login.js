import bcrypt from 'bcryptjs';

// Disable built-in body parser (karena kita parsing manual)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Fungsi untuk parsing data dari launcher Growtopia (requestedName|... format)
function parseLauncherData(raw) {
  const parsed = {};
  const lines = raw.split('\n');
  for (const line of lines) {
    const [key, value] = line.split('|');
    if (key && value) parsed[key] = value;
  }
  return parsed;
}

// Handler utama untuk endpoint /api/login
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  let body = '';
  await new Promise((resolve) => {
    req.on('data', chunk => { body += chunk; });
    req.on('end', resolve);
  });

  const data = parseLauncherData(body);
  const growid = data.requestedName || data.tankIDName;
  const password = data.tankIDPass;

  // Cek input
  if (!growid || !password) {
    return res.status(400).send('action|log\nmsg|GrowID atau Password kosong.\n');
  }

  // Daftar user statis sementara (bisa diganti dengan file atau database)
  const users = [
    {
      id: 1,
      growid: "FireWol",
      email: "firewol@example.com",
      passwordHash: "$2a$10$TF5l1zUKePzW6A6t0/3FguYzleXGFiUKeOMgGjW3W0OlZRV2W66q2" // password: test123
    }
  ];

  // Cari user
  const user = users.find(u => u.growid.toLowerCase() === growid.toLowerCase());
  if (!user) {
    return res.send('action|log\nmsg|GrowID tidak ditemukan.\n');
  }

  // Cek password
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.send('action|log\nmsg|Password salah.\n');
  }

  // Jika login berhasil, kirim data sesuai format Growtopia
  const responseText = `
tankIDName|${user.growid}
tankIDPass|${password}
requestedName|${user.growid}
f|1
protocol|229
game_version|4.25
meta|vercel
RTENDMARKERBS1002
`.trim();

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(responseText);
}
