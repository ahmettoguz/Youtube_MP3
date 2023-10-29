const express = require("express");
const app = express();
const fs = require("fs");

const port = 80;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

function onData() {
  console.log("Downloading 👻");
}

function onClose() {
  console.log("Downloaded 🟩");
}

function dow() {}

app.get("/api/save", (req, res) => {
  const url = req.body.title;
  
  res.download("./music/TGC - Dreamers (Embody Remix).mp3");
});

app.post("/save", (req, res) => {
  const url = req.body.title;

  // yt.convertAudio(
  //   {
  //     url: url,
  //     itag: 141,
  //     directoryDownload: __dirname + "/music/",
  //   },
  //   onData,
  //   onClose
  // );

  res.download("./music/TGC - Dreamers (Embody Remix).mp3");

  res.send("MP3 saved");
});

app.get("/indir", (req, res) => {
  const dosyaAdi = "TGC - Dreamers (Embody Remix).mp3";
  const dosyaYolu = __dirname + "/music/" + dosyaAdi;

  fs.readFile(dosyaYolu, (hata, veri) => {
    if (hata) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Dosya bulunamadı.");
    } else {
      res.setHeader("Content-disposition", "attachment; filename=" + dosyaAdi);
      res.setHeader("Content-type", "audio/mpeg");
      res.end(veri);
    }
  });
});

app.listen(port, () => {
  console.log(`App is running on : http://localhost:${port}`);
});

// url: "https://youtu.be/8Hi4G5nNnQM?list=RD8Hi4G5nNnQM",
