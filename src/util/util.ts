import fs from "fs";
import Jimp = require("jimp");

export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await Jimp.read(inputURL);
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      return await photo
        .resize(256, 256)
        .quality(60)
        .greyscale()
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
export function isValidImageUrl(url: string | undefined): boolean {
  if (!url || url.length === 0) {
    return false;
  }
  const protocolPattern = /^https?:\/\/.*\.(jpeg|gif|png|jpg)$/;
  const match = url.match(protocolPattern);
  return match && match.length > 0;
}
