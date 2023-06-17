import io from "socket.io-client";
import { useEffect, useState } from "react";
export const socket = io.connect("http://localhost:3001");

const Form = () => {
  const [msg, setMsg] = useState("");
  const [msgReceived, setMsgReceived] = useState("");
  const [room, setRoom] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message: msg, room });
  };
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgReceived(data.message);
    });
  }, [socket]);

  return (
    <div>
      <input
        placeholder="room number.."
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Join room</button>
      <input
        // onChange={sendMessage}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
        placeholder="message "
      />
      <button onClick={sendMessage}>Send message</button>
      <h1>Message: </h1>
      {msgReceived}
    </div>
  );
};

export default Form;
