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
}

const commonService = new CommonService();
module.exports = commonService;
