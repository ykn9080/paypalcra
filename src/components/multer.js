import React, { useState } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Multer = () => {
  const [profile, setProfile] = useState();

  const onFileChange = (e) => {
    setProfile(e.target.files[0]);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bucketname", "dio2014");
    formData.append("file", profile);
    axios.post("http://localhost:8989/upload", formData, {}).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="container">
      <div className="row">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="file" onChange={onFileChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Multer;
