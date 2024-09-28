import dotenv from "dotenv";
import { Storage } from "@google-cloud/storage";

dotenv.config();

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEY_FILENAME,
});

const bucket = storage.bucket(process.env.BUCKET_NAME);

export { storage, bucket };
