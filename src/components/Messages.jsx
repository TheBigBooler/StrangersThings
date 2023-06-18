import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
const URL = "https://strangers-things.herokuapp.com/api/2303-ftb-mt-web-pt";

const Messages = () => {
  const { token } = useOutletContext();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(getMessages)
  }, [token]);

  const getMessages = async () => {
    try {
      const response = await fetch(`${URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result.data.messages);
      return result.data.messages
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        {messages.length && messages.map((message) => {
            return (
                <>
                <p key={message._id}>{message.content}</p>
                </>
            )
        })}
    </div>
      
    
  );
};

export default Messages;
