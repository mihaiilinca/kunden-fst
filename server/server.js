const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "public"); //folder
  },
  filename: (request, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname); //filename
  },
});

const upload = multer({ storage }).array("file");

app.post("/upload", (request, response) => {
  upload(request, response, (error) => {
    if (error) {
      return response.status(500).json(error);
    }
    return response.status(200).send(request.files);
  });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
