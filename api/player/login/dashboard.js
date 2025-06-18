export default function handler(req, res) {
  const ip = '127.0.0.1'; // atau IP GTPS kamu
  const port = '17091';

  const response = [
    `server|${ip}`,
    `port|${port}`,
    'type|1',
    '#maint|Maintenance',
    `meta|name=GTPS Server&ip=${ip}&port=${port}&3rd=0`,
    'RTENDMARKERBS1001'
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(response);
}
