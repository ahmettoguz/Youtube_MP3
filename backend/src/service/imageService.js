const fs = require("fs");
const NodeID3 = require("node-id3");
const sharp = require("sharp");

class ImgService {
  embedCoverPage(mp3FilePath, albumCoverPath) {
    console.log(mp3FilePath, albumCoverPath);

    try {
      // Read the MP3 file
      const mp3Buffer = fs.readFileSync(mp3FilePath);

      // Read the album cover image
      const albumCoverBuffer = fs.readFileSync(albumCoverPath);

      // Attach the album cover to the MP3 file
      const updatedMP3Buffer = NodeID3.write(
        {
          APIC: albumCoverBuffer, // Attach the album cover
        },
        mp3Buffer
      );

      // Write the updated MP3 file
      fs.writeFileSync(mp3FilePath, updatedMP3Buffer);
    } catch (error) {
      return false;
    }
    return true;
  }

  async convertWebpToPng(webpFilePath, pngFilePath) {
    // Read the WebP file using a Promise
    const webpBuffer = await new Promise((resolve) => {
      fs.readFile(webpFilePath, (err, data) => {
        if (err) {
          resolve({ status: false, data: err });
        } else {
          resolve({ status: true, data: data });
        }
      });
    });

    if (!webpBuffer.status) {
      return false;
    }

    // Convert WebP to PNG
    await sharp(webpBuffer.data).png().toFile(pngFilePath);
    return true;
  }
}

const imgService = new ImgService();
module.exports = imgService;
