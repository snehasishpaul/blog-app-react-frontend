import React, { useEffect, useRef, useState } from "react";
import NewsFeedCard from "./news-feed/NewsFeedCard";
import useAxios from "../hooks/useAxios";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [pageResponse, setPageResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { myAxios } = useAxios();
  const twiceRef = useRef(false);

  useEffect(() => {
    if (twiceRef.current === false) {
      loadPosts();
    }
    return () => {
      twiceRef.current = true;
    };
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const response = await myAxios.get("/api/v1/postsPaginated");
      console.log(response.data);
      setPageResponse(response.data);
      setPosts(response.data.content);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-4/6">
          <div className="flex justify-between  items-center w-full mb-12">
            <h5>NewsFeed</h5>
            <h5>
              Total Posts :{" "}
              <span className="mx-2">{pageResponse?.totalElements}</span>
            </h5>
          </div>
          {posts.map((post) => (
            <NewsFeedCard key={post.postId} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default NewsFeed;
