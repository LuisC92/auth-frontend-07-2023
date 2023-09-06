import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import Avatar from "@mui/material/Avatar";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import editProfileSchema from "../schemas/profile-schema";

import { storage } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
  });

  const editProfileInfo = (data) => {
    if (data.image[0]) {
      const profileImage = data.image[0];

      const imageRef = ref(storage, `${uuid()}-profile-picture-${user.id}`);

      //    console.log(profileImage);
      //    console.log(imageRef);
      uploadBytes(imageRef, profileImage)
        .then(() => {
          getDownloadURL(imageRef)
            .then((downloadImageUrl) => {
              setUrl(downloadImageUrl);
              //! UPDATE DB WITH API.POST
              setUser((prevUser) => ({ ...prevUser, ...data }));
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    } else {
      delete data.image;
      //! UPDATE DB WITH API.POST
      setUser((potatoes) => ({ ...potatoes, ...data }));
      //   setUser({ ...user, ...data });
    }
    setEditing(false);
  };

  return (
    <div>
      <h1>Profile</h1>
      {editing ? (
        <form onSubmit={handleSubmit(editProfileInfo)}>
          <div>
            <label>Profile Picture:</label>
            <br />
            <input type="file" {...register("image")} />
            {errors.image && <p>{errors.image?.message}</p>}
            <br />
            <label>Email:</label>
            <br />

            <input
              placeholder="email"
              type="email"
              {...register("email", { required: "email is required" })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p>{errors.email?.message}</p>}
            <br />
            <button type="submit">Save Changes</button>
          </div>
        </form>
      ) : (
        <>
          <Avatar
            src={url ? url : user.image ? user.image : null}
            sx={{ width: 150, height: 150 }}
          />
          <br />
          {user.email ? (
            <div>
              <strong>Email:</strong>
              {user.email}
            </div>
          ) : null}
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
};

export default Profile;
