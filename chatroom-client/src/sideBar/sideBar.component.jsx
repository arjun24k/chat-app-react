import React from 'react';
import './sideBar.styles.css';
import Participant from '../participant/participant.component';
import { connect } from 'react-redux';
import { clearUser, deleteUserStart } from '../redux/auth/auth.actions';
import { closeSocket } from '../redux/joinRoom/joinRoom.actions';


const showDrawerStyles = () =>{
    /* var drawer = document.getElementById('chat-area');
    drawer.scrollIntoView({behavior:"smooth"}); */
    return {
        left:"0vw"
    };
}


const SideBar = ({participants,userInput,socket,history,showDrawer,clearUser,closeSocket,user,deleteUser}) =>{
    /* const sideBarStyles = {
        marginRight:"70vw"
    }; */
    const userObj = {
        username:user.user.username,
        _id:user.user._id
    };
    return(
        <div id="sidebar" style={showDrawer?showDrawerStyles():undefined}>
            <div id="chat-room-header" >
                <h3>{userInput?userInput.chatroom:{width:"0vw"}}</h3>
            </div>
            <div id="participants-heading" >Participants</div>
            
                <div id="participant-names">
                    {   
                        participants?participants.map(name => <Participant name={name}/>):undefined
                    }
                </div>
                <button  onClick={()=>leaveRoom(socket,history,clearUser,closeSocket,userObj,deleteUser)} className="bottom-chatroom-button">
                    Leave chatroom
                </button>
                <button  onClick={()=>scrollBottom()} className="bottom-chatroom-button">
                    Scroll to Bottom
                </button>
        </div>
    );
}

const scrollBottom = () => {
    var objDiv = document.getElementById("message-io");
    window.scroll({
      top:objDiv.scrollHeight,
      behavior:"smooth"
    })
};

/* function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
} */

const leaveRoom = (socket,history,clearUser,closeSocket,userObj,deleteUser) =>{
    clearUser();
    closeSocket();
    localStorage.removeItem('junChatroomToken');
    socket.close();
    deleteUser(userObj);
    history.goBack();
}

const mapDispatchToProps = (dispatch) => ({
    clearUser:() => dispatch(clearUser()),
    closeSocket:()=>dispatch(closeSocket()),
    deleteUser:(userObj)=>dispatch(deleteUserStart(userObj))
});

const mapStateToProps = (state) => ({
    participants:state.getParticipants.participants,
    userInput:state.authStart.userInput,
    user:state.authStart.user,
    socket:state.getSocketObj.socket,
    showDrawer:state.chat.showDrawer
});

export default connect(mapStateToProps,mapDispatchToProps)(SideBar);