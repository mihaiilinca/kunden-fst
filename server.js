const express = require("express");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(fileUpload());

app.post("/upload", (req, res) => {
  console.log(req.files);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file was uploaded" }); //error message if no file was uploaded
  }
  const file = req.files.file;
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    //here is the path to the uploaded file
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
