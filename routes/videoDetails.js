import { channel } from "diagnostics_channel";
import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

let imageIndex = 0;

router.get("/", (req, res) => {
  const videos = fs.readFileSync("./data/video-details.json", "utf8");
  res.json(JSON.parse(videos));
});

router.get("/:id", (req, res) => {
  const videos = fs.readFileSync("./data/video-details.json", "utf8");
  const parsedVideos = JSON.parse(videos);
  const foundVideo = parsedVideos.find((video) => video.id === req.params.id);
  res.json(foundVideo);
});

router.post("/", (req, res) => {
  console.log(typeof req.body);
  console.log(req.body);
  const videos = fs.readFileSync("./data/video-details.json", "utf8");
  const parsedVideos = JSON.parse(videos);

  
  console.log(imageIndex);
  
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    image: `http://localhost:8080/images/image${imageIndex}.jpg`,
    description: req.body.description,
    views: 0,
    likes: 0,
    channel: "Renu Video",
    duration: "5:00",
    video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [],
  };
  imageIndex = (imageIndex + 1) % 9;
 
  parsedVideos.push(newVideo);
  fs.writeFileSync("./data/video-details.json", JSON.stringify(parsedVideos));
  res.status(201).json(parsedVideos);
});

export default router;
