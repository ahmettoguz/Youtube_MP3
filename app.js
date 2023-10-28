const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;
let fileName;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/save", (req, res) => {
  const title = req.body.title;
  fileName = title;
  console.log(req);

  fs.writeFileSync(fileName, title);

  res.send("Başlık kaydedildi.");
});

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});
