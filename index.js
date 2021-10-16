const Jimp = require('jimp');
const tumult = require('tumult')

const simplex2 = new tumult.Simplex2()

const sizeX = 800
const sizeY = 500

const rm = -1
const rx = 1

const tm = 0
const tx = 255

const octaveX = 250
const octaveY = 150

const toBiome = (value) => {
  if (value < 35) { // water
    return Jimp.rgbaToInt(57, 115, 255, 255)
  } else if (value < 50) { // water
    return Jimp.rgbaToInt(245, 255, 192, 255)
  } else if (value < 100) { // water
    return Jimp.rgbaToInt(160, 255, 101, 255)
  } else if (value < 200) { // water
    return Jimp.rgbaToInt(35, 62, 18, 255)
  } else if (value < 210) { // water
    return Jimp.rgbaToInt(128, 130, 127, 255)
  } else if (value < 215) { // water
    return Jimp.rgbaToInt(220, 220, 220, 255)
  } else if (value <= 255) { // water
    return Jimp.rgbaToInt(255, 255, 255, 255)
  } else {
    return Jimp.rgbaToInt(value, value, value, 1)
  }
}

let image = new Jimp(sizeX, sizeY, function (err, image) {
  if (err) throw err;

  for (let x = 0; x < sizeX; x++) {
    for (let y = 0; y < sizeY; y++) {
      const m = simplex2.gen(x / octaveX, y / octaveY)
      const normalized = Math.round(((m - rm) / (rx - rm)) * (tx - tm) + tm)
      const hex = toBiome(normalized)
      image.setPixelColor(hex, x, y);
    }
  }

  image.write('test.png', (err) => {
    if (err) throw err;
  });
});
