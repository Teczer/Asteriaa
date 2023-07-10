import React, { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { convertToBase64 } from "../../../../helpers";
import axios from "axios";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const test = {
  //   width: 200,
  //   height: 200,
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#007bff",
  color: "#007bff",
};

const rejectStyle = {
  borderColor: "#ff1744",
  color: "#ff1744",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
  objectFit: "cover",
};

function Previews(props) {
  const { user } = useAuthContext();
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: async (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );

        const base64 = await convertToBase64(files);
        console.log("base64", base64);

        const response = await axios.patch(
          `http://146.59.150.192:5001/user/${user._id}`,
          { profilePicture: base64 }
        );

        const afterpatch = await axios.get(
          `http://146.59.150.192:5001/user/${user._id}`
        );

        dispatch({ type: "UPDATE_USER", payload: afterpatch.data });

        console.log("afterpatch", afterpatch);
        console.log("user", user);
        console.log("response.data", response.data);
      },
    });

  const dragAndDropContainerStyle = useMemo(
    () => ({
      ...test,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const [dimensions, setDimensions] = useState(null);

  const onImgLoad = ({ target: { naturalHeight, naturalWidth } }) => {
    // console.log("je suis le height", e.target.naturalHeight);
    // console.log("je suis le width", e.target.naturalWidth);
    setDimensions({
      height: naturalHeight,
      width: naturalWidth,
    });
  };
  // console.log("je suis les dimensions", dimensions);
  const thumbs = files.map((file) => (
    <div
      style={{
        ...thumb,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      }}
      key={file.name}
    >
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={(e) => {
            onImgLoad(e);
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  const filepath = files.map((file) => (
    <li key={file.path}>
      <div>
        {file.path} - {formatBytes(file.size)}
      </div>
      {dimensions && (
        <div>
          {dimensions.width} x {dimensions.height}
        </div>
      )}
    </li>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section
      className="container label-dropzone-builder --overidemui"
      style={dragAndDropContainerStyle}
    >
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="">
          Déposez une nouvelle image ici ou cliquez pour sélectionner les
          fichiers à télécharger.
        </p>
        <aside className="img-dropzones">{thumbs}</aside>
        <ul
          style={{
            listStyle: "none",
            color: "white",
            fontSize: "14px",
          }}
        >
          {filepath}
        </ul>
      </div>
    </section>
  );
}
<Previews />;
export default Previews;
