import './update.scss';
import React, { useContext, useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from '../../context/authContext';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({setOpenUpdate, user}) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: '',
    city: '', 
    website: '',
  });

  const upload = async (file) => {
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
    setTexts((prev) => ({...prev, [e.target.name]: [e.target.value] }));
  };

  const { currentUser } = useContext(AuthContext);

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

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl = user.coverPic;
    let profileUrl = user.profilePic;

    coverUrl = cover && await upload(cover)
    profileUrl = profile && await upload(profile)

    mutation.mutate({ ...texts, coverPic:coverUrl, profilePic:profileUrl });
    setOpenUpdate(false);
  };


  return (
    <div className='update'>
      Update
      <form>
        <input type="file" />
        <input type="file" />
        <input type="text" name='name' onChange={handleChange}/>
        <input type="text" name='city' onChange={handleChange}/>
        <input type="text" name='website' onChange={handleChange}/>
        <button onClick={handleClick} >Update</button>
      </form>
      <button onClick={setOpenUpdate(false)}>X</button>
    </div>
  )
}

export default Update