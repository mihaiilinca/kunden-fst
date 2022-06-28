const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
var EasyFtp = require("easy-ftp");
var ftp = new EasyFtp();

var config = {
  host: "127.0.0.1",
  type: "FTP",
  port: "",
  username: "Naj",
  password: "",
};

ftp.connect(config);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    preserveExtension: true,
  })
);

app.post("/upload", (req, res) => {
  console.log(req.files);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file was uploaded" }); //error message if no file was uploaded
  }

  const file = req.files.file;
  const tempFileName = file.tempFilePath.split("/").at(-1);

  ftp.upload(file.tempFilePath, "/test", function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      // console.log("finished:", res);
      res.json({ fileName: file.name, filePath: `/test/${file.name}` });
    }
    // ftp.mv(`/test/${tempFileName}`, "/abc.pdf", function (error) {
    // if (error) throw error;
    // });
    ftp.close();
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
