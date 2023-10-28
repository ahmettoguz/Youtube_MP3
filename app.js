const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

function onData() {
  console.log("yükleniyor");
}

function onClose() {
  console.log("yüklenme tamam");
}

app.post("/save", (req, res) => {
  const url = req.body.title;

  const yt = require("yt-converter");

  try {
    yt.convertAudio(
      {
        url: url,
        itag: 141,
        directoryDownload: __dirname,
        title: "Your title here",
      },
      onData,
      onClose
    );
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
  }

  res.send("Başlık kaydedildi.");
});

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});
