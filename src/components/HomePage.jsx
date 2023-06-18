import { useEffect, useState } from "react";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import CreatePostForm from "./CreatePostForm";
import { handleDelete, getPostsWithAuth, sendMessage } from "./HelperFunctions";
import MessageForm from "./MessageForm";

const HomePage = () => {
  const { posts, setPosts, isLoggedIn, user, token } = useOutletContext();
  // const [message, setMessage] = useState("")

  useEffect(() => {
    getPostsWithAuth(token, setPosts)
  }, [token]);


  return (
    <>
      {isLoggedIn ? (
        <>
          <h3 className="text-center text-2xl mb-6">Welcome, {user}!</h3>
          <CreatePostForm token={token} posts={posts} setPosts={setPosts} />
        </>
      ) : (
        <h3>
          Please 
          <Link to="/" className="underline">
            login
          </Link> 
          to access all features
        </h3>
      )}
      <div>
        {posts.length &&
          posts.map((post) => {
            return (
              <div className="m-4 border-blue-700 border-2" key={post._id}>
                <h1>
                  {post.title} - {post.price}
                </h1>
                {post.willDeliver ? (
                  <p>DELIVERY AVAILABLE</p>
                ) : (
                  <p>PICKUP REQUIRED</p>
                )}
                <p>{post.description}</p>
                {post.isAuthor ? (
                  <>
                    <button
                      className="border-red-600 border-2"
                      onClick={() => {
                        handleDelete(post._id, token, setPosts);
                      }}
                    >
                      Delete
                    </button>
                    <button className="border-yellow-200 border-2 ml-5">
                      Edit
                    </button>
                  </>
                ) : (
                  <MessageForm token={token} postID={post._id} author={post.author.username}/>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
