const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const EasyFtp = require("easy-ftp");
const ftp = new EasyFtp();
const fs = require("fs");
const yaml = require("js-yaml");
const customConfig = yaml.load(fs.readFileSync("./custom_config.yaml"));

const config = {
  host: customConfig["host"],
  type: customConfig["type"],
  port: customConfig["port"],
  username: customConfig["username"],
  password: customConfig["host"],
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

  ftp.upload(file.tempFilePath, `/test/${file.name}`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      // console.log("finished:", res);
      res.json({ fileName: file.name, filePath: `/test/${file.name}` });
    }
    ftp.close();
  });
});

const PORT = process.env.PORT || customConfig["serverPort"];
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
