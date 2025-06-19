// index.js

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/player/login/dashboard", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const serverData = `
server|${ip}
port|17091
type|1
#maint|Maintenance
meta|name=GTPS Server&ip=${ip}&port=17091
`;

  res.set("Content-Type", "text/plain");
  res.send(serverData.trim());
});

app.listen(PORT, () => {
  console.log(`GTPS LoginURL listening on port ${PORT}`);
});
