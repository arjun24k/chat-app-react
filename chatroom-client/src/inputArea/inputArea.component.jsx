import React from 'react';
import './inputArea.styles.css';
import { connect } from 'react-redux';
import { setField, setEntryMessage, setOldChats } from '../redux/chat/chatField.actions';
import mapLocation from '../icons/map-location.svg';
import send from '../icons/send.svg';
import { setParticipants } from '../redux/participants/participants.actions';



class InputArea extends React.Component {

  constructor(props){
    super(props);
    this.state={
      fieldValue:''
    }
  }
  
  componentDidMount(){
    const socket = this.props.socket;
    if(socket){
      const userInput = this.props.userInput;
      const user = {
        "username":userInput.username,
        "chatroom":userInput.chatroom
      }
      socket.emit('join',{user},(error)=>console.log(error?error:'Joined successfully'));
      socket.on('chats',(chatList)=>this.props.setOldMsgs(chatList.chats));
      socket.on('welcomeMessage',(msg)=>{console.log(msg);this.props.setEntryMessage(msg);});
      socket.on('newUserJoined',(msg)=>this.props.setEntryMessage(msg));
      socket.on('roomData',(obj)=>this.props.setParticipants(obj.users));
      socket.on('message',(msg)=>this.props.setMessage(msg));
      socket.on('locationHandleReceive',(link)=>this.props.setMessage(link))
     }
  }
 
  componentWillUnmount(){
    this.props.socket.close();
  }

  sendLocation(socket){
    this.setState({fieldValue:''});
    navigator.geolocation.getCurrentPosition(position=>socket.emit(
      'locationHandle',
      {
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
      },(error)=>{
        if(error){
          return console.log(error)
        }
        console.log('location shared');
      }
    ));
  }

  sendMessage(message,socket){
    this.setState({fieldValue:''});
    const sender = this.props.userInput.username;
    socket.emit('sendMessage',{message,sender},(e)=>{
      console.log(e?e:'Delivered');
    });
  }
  
  render(){
    const socket= this.props.socket;
    return (
      <div id="input-area">
        <input onKeyUp={(e)=>e.keyCode === 13?this.sendMessage(this.state.fieldValue,socket):undefined} value={this.state.fieldValue}  onChange={(event)=>this.setState({fieldValue:event.target.value})} id="input-msg-field" placeholder="Message"/>
        <div id="send-button" onClick={()=>this.sendMessage(this.state.fieldValue,socket)} >
            <img id="send-icon" src={send} alt="loc"></img>
        </div>
        <div id="location-button" onClick={()=>this.sendLocation(socket)}>
            <img id="location-icon" src={mapLocation} alt="loc"></img>
        </div>
      </div>)
  }
}


const mapStateToProps = (state) => ({
  messageList:state.chat.chatMessages,
  socket:state.getSocketObj.socket,
  userInput:state.authStart.userInput
});

const mapDispatchToProps = dispatch => ({
  setMessage:msg => dispatch(setField(msg)),
  setParticipants:participants =>dispatch(setParticipants(participants)),
  setEntryMessage:msg =>dispatch(setEntryMessage(msg)),
  setOldMsgs:msgList =>dispatch(setOldChats(msgList))
});

export default connect(mapStateToProps,mapDispatchToProps)(InputArea);

/* 
<div >
<button id="send-button" onClick={()=>this.sendMessage(sendMessage)} >
<img id="send-icon" src={send} alt="loc"></img>
</button>
<button id="location-button" onClick={()=>this.sendLocation()}>
<img id="location-icon" src={mapLocation} alt="loc"></img>
</button>
</div>
*/