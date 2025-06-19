export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>GTPS Login</title>
      <style>
        body { font-family: sans-serif; text-align: center; padding-top: 50px; }
        input, button { margin: 10px; padding: 8px; width: 80%; max-width: 300px; }
      </style>
    </head>
    <body>
      <h2>Login GTPS</h2>
      <form method="POST" action="/api/login">
        <input type="text" name="requestedName" placeholder="GrowID" required><br>
        <input type="password" name="tankIDPass" placeholder="Password" required><br>
        <button type="submit">Login</button>
      </form>
    </body>
    </html>
  `);
}
