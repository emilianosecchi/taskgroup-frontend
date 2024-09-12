import { createContext, useState, useEffect } from "react";
import { fetchAllPosts } from "../api/jsonplaceholderApi";

export const PostContext = createContext();

export function PostContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const [actionMsgSnackbar, setActionMsgSnackbar] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetchingPosts(true);
      let fetchedPosts = await fetchAllPosts();
      setPosts(fetchedPosts);
      setIsFetchingPosts(false);
    }
    fetchPosts();
  }, []);

  function createPost(post) {
    let allPosts = [...posts, {
      userId: 0,
      id: posts.length + 1,
      title: post.title,
      body: post.body,
    }];
    setPosts(allPosts);
  }

  function deletePost(postId) {
    setPosts(
      posts.filter((p) => {
        return p.id !== postId;
      })
    );
  }
  
  return (
    <PostContext.Provider
      value={{
        posts,
        isFetchingPosts,
        actionMsgSnackbar,
        openSnackbar,
        createPost,
        deletePost,
        setActionMsgSnackbar,
        setOpenSnackbar,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}
