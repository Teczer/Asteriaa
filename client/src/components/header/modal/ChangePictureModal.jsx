import { useState } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import Previews from "./DropZoneImg";
import axios from "axios";

function ChangePictureModal({ setIsChangingProfilePicture }) {
  const { user } = useAuthContext();
  const [changingPicture, setChangingPicture] = useState("");
  const { dispatch } = useAuthContext();

  async function changeUserProfilePicture(e) {
    e.preventDefault();

    if (!changingPicture) return;

    const response = await axios.patch(
      `http://146.59.150.192:5001/user/${user._id}`,
      { profilePicture: changingPicture }
    );

    const afterpatch = await axios.get(
      `http://146.59.150.192:5001/user/${user._id}`
    );

    dispatch({ type: "UPDATE_USER", payload: afterpatch.data });

    console.log("afterpatch", afterpatch);
    console.log("user", user);
    console.log("response.data", response.data);
  }

  // DROPZONE

  const [postImage, setPostImage] = useState({ myFile: "" });

  const createPost = async (newImage) => {
    try {
      await axios.post(`http://146.59.150.192:5001/user/${user._id}`, newImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    console.log("Uploaded");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPostImage({ ...postImage, myFile: base64 });
  };

  return (
    <div className="modal-changepicture-container">
      <div className="selector-profile-picture-container">
        <div className="closebtn-img-wrapper">
          <button
            className="close-user-modal-btn --change-picture"
            onClick={() => setIsChangingProfilePicture(false)}
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
          <figure className="figure-user-profile-picture --change-picture">
            <img
              className="user-profile-picture"
              src={(changingPicture && postImage.myFile) || user.profilePicture}
              alt="user-profil-picture"
            />
          </figure>
        </div>

        <Previews
          setChangingPicture={setChangingPicture}
          handleFileUpload={handleFileUpload}
          handleSubmit={handleSubmit}
        />
        <form
          className="profile-picture-url-form"
          onSubmit={changeUserProfilePicture}
        >
          <label className="label-url-picture">URL</label>
          <div className="input-url-btn-wrapper">
            <input
              type="text"
              onChange={(e) => setChangingPicture(e.currentTarget.value)}
              placeholder="https://exemple-votre-image.fr"
            />
            <button className="url-btn-check" type="submit">
              <i className="fa-solid fa-check" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePictureModal;
