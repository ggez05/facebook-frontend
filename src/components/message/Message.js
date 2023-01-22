import React from "react";
import Moment from "react-moment";
import "./message.css";

const Message = ({ own, message }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        <Moment fromNow interval={60000}>
          {message.createdAt}
        </Moment>
      </div>
    </div>
  );
};

export default Message;
