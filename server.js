import express from "express";
import videoDetails from "./routes/videoDetails.js"
import cors from "cors";


const app = express();

const PORT = process.env.PORT || 8080; // Default to port 3000 if PORT is not set
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(express.static("public")); // Serve static files from the 'public' folder
app.use(cors({ origin: CORS_ORIGIN })); // Allow cross-origin requests


app.get("/",(req,res) => {
    res.send("Welcome to the API")
})

app.use("/videos", videoDetails)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});