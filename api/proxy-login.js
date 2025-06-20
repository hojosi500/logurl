export default async function handler(req, res) {
  const { growid, password } = req.body;
  const gtpsIp = "IP_GTPS_KAMU";

  const response = await fetch(`http://${gtpsIp}:17091`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `tankid=${growid}&password=${password}`,
  });

  const text = await response.text();
  res.status(200).send(text);
}
