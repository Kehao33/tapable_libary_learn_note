
const express = require("express");

const app = express();

app.get("/api/user", (req, res) => {
  res.json({ name: "jakequc" })
})

app.listen(3000, () => {
  console.log('running at http://localhost:3000')
})