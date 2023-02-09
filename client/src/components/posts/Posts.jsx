import './posts.scss';
import Post from '../post/Post'; 
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Posts = () => {


  //TEMPORARY INFO FOR FRONTEND
  // const posts = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     userId: 1,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Lorem ipsum gibberish talk continues to do nothing",
  //     img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Lorem ipsum gibberish talk continues to do nothing Lorem ipsum gibberish talk continues to do nothing",
  //   },
  // ];

  // I will use reactQuery instead of useEffect+Redux
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );
  // console.log(data)

  return (
    <div className='posts'>
      {error 
        ? 'Something went wrong with getting posts!'
        : isLoading
        ? 'loading'
        : data.map((post) => <Post post={post} key={post.id} /> )
      }
    </div>
  );
};

export default Posts;