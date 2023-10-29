class FunctionClass {
  formatTime(saniye) {
    const saat = Math.floor(saniye / 3600);
    const dakika = Math.floor((saniye % 3600) / 60);
    const kalanSaniye = saniye % 60;

    let sonuc = "";

    if (saat > 0) {
      sonuc += `${saat} saat `;
    }

    if (dakika > 0) {
      sonuc += `${dakika} dakika `;
    }

    if (kalanSaniye > 0 || sonuc === "") {
      sonuc += `${kalanSaniye} saniye`;
    }

    return sonuc.trim();
  }
}

module.exports = FunctionClass;
