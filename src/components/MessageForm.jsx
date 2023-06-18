import React, { useState } from "react";
import { sendMessage } from "./HelperFunctions";

const MessageForm = ({ postID, author, token }) => {
  const [message, setMessage] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        sendMessage(postID, token, message);
        setMessage("");
      }}
    >
      <label htmlFor="message">Have a question for {author}?</label>
      <input
        className="m-2 text-black"
        required
        type="text"
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      ></input>
      <button type="submit" className="border-green-700 border-2 p-1">
        Send Message
      </button>
    </form>
  );
};

export default MessageForm;
