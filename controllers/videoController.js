const { Video } = require('../models')
const fs = require("fs");
module.exports.index = async (req, res) => {
    try {
        const data = await Video.findAll()
        res.render('pages/index', {
            data: data
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports.playing = async (req, res) => {
    try {
        const { id } = req.params
        let data = await Video.findByPk(id)
        data = JSON.stringify(data)
        res.render('pages/playing', {
            data
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports.video = async (req, res) => {
    try {
        const { id } = req.params
        let payload = JSON.parse(id)
        // const video = await Video.findByPk(payload.id)
        // Ensure there is a range given for the video
        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range header");
        }
        const videoPath = 'files/' + payload.video_path;
        const videoSize = fs.statSync(videoPath).size;

        // Parse Range
        // Example: "bytes=32324-"
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        // Create headers
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);

        // create video read stream for this particular chunk
        const videoStream = fs.createReadStream(videoPath, { start, end });

        // Stream the video chunk to the client
        videoStream.pipe(res);
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports.login = async (req, res) => {
    try {
        res.render('admin-panel/login');
    } catch (error) {
        res.status(400).send(error.message)
    }
}