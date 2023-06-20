const URL = "https://strangers-things.herokuapp.com/api/2303-ftb-mt-web-pt";

const handleDelete = async (postID, authToken, setFunction) => {
  try {
    const response = await fetch(`${URL}/posts/${postID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    getPostsWithAuth(authToken, setFunction);
  }
};

async function getPostsWithAuth(authToken, setFunction) {
  try {
    const request = await fetch(`${URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const response = await request.json();
    console.log(response);
    setFunction(response.data.posts);
    return response.data.posts;
  } catch (error) {
    console.error(error);
  }
}

const sendMessage = async (postID, authToken, message) => {
  if (!authToken) {
    return alert("You must sign in before sending a message");
  }
  try {
    const response = await fetch(`${URL}/posts/${postID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        message: {
          content: message,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
    alert("Message failed")
  }
};

export { handleDelete, getPostsWithAuth, sendMessage };

// old function that were remade into helpers

// async function getPosts() {
//   try {
//     const request = await fetch(`${URL}/posts`);
//     const response = await request.json();
//     setPosts(response.data.posts);
//   } catch (error) {
//     console.log(error);
//   }
//   console.log(posts);
// }

// async function getPostsWithAuth() {
//   try {
//     const request = await fetch(`${URL}/posts`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const response = await request.json();
//     console.log(response)
//     setPosts(response.data.posts);
//   } catch (error) {
//     console.error(error);
//   }
// }
