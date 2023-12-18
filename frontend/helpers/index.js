import { apiURL } from "../services/UserService";

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

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

      return axios.patch(`${apiURL}/user/${user._id}`, {
        profilePicture: base64,
      });
    })
  );

  try {
    const responses = await Promise.all(compressedFiles);
    const afterpatch = await axios.get(`${apiURL}/user/${user._id}`);

    dispatch({ type: "UPDATE_USER", payload: afterpatch.data });

    console.log("afterpatch", afterpatch);
    console.log("user", user);
    console.log("responses", responses);
  } catch (error) {
    console.log(error);
  }
};

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
