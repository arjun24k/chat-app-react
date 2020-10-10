import React from 'react';
import { connect } from 'react-redux';
import Message from '../message/messages/message.component';
import './chatArea.styles.css';
import EntryMessage from '../message/entryMessage/entryMessage.component';
import Spinner from '../spinner/spinner.component';

const ChatArea = ({messageList,userInput}) =>{
    return(
        messageList?<div id="chat-area">
               {  messageList.map(messageObj=>{
                    const message= messageObj.message;
                    const msg_id=messageObj.msg_id;
                    const sender = messageObj.sender;
                    const isUser = userInput.username === sender;
                    const isEntryMessage = sender === false;
                    if(message)
                        if(isEntryMessage)
                            return <EntryMessage key={msg_id} props={{message}}/>
                        else 
                            return <Message key={msg_id} props={{message,isUser,sender,isLink:messageObj.isLink}}/>
                    else
                        return undefined;
                    //return message?isEntryMessage?<EntryMessage key={`msgSndr${message}n${i++}`} props={{message}}/>:<Message key={`msg${message}n${i++}`} props={{message,isUser,sender}}/>:undefined
                }) 
                }
        </div>:<Spinner/>
    );
}


const mapStateToProps = (state) =>({
    messageList:state.chat.chatMessages,
    userInput:state.authStart.userInput,
});

export default connect(mapStateToProps)(ChatArea);