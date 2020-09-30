import React from 'react';
import { connect } from 'react-redux';
import Message from '../message/messages/message.component';
import './chatArea.styles.css';
import EntryMessage from '../message/entryMessage/entryMessage.component';

const ChatArea = ({messageList,userInput}) =>{
    var i=0;
    return(
        <div id="chat-area">
               {  messageList.map(messageObj=>{
                    const message= messageObj.message;
                    console.log(messageObj);
                    const sender = messageObj.sender;
                    const isUser = userInput.username === sender;
                    const isEntryMessage = sender === false;
                    return message?isEntryMessage?<EntryMessage key={`msgSndr${message}n${i++}`} props={{message}}/>:<Message key={`msg${message}n${i++}`} props={{message,isUser,sender}}/>:undefined
                }) 
                }
        </div>
    );
}

const mapStateToProps = (state) =>({
    messageList:state.chat.chatMessages,
    userInput:state.authStart.userInput,
});

export default connect(mapStateToProps)(ChatArea);