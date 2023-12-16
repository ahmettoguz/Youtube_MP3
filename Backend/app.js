const express = require("express");
const app = express();
const fs = require("fs");

const appService = require("./src/js/service.js");
const expressHelper = require("./src/js/expressHelper.js");

const port = 80;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");
  res.header("X-Content-Type-Options", "nosniff");
  next(); // Bir sonraki middleware işlevini çağır
});

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// ----------------------------------------------------------------------------
app.get("/", (req, res) => {
  const getInfoPromise = appService.getUrlInfo(
    "https://youtu.be/shr16M_1qu8?list=LL"
  );

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

app.post("/getUrlInfo", async (req, res) => {
  const url = req.body.url;
  const data = await appService.getUrlInfo(url, res);

  // check result
  if (data.status === false) {
    return expressHelper.returnFailMessage(res, 400, data.errorMessage);
  }

  return expressHelper.returnSuccessMessage(
    res,
    "Video information found.",
    data
  );
});

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
