import React, { useState } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const MultiUpload = () => {
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("up");
    const formData = new FormData();
    formData.append("bucketname", "dio2014");
    formData.append("file1", file1);
    formData.append("file2", file2);
    axios
      .post("http://localhost:3100/multiupload", formData, {})
      .then((res) => {
        console.log(res);
      });
  };
  const onFileChange1 = (e) => {
    setFile1(e.target.files[0]);
  };
  const onFileChange2 = (e) => {
    setFile2(e.target.files[0]);
  };
  return (
    <div class="container">
      <h1 class="text-center"> Multiple Field File Upload Example</h1>
      <form onSubmit={onSubmit}>
        <div class="form-group">
          <label for="file1">Upload File 1:</label>
          <input
            type="file"
            name="file1"
            id=""
            required
            class="form-control"
            onChange={onFileChange1}
          />
        </div>
        <div class="form-group">
          <label for="file2">Upload File 2:</label>
          <input
            type="file"
            name="file2"
            id=""
            required
            class="form-control"
            onChange={onFileChange2}
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-danger btn-block">
            Upload Files
          </button>
        </div>
      </form>
    </div>
  );
};

export default MultiUpload;
