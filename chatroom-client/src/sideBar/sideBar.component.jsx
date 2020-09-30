import React from 'react';
import './sideBar.styles.css';
import Participant from '../participant/participant.component';
import { connect } from 'react-redux';


const SideBar = ({participants,userInput,socket,history}) =>{
    return(
        <div id="sidebar">
            <div id="chat-room-header">
                <h3>{userInput.chatroom}</h3>
            </div>
            <div id="participants-heading">Participants</div>
                <div id="participant-names">
                    {
                        participants?participants.map(name => <Participant name={name}/>):undefined
                    }
                </div>
                <button onClick={()=>leaveRoom(socket,history)} id="leave-chatroom-button">
                    Leave chatroom
                </button>
        </div>
    );
}

const leaveRoom = (socket,history) =>{
    localStorage.removeItem('junChatroomToken');
    history.goBack();
    socket.close();
}

const mapStateToProps = (state) => ({
    participants:state.getParticipants.participants,
    userInput:state.authStart.userInput,
    socket:state.getSocketObj.socket
});

export default connect(mapStateToProps)(SideBar);