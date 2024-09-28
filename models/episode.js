import { Schema, model } from "mongoose";

const episodeSchema = new Schema({
  url: String,
});

const Episode = model("Episode", episodeSchema);

export default Episode;
