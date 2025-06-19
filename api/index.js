module.exports = (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection?.remoteAddress ||
    "127.0.0.1";

  const serverData = `
server|${ip}
port|17091
type|1
#maint|Maintenance
meta|name=GTPS Server&ip=${ip}&port=17091
  `;

  res.setHeader("Content-Type", "text/plain");
  res.end(serverData.trim());
};
