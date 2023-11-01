const express = require("express");
const app = express();
const fs = require("fs");
const yt = require("yt-converter");

const FunctionClass = require("./src/js/functions.js");
const functions = new FunctionClass();

const port = 80;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// function getInfo(url) {
//   yt.getInfo(url).then((info) => {
//     return {
//       songName: info.title,
//       imgUrl: info.thumbnails[info.thumbnails.length - 1].url,
//       songLength: functions.formatTime(info.lengthSeconds),
//     };
//   });
// }

function getInfo(url) {
  return yt.getInfo(url).then((info) => {
    return {
      songName: info.title,
      imgUrl: info.thumbnails[info.thumbnails.length - 1].url,
      songLength: functions.formatTime(info.lengthSeconds),
    };
  });
}

app.get("/", (req, res) => {
  const getInfoPromise = getInfo("https://youtu.be/shr16M_1qu8?list=LL");

  Promise.all([getInfoPromise])
    .then(([inf]) => {
      console.log(inf);
      res.sendFile(__dirname + "/index.html");
    })
    .catch((error) => {
      console.error("Error handling request:", error);
      res.status(500).send("An error occurred.");
    });

  console.log("promisi beklemeli");
});

app.get("/getInfo", (req, res) => {
  const url = req.query.url;
  return getInfo(url);

  // https://youtu.be/shr16M_1qu8?list=LL
  // getInfo(url)
  //   .then(function (r) {
  //     console.log(r);
  //   })
  //   .catch((error) => {
  //     console.error("Error handling request:", error);
  //   });
});

// app.get("/", (req, res) => {
//   const inf = getInfo("https://youtu.be/shr16M_1qu8?list=LL");

//   setInterval(() => {
//     console.log(inf);
//   }, 1000);
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/api/save", (req, res) => {
  const url = req.body.title;
  res.download("./music/TGC - Dreamers (Embody Remix).mp3");
});

app.get("/save", (req, res) => {
  const url = req.body.title;

  ytdl("http://www.youtube.com/watch?v=A02s8omM_hI").pipe(
    fs.createWriteStream("video.flv")
  );

  res.send("MP3 servera yüklendi");
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
