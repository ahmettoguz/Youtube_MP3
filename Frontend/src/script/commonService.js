class CommonService {
  async waitUntil(condition, maxTimeout, interval) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      function checkCondition() {
        if (condition()) {
          resolve(true);
        } else if (Date.now() - startTime > maxTimeout) {
          resolve(false);
        } else {
          setTimeout(checkCondition, interval);
        }
      }

      checkCondition();
    });
  }

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
}

const commonService = new CommonService();
export default commonService;
