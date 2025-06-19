export default async function handler(req, res) {
  const host = req.headers.host;
  const httpBase = `https://${host}`; // vercel uses HTTPS

  const responseText = `
server|127.0.0.1
port|17091
loginurl|${httpBase}/api/login

#maint|Maintenance
type|1
meta|name=GTPS Server&ip=127.0.0.1&port=17091&3rd=0
RTENDMARKERBS1001
`.trim();

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(responseText);
}
