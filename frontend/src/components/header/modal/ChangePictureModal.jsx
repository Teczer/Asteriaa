import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import Previews from "./DropZoneImg";
import axios from "axios";
import { updateUser } from "../../../../services/UserService";
import { apiURL } from "../../../../services/UserService";

function ChangePictureModal({ setIsChangingProfilePicture }) {
  const { user, updateUserContext } = useAuthContext();
  const [changingPicture, setChangingPicture] = useState("");
  const [isUsingUrl, setIsUsingUrl] = useState(false);

  async function changeUserProfilePicture(e) {
    e.preventDefault();

    if (!changingPicture) return;

    try {
      // Utilisez la fonction updateUser pour mettre à jour l'utilisateur
      const updatedUser = await updateUser(user._id, {
        profilePicture: changingPicture,
      });

      // Mettez à jour le contexte avec les nouvelles données utilisateur
      updateUserContext(updatedUser);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'image de l'utilisateur : ",
        error
      );
    }
  }

  // DROPZONE

  const [postImage, setPostImage] = useState({ myFile: "" });

  const createPost = async (newImage) => {
    try {
      await axios.post(`${apiURL}/user/${user._id}`, newImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPostImage({ ...postImage, myFile: base64 });
  };

  useEffect(() => {
    if (changingPicture.length === 0) {
      setIsUsingUrl(false);
    }
  }, [changingPicture]);

  return (
    <div
      className="modal-changepicture-container"
      onClick={() => setIsChangingProfilePicture(false)}
    >
      <div
        className="selector-profile-picture-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="closebtn-img-wrapper">
          <button
            className="close-user-modal-btn --change-picture"
            onClick={(e) => setIsChangingProfilePicture(false)}
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
              onChange={(e) => {
                setChangingPicture(e.currentTarget.value);
                setIsUsingUrl(true);
              }}
              placeholder="https://exemple-votre-image.fr"
            />
            {isUsingUrl && (
              <button className="url-btn-check" type="submit">
                <i className="fa-solid fa-check" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePictureModal;
