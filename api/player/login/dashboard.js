export default function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    "127.0.0.1";

  const serverData = `
server|${ip}
port|17091
type|1
#maint|Maintenance
meta|name=GTPS Server&port=17091&ip=${ip}
`;

  res.status(200).send(serverData.trim());
}
