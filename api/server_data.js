export default function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    "127.0.0.1";

  res.setHeader("Content-Type", "text/plain");
  res.send(
    `server|${ip}\n` +
    `port|17091\n` +
    `loginurl|logurl-beta.vercel.app\n` +
    `#maint|Maintenance\n` +
    `type|1\n` +
    `meta|name=GTPS Server&ip=${ip}&port=17091&3rd=0\n` +
    `RTENDMARKERBS1001\n`
  );
}
