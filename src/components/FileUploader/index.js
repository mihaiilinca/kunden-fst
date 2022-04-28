import { useState } from "react";
import "./style.css";
import axios from "axios";

export const FileUploader = ({}) => {
  const [files, setFiles] = useState([]);
  const changeOnInput = (e) => {
    setFiles(e.target.files); //save all files
  };

  const onSubmit = (e) => {
    e.preventDefault(); //stop page from refreshing
    const data = new FormData();
    for (const element of files) {
      console.log(element);
      var file_extension = element.name.split(".").pop();
      data.append("file", element);
    }
    axios
      .post("http://localhost:3001/upload", data)
      .then((e) => {
        console.log("Success!");
      })
      .catch((e) => {
        console.error("Error", e);
      });
  };

  return (
    <form method="post" action="#" id="#" onSubmit={onSubmit}>
      <div className="form-group files">
        <label>Upload Your File </label>
        <input
          type="file"
          onChange={changeOnInput}
          className="form-control"
          multiple
        />
      </div>
      <button>Submit</button>
    </form>
  );
};
