class CommonService {
  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = "";

    if (hours > 0) {
      result += `${hours} hours `;
    }

    if (minutes > 0) {
      result += `${minutes} minutes `;
    }

    if (remainingSeconds > 0 || result === "") {
      result += `${remainingSeconds} seconds`;
    }

    return result.trim();
  }

  generateRandomWord() {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let randomWord = "";

    while (randomWord.length < 6) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);

      randomWord += randomChar;
    }

    // add ms
    randomWord += "_" + String(Date.now()).slice(-5);

    return randomWord;
  }

  getHeaderValue(req, headerKey) {
    return req.headers[headerKey];
  }

  sleep(ms) {
    // await commonService.sleep(3000);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

const commonService = new CommonService();
module.exports = commonService;
