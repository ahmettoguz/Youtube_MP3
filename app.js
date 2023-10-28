const express = require("express");
const app = express();
const yt = require("yt-converter");

const port = 80;
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

function onData() {
  console.log("Downloading 👻");
}

function onClose() {
  console.log("Downloaded 🟩");
}

app.post("/save", (req, res) => {
  const url = req.body.title;

  yt.convertAudio(
    {
      url: url,
      itag: 141,
      directoryDownload: __dirname + "/music/",
    },
    onData,
    onClose
  );
console.log(__dirname);
  res.send("MP3 saved");
});

app.listen(port, () => {
  console.log(`App is running on : http://localhost:${port}`);
});

// url: "https://youtu.be/8Hi4G5nNnQM?list=RD8Hi4G5nNnQM",
