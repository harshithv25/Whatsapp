import React, { useEffect, useState } from 'react'
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase';
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function SidebarChat({ addNewChat, room, id }) {

    const [{ user }, dispatch] = useStateValue();
    var v = true;
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) =>
                        doc.data()))
                );
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 10000000));
    }, [id]);

    const createChat = () => {
        if (user.displayName === 'Harshith V') {
            const roomName = prompt("Please Enter a name for your Chat..");
            if (roomName) {
                db.collection('rooms')
                    .add({
                        name: roomName,
                    });
            }
        } else {
            alert("You are not verified to perform this action");
        }

    }

    return !addNewChat ? (
        <div>
            <Link to={`/rooms/${id}`}>
                <div className={`sidebarChat ${v && 'b'}${v = false}`}>
                    <Avatar src={`https://api.adorable.io/avatars/60/abott@${seed}.png`} />
                    <Transition timeout={4000} in={true} appear>
                        {status => (
                            <div className={`sidebarChat__info box box-${status}`}>
                                <h2>{room}</h2>
                                {console.log(messages)}
                                <p>{messages[0]?.message}</p>
                            </div>
                        )}
                    </Transition>
                </div>
            </Link>
        </div>
    ) : (
            <div onClick={createChat} className="sidebarChat" id="lol">
                <h2>Add new chat</h2>
            </div>
        );
}

export default SidebarChat
