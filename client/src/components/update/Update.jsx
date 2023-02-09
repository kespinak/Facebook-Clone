import './update.scss';
import React, { useContext, useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from '../../context/authContext';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({ setOpenUpdate, user }) => {
  const { currentUser } = useContext(AuthContext);
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const upload = async (file) => {
    // console.log(file)
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );
  // console.log('user from Update.jsx...go to profile/1 and update', user);
  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: need to find a better way to get img URL
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;
    // console.log("coverUrl from Update.jsx", coverUrl);

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };


  return (
    <div className='update'>
      Update
      <form>
        <input type="file" onChange={e => setCover(e.target.files[0])} />
        <input type="file" onChange={e => setProfile(e.target.files[0])} />
        <input type="text" name='name' onChange={handleChange}/>
        <input type="text" name='city' onChange={handleChange}/>
        <input type="text" name='website' onChange={handleChange}/>
        <button onClick={handleClick} >Update</button>
      </form>
      <button onClick={setOpenUpdate(false)}>X</button>
    </div>
  )
  // return (
  //   <div className="update">
  //     <div className="wrapper">
  //       <h1>Update Your Profile</h1>
  //       <form>
  //         <div className="files">
  //           <label htmlFor="cover">
  //             <span>Cover Picture</span>
  //             <div className="imgContainer">
  //               <img
  //                 src={
  //                   cover
  //                     ? URL.createObjectURL(cover)
  //                     : "/upload/" + user.coverPic
  //                 }
  //                 alt=""
  //               />
  //               <CloudUploadIcon className="icon" />
  //             </div>
  //           </label>
  //           <input
  //             type="file"
  //             id="cover"
  //             style={{ display: "none" }}
  //             onChange={(e) => setCover(e.target.files[0])}
  //           />
  //           <label htmlFor="profile">
  //             <span>Profile Picture</span>
  //             <div className="imgContainer">
  //               <img
  //                 src={
  //                   profile
  //                     ? URL.createObjectURL(profile)
  //                     : "/upload/" + user.profilePic
  //                 }
  //                 alt=""
  //               />
  //               <CloudUploadIcon className="icon" />
  //             </div>
  //           </label>
  //           <input
  //             type="file"
  //             id="profile"
  //             style={{ display: "none" }}
  //             onChange={(e) => setProfile(e.target.files[0])}
  //           />
  //         </div>
  //         <label>Email</label>
  //         <input
  //           type="text"
  //           value={texts.email}
  //           name="email"
  //           onChange={handleChange}
  //         />
  //         <label>Password</label>
  //         <input
  //           type="text"
  //           value={texts.password}
  //           name="password"
  //           onChange={handleChange}
  //         />
  //         <label>Name</label>
  //         <input
  //           type="text"
  //           value={texts.name}
  //           name="name"
  //           onChange={handleChange}
  //         />
  //         <label>Country / City</label>
  //         <input
  //           type="text"
  //           name="city"
  //           value={texts.city}
  //           onChange={handleChange}
  //         />
  //         <label>Website</label>
  //         <input
  //           type="text"
  //           name="website"
  //           value={texts.website}
  //           onChange={handleChange}
  //         />
  //         <button onClick={handleClick}>Update</button>
  //       </form>
  //       <button className="close" onClick={() => setOpenUpdate(false)}>
  //         close
  //       </button>
  //     </div>
  //   </div>
  // );
}

export default Update