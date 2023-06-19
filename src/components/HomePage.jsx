import { useEffect, useState } from "react";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import CreatePostForm from "./CreatePostForm";
import { handleDelete, getPostsWithAuth } from "./HelperFunctions";
import MessageForm from "./MessageForm";

const HomePage = () => {
  const { posts, setPosts, isLoggedIn, user, token } = useOutletContext();
  const [displayForm, setDisplayForm] = useState(false)

  useEffect(() => {
    getPostsWithAuth(token, setPosts)
  }, [token]);


  return (
    <>
      {isLoggedIn ? (
        <div className="text-center">
          <h3 className="text-center text-2xl mb-6 mt-6">Welcome, {user}!</h3>
          {displayForm ? (<CreatePostForm token={token} posts={posts} setPosts={setPosts} setDisplayForm={setDisplayForm}/>) : (
          <button
            className="underline"
            onClick={() => {
              setDisplayForm(true);
            }}
          >
            Make a new listing
          </button>)}
        </div>
      ) : (
        <h3 className="text-center text-2xl mb-6 mt-6">
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
                <div className="m-2">
                  <h1 className="text-xl">
                    {post.title} - {post.price}
                  </h1>
                  <p>Located in: {post.location}</p>
                  {post.willDeliver ? (
                    <p>DELIVERY AVAILABLE</p>
                  ) : (
                    <p>PICKUP REQUIRED</p>
                  )}
                  <p>{post.description}</p>
                  {post.isAuthor ? (
                    <>
                      <button
                        className="border-red-600 border-2 m-1 mt-2 p-1"
                        onClick={() => {
                          handleDelete(post._id, token, setPosts);
                        }}
                      >
                        Delete
                      </button>
                      <button className="border-yellow-200 border-2 ml-5 p-1">
                        Edit
                      </button>
                    </>
                  ) : (
                    <MessageForm
                      token={token}
                      postID={post._id}
                      author={post.author.username}
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
