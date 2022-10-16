import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import chatdp from "../assets/chat-dp.png";
import chaticon from "../assets/chat-icon.png";
import chatclose from "../assets/close.png";
import chatsend from "../assets/send-button.png";
import { addChat, handleChat } from "../redux/slice/chat";

const Chatbot = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [flag, setFlag] = useState(true);
  const [newMessage, setNewMessage] = useState({ message: "", author: true });

  const scrollToBottom = () => {
    try {
      const element = document.getElementById("chats_container");
      element.scrollTop = element.scrollHeight;
    } catch (error) {}
  };

  useEffect(() => {
    scrollToBottom();
    return () => {};
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.message || newMessage.message.trim() === "") {
      return;
    }
    dispatch(addChat(newMessage));
    dispatch(handleChat(newMessage));
    setNewMessage({ message: "", author: true });
  };

  return (
    <div className={`chatbot-wrapper`}>
      {flag ? (
        <div className={`chatbot-toggle-button-wrapper`}>
          <div className="message-container">
            <p>May i help you?</p>
          </div>
          <div
            className="toggle-button-container"
            onClick={() => {
              setFlag(false);
            }}
          >
            <img
              className="H100 W100"
              src={chaticon}
              alt="toggle chat screen"
            />
          </div>
        </div>
      ) : (
        <div className={`chatbot-widget`}>
          <div className="chat-topbar">
            <div className="chatbot-profile-picture-container">
              <img className="H100 W100" src={chatdp} alt="" title="avatar" />
            </div>
            <div className="chatbot-name">Alex</div>
            <div className="chatbot-widget-container">
              <img
                className="H100 W100"
                src={chatclose}
                alt="close chat widget"
                title="close chat widget"
                onClick={() => {
                  setFlag(true);
                }}
              />
            </div>
          </div>
          <div className="chat-allchats-container" id="chats_container">
            {messages.map((message, index) => {
              return message.author ? (
                <div key={index} className="chat-wrapper">
                  <div className="chat send">
                    <p>{message.message}</p>
                  </div>
                </div>
              ) : (
                <div key={index} className="chat-wrapper">
                  <div className="chat recv">
                    {message.message.split("\n").map((msg, index) => {
                      return <p key={index}>{msg}</p>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <form className="chat-message-form-container" onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              placeholder="Enter your query here"
              value={newMessage.message}
              onChange={(e) => {
                setNewMessage({
                  ...newMessage,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <img
              src={chatsend}
              alt="send chat"
              title="send"
              onClick={handleSubmit}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
