import React from 'react';
import './chatRoom.styles.css';
import InputArea from '../inputArea/inputArea.component';
import ChatArea from '../chatArea/chatArea.component';
import SideBar from '../sideBar/sideBar.component';
import { connect } from 'react-redux';
import { initSocket } from '../redux/joinRoom/joinRoom.actions';
import  SocketIOClient  from 'socket.io-client';
import { checkSessionStart } from '../redux/auth/auth.actions';

class ChatRoom extends React.Component{

    componentDidMount(){
        console.log('hey');
        if(!this.props.user){
            const token = localStorage.getItem('junChatroomToken');
            console.log(token);
            if(!token)
            this.props.history.goBack();
            const bearerHeader = {'authorization':`Bearer ${token}`};
            this.props.checkSession({bearerHeader});
        };
        if(!this.props.socket)
        this.props.initSocket(SocketIOClient('http://localhost:5000'));
    }

    render(){
        console.log(this.props.socket,this.props.user);
        return(
            this.props.socket
            ?this.props.user!==undefined
            ?<div id="chat-room-layout">
            <SideBar history={this.props.history}/>
            <div id="message-io">
                <InputArea/>
                <ChatArea/>
            </div> 
            </div>
            :<div>
            Loading...
             </div>
            :<div>
            Loading...
             </div>
        )
    }
}

const mapStateToProps = (state) => ({
    socket:state.getSocketObj.socket,
    user:state.authStart.user
});

const mapDispatchToProps = (dispatch) =>({
    initSocket:(socket)=>dispatch(initSocket(socket)),
    checkSession:(bearerHeader) => dispatch(checkSessionStart(bearerHeader))
});

export default connect(mapStateToProps,mapDispatchToProps)(ChatRoom);