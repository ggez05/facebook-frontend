import axios from "axios";
import React, { useEffect, useState } from "react";
import "./chatonline.css";

const ChatOnline = ({ onlineusers, currentUser, setCurrentchat }) => {
  const [allfriends, setFriends] = useState([]);
  const [onlinefriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getFriendsPageInfos`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        setFriends(data.friends);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentUser.token, currentUser.id]);

  useEffect(() => {
    setOnlineFriends(
      allfriends.filter((elem) => {
        return onlineusers?.includes(elem._id);
      })
    );
  }, [allfriends, onlineusers]);

  return (
    <div className="chatOnline">
      {onlinefriends?.map((f) => {
        return (
          <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
              <img className="chatOnlineImg" src={f.picture} alt="" />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{f.username}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatOnline;
