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

  ftp.upload(
    file.tempFilePath,
    `/${customConfig["serverDirPath"]}/${file.name}`,
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        res.json({
          fileName: file.name,
          filePath: `${customConfig["serverDirPath"]}/${file.name}`,
        });
      }
      ftp.close();
    }
  );
});

const PORT = process.env.PORT || customConfig["serverPort"];
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
