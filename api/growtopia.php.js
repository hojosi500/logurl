export default function handler(req, res) {
  const serverIP = '127.0.0.1'; // ganti sesuai IP server GTPS kamu
  const serverPort = '17091';

  const result = [
    `server|${serverIP}`,
    `port|${serverPort}`,
    'type|1',
    '#maint|Maintenance',
    `meta|name=GTPS Server&ip=${serverIP}&port=${serverPort}&3rd=0`,
    'RTENDMARKERBS1001'
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(result);
}
