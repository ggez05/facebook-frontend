import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatOnline from "../../components/chatonline/ChatOnline";
import Conversation from "../../components/Conversations/conversation";
import Header from "../../components/header";
import Message from "../../components/message/Message";
import { io } from "socket.io-client";
import "./style.css";

const Messanger = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineusers, setOnlineUsers] = useState([]);

  const socket = useRef();
  const scrollref = useRef();
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
  }, []);
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("hello", (message) => {
      console.log(message);
    });
    socket.current.on("getUsers", (users) => {
      console.log(users);
      setOnlineUsers(
        users.map((elem) => {
          return elem.userId;
        })
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getConversation`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setConversations(data.conversation);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user?.id]);
  const handlesendMessage = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find((member) => member !== user.id);
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId: receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/message/new`,
        message,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMessages([...messages, res.data.newmess]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getMessages/${currentChat?._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollref?.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <Header />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Seach For Friends"
              className="chatMenuInput"
            ></input>
            {conversations?.map((ele, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setCurrentChat(ele);
                  }}
                  className={`${
                    currentChat?._id === ele?._id ? "addhovertothis" : ""
                  }`}
                >
                  <Conversation conversation={ele} currentUser={user} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((elem, i) => {
                    return (
                      <div key={i} className="" ref={scrollref}>
                        <Message own={elem.sender === user.id} message={elem} />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write a message to your friend ..."
                    className="chatMessageInput"
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handlesendMessage}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a Conversation to chat !
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <h4>Online Friends</h4>
            <ChatOnline
              onlineusers={onlineusers}
              currentUser={user}
              setCurrentchat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messanger;
