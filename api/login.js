import bcrypt from 'bcryptjs';

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseLauncherData(raw) {
  const parsed = {};
  const lines = raw.split('\n');
  for (const line of lines) {
    const [key, value] = line.split('|');
    if (key && value) parsed[key] = value;
  }
  return parsed;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  let body = '';
  await new Promise((resolve) => {
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', resolve);
  });

  const data = parseLauncherData(body);
  const growid = data.requestedName || data.tankIDName;
  const password = data.tankIDPass;

  const users = [
    {
      id: 1,
      growid: "FireWol",
      email: "firewol@example.com",
      passwordHash: "$2a$10$abcDEF1234567890..." // hash valid
    }
  ];

  const user = users.find(u => u.growid.toLowerCase() === growid?.toLowerCase());
  if (!user) return res.send('action|log\nmsg|GrowID tidak ditemukan.\n');

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.send('action|log\nmsg|Password salah.\n');

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
