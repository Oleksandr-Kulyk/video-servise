import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import "./config/dbConfig.js";
import handlebarsConfig from "./config/handlebarsConfig.js";
import { bucket } from "./config/cloudStorageConfig.js";
import upload from "./config/multerConfig.js";
import Episode from "./models/episode.js";
import loginRoter from "./routes/loginRoutes.js";
import checkAuth from "./middleware/checkAuth.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.engine("handlebars", engine(handlebarsConfig));
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/login", loginRoter);

app.get("/", (req, res) => res.status(200).render("home"));

app.post("/upload", upload.single("video"), async (req, res) => {
  const blob = bucket.file(req.file.originalname);
  const blobsStream = blob.createWriteStream({
    resumable: false,
  });

  blobsStream.on("finish", async () => {
    const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    const episode = new Episode({ url });
    try {
      const newEpisode = await episode.save();
      return res.status(200).json(episode);
    } catch (e) {
      console.log(e);
    }
  });

  blobsStream.on("error", (error) => console.log(error));

  blobsStream.end(req.file.buffer);
});

app.get("/secure", checkAuth, (req, res) => {
  res.status(200).render("secure");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
