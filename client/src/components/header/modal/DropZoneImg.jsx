import React, { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { convertToBase64 } from "../../../../helpers";
import axios from "axios";

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

const test = {};

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

function Previews({ setChangingPicture, handleFileUpload, handleSubmit }) {
  const [files, setFiles] = useState([]);
  const { user } = useAuthContext();
  const { updateUser } = useAuthContext();

  async function compressImage(file, options) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const { maxWidth, maxHeight } = options;
        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (maxHeight / height) * width;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: options.mimeType }));
          },
          options.mimeType,
          options.quality
        );
      };
      image.onerror = (error) => {
        reject(error);
      };
    });
  }

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: async (acceptedFiles) => {
        const compressedFiles = await Promise.all(
          acceptedFiles.map(async (file) => {
            const compressedFile = await compressImage(file, {
              quality: 0.6,
              maxWidth: 800,
              maxHeight: 800,
              mimeType: "image/jpeg",
            });

            const base64 = await convertToBase64(compressedFile);

            return axios.patch(`http://146.59.150.192:5001/user/${user._id}`, {
              profilePicture: base64,
            });
          })
        );

        try {
          const afterpatch = await axios.get(
            `http://146.59.150.192:5001/user/${user._id}`
          );

          updateUser(afterpatch.data);
        } catch (error) {
          console.log(error);
        }
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
    setDimensions({
      height: naturalHeight,
      width: naturalWidth,
    });
  };
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
