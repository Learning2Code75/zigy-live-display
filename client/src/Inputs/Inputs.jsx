import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MessagesContext } from "../App";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Inputs = () => {
  const { messages } = useContext(MessagesContext);
  const [joinedRooms, setJoinedRooms] = useState([
    { id: "1", joined: false },
    { id: "2", joined: false },
    { id: "3", joined: false },
    { id: "4", joined: false },
    { id: "5", joined: false },
    { id: "6", joined: false },
  ]);

  const findRoomJoined = (r) => {
    for (let i = 0; i < joinedRooms.length; i++) {
      if (joinedRooms[i].id === r) {
        return joinedRooms[i].joined;
      }
    }
  };

  const sendMessage = (msg, room) => {
    if (findRoomJoined(room)) {
      socket.emit("send_message", { message: msg, room });
    }
  };
  const joinRoom = (room) => {
    console.log(typeof room);
    if (room !== "") {
      socket.emit("join_room", room);
      let new_joined_rooms = [...joinedRooms];
      for (let i = 0; i < new_joined_rooms.length; i++) {
        if (new_joined_rooms[i].id === room) {
          new_joined_rooms[i].joined = true;
        }
      }
      setJoinedRooms(new_joined_rooms);
    }
  };
  const exitRoom = (room) => {
    if (room !== "") {
      let new_joined_rooms = [...joinedRooms];
      for (let i = 0; i < new_joined_rooms.length; i++) {
        if (new_joined_rooms[i].id === room) {
          new_joined_rooms[i].joined = false;
        }
      }
      setJoinedRooms(new_joined_rooms);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "60%",
      }}
    >
      {messages.map((m) => (
        <div>
          <input
            type="checkbox"
            checked={findRoomJoined(m.id)}
            onChange={() => {
              let old = findRoomJoined(m.id);
              if (old) {
                exitRoom(m.id);
              } else {
                joinRoom(m.id);
              }
            }}
          />
          <input
            placeholder={m.placeholder}
            value={m.message}
            onChange={(e) => {
              sendMessage(e.target.value, m.id);
            }}
          />
          {/* <button onClick={() => joinRoom(m.id)}>Join room </button>
          <button onClick={() => exitRoom(m.id)}>Exit room </button> */}
        </div>
      ))}
      {/* <div>
        <pre>{JSON.stringify(joinedRooms, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default Inputs;
