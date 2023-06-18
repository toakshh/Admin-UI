import React from 'react';
import "./Message.css";

const Message = ({messageData}) => {
  return (
    <div className='message-body'>{messageData}</div>
  )
}

export default Message