import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://127.0.0.1:2005'); 

function Message() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:2005/room/message/3")
      .then(res => {
        setMessages(res.data);
      })
      .catch(err => console.log(err));

    socket.on('newMessage', (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  
  }, [messages]);
  
  const displaymsg = messages.map(msg => msg.messages.map((item, key) => {
    if (item.senter === localStorage.getItem('name')) {
      return (
        <li key={key} className="clearfix">
          <div className="message other-message float-right text-wrap w-auto">
            <p className="p-1 pt-2">{item.content}</p>
          </div>
        </li>
      )
    } else {
      return (
        <li className="clearfix" key={key}>
          <div className="message my-message float-left text-break w-auto">
            <div id="info">{item.senter}</div>
            <hr className='m-0 mt-1' />
            <p className='p-1 font-weight-bold '>{item.content}</p>
          </div>
        </li>
      )
    }
  }));
 
  return (
    <>
      {messages === undefined ? (
        <div>Loading...</div>
      ) : messages.length === 0 ? (
        <div className='text-center my-5 alert alert-warning w-30 mx-auto'>No messages found  :( be the first one :) </div>
      ) : (
        <ul>
          {displaymsg}
        </ul>
      )}
    </>
  );
}
export default Message ; 
