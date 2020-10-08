import React from 'react';
import './chatRoom.styles.css';
import InputArea from '../inputArea/inputArea.component';
import ChatArea from '../chatArea/chatArea.component';
import SideBar from '../sideBar/sideBar.component';
import { connect } from 'react-redux';
import { initSocket } from '../redux/joinRoom/joinRoom.actions';
import  SocketIOClient  from 'socket.io-client';
import { checkSessionStart } from '../redux/auth/auth.actions';
import {getLocalHost} from '../getLocalHost';
import Spinner from '../spinner/spinner.component';


class ChatRoom extends React.Component{

    componentDidMount(){
        if(!this.props.user){
            const token = localStorage.getItem('junChatroomToken');
            if(!token)
                this.props.history.goBack();
            else{
                const bearerHeader = {'authorization':`Bearer ${token}`};
                this.props.checkSession({bearerHeader});
            }
        };
        if(!this.props.socket)
        this.props.initSocket(SocketIOClient(getLocalHost(),{transports: ['websocket'], upgrade: false}));
    }

    render(){
        var socket = this.props.socket;
        var user = this.props.user;
        return(
            
            <div>
                {socket
            ?user!==undefined
            ?<div id="message-io">
            <div>
            <SideBar history={this.props.history}/> </div>
                <InputArea/>
                <ChatArea/>
            </div>
            :<Spinner/>
            :<Spinner/>}
            </div>
           
        )
    }
}

const mapStateToProps = (state) => ({
    socket:state.getSocketObj.socket,
    user:state.authStart.user,
});

const mapDispatchToProps = (dispatch) =>({
    initSocket:(socket)=>dispatch(initSocket(socket)),
    checkSession:(bearerHeader) => dispatch(checkSessionStart(bearerHeader))
});

export default connect(mapStateToProps,mapDispatchToProps)(ChatRoom);

/* 
return(
            <div id='chat-room-layout'>
                <SideBar history={this.props.history}/>
            {socket
            ?user!==undefined
            ?<div id="message-io">
                <InputArea/>
                <ChatArea/>
            </div>
            :<Spinner/>
            :<Spinner/>}
            </div>
        )
*/