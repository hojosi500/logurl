// File: api/player/login/dashboard.js

export default function handler(req, res) {
  const dialog = `
add_label_with_icon|big|GTPS Login|left|6016|
add_text_input|tankid|GrowID||0|
add_text_input|password|Password||1|
add_button|login|Login|noflags|
add_quick_exit|
end_dialog|gtps_login
`;

  res.status(200).send(dialog.trim());
}
