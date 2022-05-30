import { useRef, useState } from "react";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3, CreateBucketCommand } from "@aws-sdk/client-s3";
import axios from "axios";
import "antd/dist/antd.css";
import { List } from "antd";

const config = {
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: "AKIAZ4VEHXXIIPEOUA54",
    secretAccessKey: "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",
  },
};
const client = new S3Client({ ...config });

const S3test = () => {
  const [data, setData] = useState();
  const [cdndata, setCdndata] = useState();
  const fileInput = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileInput.current.files[0];
    const newFileName = fileInput.current.files[0].name;
    let prefix = "temp2/";
    //if (prefix !== "" && !prefix) prefix += "/";
    console.log(file, newFileName);

    const target = {
      Bucket: "dio2014",
      Folder: prefix,
      Key: `${prefix}${newFileName}`,
      Body: file,
      ContentDisposition: "inline",
      ContentType: file.type,
    };
    try {
      const parallelUploads3 = new Upload({
        client: client, //new S3({ ...config }),
        leavePartsOnError: false, // optional manually handle dropped parts
        params: target,
      });

      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });

      parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmitNode = (e) => {
    e.preventDefault();
    const file = fileInput.current.files[0];
    const newFileName = fileInput.current.files[0].name;
    let prefix = "temp2/";

    console.log(file, newFileName);

    let formData = new FormData();
    formData.append("file", file);
    const options = {
      url: "http://localhost:3100/upload",
      method: "POST",
      data: formData,
    };
    const response = axios(options).then((response) =>
      console.log(response.statusText)
    );
  };
  // const getObj = () => {
  //   const bucketParams = {
  //     Bucket: "dio2014",
  //   };
  //   axios.post(`http://localhost:3100/s3`).then((res) => {
  //     console.log(res);
  //   });

  //   // (async function () {
  //   //   try {
  //   //     const data = await client.send(new CreateBucketCommand(bucketParams));
  //   //     console.log("Success", data);
  //   //   } catch (err) {
  //   //     console.log("Error", err);
  //   //   }
  //   // })();
  // };
  const prefix = "https://dio2014.s3.ap-northeast-2.amazonaws.com/";
  const getObj123 = async (e) => {
    console.log("submitted");
    e.preventDefault();
    let msg;
    axios
      .post(`http://localhost:3100/s3list`, {
        region: "ap-northeast-2",
        bucketname: "dio2014",
      })
      .then(function (response) {
        const dt = response.data.Contents;
        setData(dt);
        console.log("response.data:  ", dt);
      })
      .catch(function (error) {
        console.log("err:  ", error);
      });
  };
  function isValidImageURL(str) {
    if (typeof str !== "string") return false;
    return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
  }
  return (
    <>
      <div className="App">
        <h2>s3 upload test</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Upload file: <br />
          </label>
          <input type="file" ref={fileInput} />
          <br />
          <button type="submit"> Upload </button>
        </form>

        <button onClick={getObj123}> List </button>
        <div
          style={{
            width: 500,
            position: "absolute",
            left: "30%",
            marginTop: 30,
          }}
        >
          {data && (
            <List
              size="small"
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  {isValidImageURL(item.Key) && (
                    <img
                      width={60}
                      src={`${prefix}${item.Key}`}
                      style={{ marginRight: 10 }}
                      alt=""
                    />
                  )}
                  <a href={`${prefix}${item.Key}`} target="child">
                    {item.Key}
                  </a>
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
      <div>
        {cdndata && (
          <List
            size="small"
            header={<div>CDN</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={cdndata}
            renderItem={(item) => (
              <List.Item>
                {isValidImageURL(item.Key) && (
                  <img
                    width={60}
                    src={`${prefix}${item.Key}`}
                    style={{ marginRight: 10 }}
                  />
                )}
                {item.Key}
              </List.Item>
            )}
          />
        )}
      </div>
    </>
  );
};

export default S3test;
