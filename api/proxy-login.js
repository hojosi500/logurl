export default async function handler(req, res) {
  const { growid, password } = req.body;
  const gtpsUrl = "https://bc12-2404-8000-1048-bea-dd0f-d53d-8494-c9fb.ngrok-free.app";

  try {
    const response = await fetch(gtpsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `tankid=${encodeURIComponent(growid)}&password=${encodeURIComponent(password)}`
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (err) {
    console.error("Gagal konek ke GTPS:", err);
    res.status(500).send("Gagal konek ke GTPS.");
  }
}
