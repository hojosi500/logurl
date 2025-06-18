export default function handler(req, res) {
  const serverIP = '127.0.0.1';      // GANTI jika GTPS kamu ada di VPS
  const serverPort = '17091';

  const response = [
    `server|${serverIP}`,
    `port|${serverPort}`,
    'type|1',
    '#maint|Maintenance',
    `meta|name=GTPS Server&ip=${serverIP}&port=${serverPort}&3rd=0`,
    'RTENDMARKERBS1001'
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(response);
}
