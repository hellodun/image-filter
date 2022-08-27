import fs from "fs";
import Jimp = require("jimp");

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await Jimp.read(inputURL);
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      return await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}

/**
 * Syntax validation of an image URL.
 * @param url - URL to validate
 * @returns - `true` for an non-empty URL containing a HTTP protocol and a supported image format (jpeg, jpg, gif, png). Otherwise `false`
 */
export function isValidImageUrl(url: string | undefined): boolean {
  if (!url || url.length === 0) {
    return false;
  }
  const protocolPattern = /^https?:\/\/.*\.(jpeg|gif|png|jpg)$/;
  const match = url.match(protocolPattern);
  return match && match.length > 0;
}
