import React, { Fragment, useState } from "react";
import axios from "axios";
import Message from "./Message";
import Progress from "./Progress";

const FileUpload = () => {
  //actual file and filename should go into state because the label "Choose File" needs to be replaced with the actual filename

  const [files, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File...");
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercent, setUploadPercent] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    let x = [];
    for (let file of e.target.files) {
      x.push(file.name);
    }
    setFilename(x);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //add the file to form data
    const formData = new FormData();
    formData.append("file", files);
    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        //progress bar for upload
        onUploadProgress: (progressEvent) => {
          setUploadPercent(
            parseInt(
              //get rid of progress bar after 10 seconds of finished upload
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          setTimeout(() => setUploadPercent(0), 1000);
        },
        //clear loaded percentage bar
      });
      const { fileName, filePath } = response.data;

      setUploadedFiles({ fileName, filePath });
      setMessage("File uploaded successfully");
    } catch (error) {
      if (error.response.status === 500) {
        setMessage("There was a problem with the server, please try again.");
      } else {
        setMessage(error.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
            multiple
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <Progress percentage={uploadPercent} />
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {/* {uploadedFiles ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFiles.fileName}</h3>
          </div>
        </div>
      ) : null} */}
    </Fragment>
  );
};

export default FileUpload;
