import './comments.scss';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import moment from 'moment';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Comments = ({ postId }) => {

  //TEMPORARY DATA FOR FRONTEND
  // const comments = [
  //   {
  //     id: 1,
  //     desc: "Lorem ipsum random words just to fill in the blank random words just to fill in the blank random words just to fill in the blank",
  //     name: "John Doe",
  //     userId: 1,
  //     profilePicture:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     desc: "Lorem ipsum dolor  random words just to fill in the blank random words just to fill in the blank random words just to fill in the blank",
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePicture:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  // ];


  const {currentUser} = useContext(AuthContext);
  const [desc, setDesc] = useState('');

  // I will use reactQuery instead of useEffect+Redux
  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );
  // console.log(data);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch aka refresh
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };  


  return (
    <>
      <div className='comments'>
        <div className="write">
          <img src={currentUser.profilePic} alt="" />
          <input type="text" placeholder='write a comment' value={desc} onChange={(e) => setDesc(e.target.value)}/>
          <button onClick={handleClick} >Send</button>
        </div>
        {isLoading 
          ? 'loading'
          : data.map(comment => (
            <div className="comment">
              <img src={comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className='date'>{moment(comment.createdAt).fromNow()}</span>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Comments