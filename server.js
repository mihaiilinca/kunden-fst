const express = require("express");
const fileUpload = require("express-fileupload");
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const app = express();

app.use(fileUpload());

const config = {
  user: "user",
  // Password optional, prompted if none given
  password: "password",
  host: "ftp.someserver.com",
  port: 21,
  localRoot: __dirname + "/local-folder",
  remoteRoot: "/public_html/remote-folder/",
  // include: ["*", "**/*"],      // this would upload everything except dot files
  include: ["*.php", "dist/*", ".*"],
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: [
    "dist/**/*.map",
    "node_modules/**",
    "node_modules/**/.*",
    ".git/**",
  ],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: false,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: false,
};
app.post("/upload", (req, res) => {
  console.log(req.files);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file was uploaded" }); //error message if no file was uploaded
  }
  const file = req.files.file;

  ftpDeploy.deploy(config, function (err, res) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      console.log("finished:", res);
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    }
  });
  // file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
  //   //here is the path to the uploaded file
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).send(err);
  //   }
  //   res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  // });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
