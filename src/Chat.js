import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
import EmojiEmotionsRoundedIcon from "@material-ui/icons/EmojiEmotionsRounded";
import MicIcon from "@material-ui/icons/Mic";
import { Avatar, IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import reactSound from "react-sound";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [{ user }, dispatch] = useStateValue();

  const dummy = useRef();

  const [messages, setMessages] = useState([]);

  const [Input, setInput] = useState("");

  const [seed, setSeed] = useState("");

  const { id } = useParams();

  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      setSeed(Math.floor(Math.random() * 10000000));
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();

    if (
      Input === "" ||
      Input === " " ||
      Input === "  " ||
      Input === "   " ||
      Input === "     "
    ) {
      return null;
    } else {
      db.collection("rooms").doc(id).collection("messages").add({
        name: user.displayName,
        message: Input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://api.adorable.io/avatars/60/abott@${seed}.png`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last Seen @ {""}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchRoundedIcon />
          </IconButton>
          <IconButton>
            <AttachFileRoundedIcon />
          </IconButton>
          <IconButton>
            <MoreVertRoundedIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              user.displayName === message.name && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleString()}
            </span>
            <span ref={dummy}></span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <EmojiEmotionsRoundedIcon />
        </IconButton>
        <form>
          <input
            value={Input}
            type="text"
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleClick} type="submit">
            Send
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
