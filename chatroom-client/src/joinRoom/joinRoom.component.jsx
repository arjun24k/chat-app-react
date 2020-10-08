import React from 'react';
import './joinRoom.styles.css'
import { connect } from 'react-redux';
import { initSocket } from '../redux/joinRoom/joinRoom.actions';
import { authStart } from '../redux/auth/auth.actions';
import { withRouter } from 'react-router-dom';
import { loadStart, loadStop } from '../redux/loading/loading.actions';
import Spinner from '../spinner/spinner.component';


class JoinRoom extends React.Component{

    /* componentDidMount(){
       // this.props.initSocket(socketIOClient('http://localhost:3000'));
    } */
/* 
    joinRoom(username,chatroom,socket){
        console.log(socket);
        username='';
        chatroom='dd';
        if(socket){
            socket.emit('join',{username,chatroom},(e)=>{
                if(e){
                    console.log(e)
                }
            });   
        }
        else
            alert('Unable to connect');
    } */

    componentDidMount(){
        if(this.props.user){
            const url = this.props.match.url;
            const history = this.props.history;
            history.push(`${url}room`);
        }
    }
    render(){
        var username,chatroom='';
        const url = this.props.match.url;
        const history = this.props.history;
        return(
            !this.props.isLoading
            ?<div id="join-room-area">
            <form id="join-room-form">
                <label>Name</label>
                <input onChange={(e)=>username=e.target.value} className="input-participant-details" type="text" />
                <label>Chat Room</label>
                <input onChange={(e)=>chatroom=e.target.value} className="input-participant-details" type="text"/>
                <button id="chat-submit-button" onClick={(e) => {
                    e.preventDefault();
                    this.props.loadStart(true);
                    this.props.authInit({username,chatroom,url,history});
                    this.props.loadStop(false);
                }}>Submit</button>
            </form>
            </div>
            :<Spinner/>
        )
    }
}

const mapStateToProps = (state) => ({
    socket:state.getSocketObj.socket,
    user:state.authStart.user,
    isLoading:state.loadingState.isLoading
});

const mapDispatchToProps = (dispatch) =>({
    initSocket:(socket) => dispatch(initSocket(socket)),
    authInit:(userInput) => dispatch(authStart(userInput)),
    loadStart:(value) => dispatch(loadStart(value)),
    loadStop:(value) => dispatch(loadStop(value))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(JoinRoom));