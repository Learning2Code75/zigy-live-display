import React, { useState } from "react";
import { useContext } from "react";
import { MessagesContext } from "../App";
import io from "socket.io-client";
import { useEffect } from "react";
const socket = io.connect("http://localhost:3001");

const Display = () => {
  //   const {  setMessages } = useContext(MessagesContext);
  const [msgs, setMsgs] = useState([
    {
      id: "1",
      msg: "",
      placeholder: "Name",
    },
    {
      id: "2",
      msg: "",
      placeholder: "Email",
    },
    {
      id: "3",
      msg: "",
      placeholder: "Phone Number",
    },
    {
      id: "4",
      msg: "",
      placeholder: "Address",
    },
    {
      id: "5",
      msg: "",
      placeholder: "Age",
    },
    {
      id: "6",
      msg: "",
      placeholder: "Feedback",
    },
  ]);
  const joinRoom = (room) => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  const setMsgReceived = (data) => {
    let new_messages = [...msgs];
    for (let i = 0; i < new_messages.length; i++) {
      if (new_messages[i].id === data.room) {
        new_messages[i].message = data.message;
      }
    }
    setMsgs(new_messages);
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgReceived(data);
    });
  }, [socket]);
  useEffect(() => {
    for (let i = 0; i < msgs.length; i++) {
      joinRoom(msgs[i].id);
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "60%",
      }}
    >
      {msgs.map((m) => (
        <>
          <div
            style={{
              padding: "1rem",
              border: "1px solid lightgrey",
              display: "flex",
              justifyContent: "space-between",
            }}
            key={m.id}
          >
            <div
              style={{
                fontWeight: "bold",
              }}
            >
              {m.placeholder}
            </div>
            <div>{m.message}</div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Display;
