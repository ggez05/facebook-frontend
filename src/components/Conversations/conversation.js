import axios from "axios";
import React, { useEffect, useState } from "react";
import "./convstyle.css";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setuser] = useState();
  useEffect(() => {
    const friendid = conversation?.members.find((m) => m !== currentUser?.id);
    const getfriend = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/findUserbyid/${friendid}`
        );
        setuser(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getfriend();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img src={user?.picture} className="conversationImg" alt="" />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;
