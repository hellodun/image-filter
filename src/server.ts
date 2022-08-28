import bodyParser from "body-parser";
import express from "express";
import * as Util from "./util/util";

(async () => {
  const app = express();

  const port = process.env.PORT || 8082;
  app.use(bodyParser.json());

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  app.get("/filteredimage/", async (req, res) => {
    const { image_url } = req.query;
    if (!image_url) {
      return res.status(400).send(`"image_url" query parameter is required`);
    }
    if (!Util.isValidImageUrl(image_url)) {
      return res
        .status(400)
        .send(
          `Invalid image url provided. Allowed protocols: http, https; Allowed image formats: .jpg,.jpeg,.gif,.png`
        );
    }

    let filteredUrlPath: string | void;
    (res as any).on("finish", () => {
      if (filteredUrlPath) {
        Util.deleteLocalFiles([filteredUrlPath]);
      }
    });

    filteredUrlPath = await Util.filterImageFromURL(image_url).catch((error) =>
      console.error("Image processing failed: ", error)
    );

    if (filteredUrlPath) {
      return res.status(200).sendFile(filteredUrlPath);
    } else {
      return res.status(422).send(`Failed to process image: ${image_url}`);
    }
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
