import React from 'react';
import './inputArea.styles.css';
import { connect } from 'react-redux';
import { setField, setEntryMessage, setOldChats, toggleDrawer } from '../redux/chat/chatField.actions';
import mapLocation from '../icons/map-location.svg';
import send from '../icons/send.svg';
import { setParticipants } from '../redux/participants/participants.actions';
import drawers from '../icons/drawers.svg'
import { loadStop } from '../redux/loading/loading.actions';

/* var iconStyles; */

class InputArea extends React.Component {

  constructor(props){
    super(props);
    this.state={
      fieldValue:''
    }
  }
  
  componentDidMount(){
    const socket = this.props.socket;
    var objDiv = document.getElementById("message-io");
    var chatArea = document.getElementById("chat-area");
    window.scroll({
      top:objDiv.scrollHeight,
      behavior:"smooth"
    })
    chatArea.addEventListener("click",()=>{
      if(this.props.showDrawer){
        this.props.toggleDrawer();
      }
    });
    if(socket){
      const userInput = this.props.userInput;
      const user = {
        "username":userInput.username,
        "chatroom":userInput.chatroom
      }
      socket.emit('join',{user},(error)=>console.log(error?error:'Joined successfully'));
      socket.on('chats',(chatList)=>this.scrollHandler(objDiv,this.props.setOldMsgs,chatList.chats));
      socket.on('welcomeMessage',(msg)=>{
        this.scrollHandler(objDiv,this.props.setEntryMessage,msg);
        this.props.loadStop(false);
      });
      socket.on('newUserJoined',(msg)=>this.scrollHandler(objDiv,this.props.setEntryMessage,msg));
      socket.on('roomData',(obj)=>this.props.setParticipants(obj.users));
      socket.on('message',(msg)=>this.scrollHandler(objDiv,this.props.setMessage,msg));
      socket.on('locationHandleReceive',(link)=>this.scrollHandler(objDiv,this.props.setMessage,link));
      socket.on('someoneLeft',(msg)=>this.scrollHandler(objDiv,this.props.setEntryMessage,msg));
     }
  }

  scrollHandler(objDiv,callback,msg){
    var drawers = document.getElementById('input-area');
    if(window.pageYOffset+window.innerHeight+7*drawers.offsetHeight>=objDiv.offsetHeight){
      callback(msg);
      //window.scrollTo(0,objDiv.scrollHeight);
      window.scroll({
        top:objDiv.scrollHeight,
        behavior:msg.sender?"smooth":undefined
      })
    }else{
        callback(msg);
    }
  }
 
  componentWillUnmount(){
    this.props.socket.close();
  }

  sendLocation(socket){
    this.setState({fieldValue:''});
    const sender = this.props.userInput.username;
    navigator.geolocation.getCurrentPosition(position=>socket.emit(
      'locationHandle',
      {
        sender,
        message:`https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`,
        isLink:true,
        msg_id:(Math.random()*Math.random()).toString()
      },(error)=>{
        if(error){
          alert(`${error}`)
          return console.log(error)
        }
        console.log('location shared');console.log();
      }
    ));
  }

  sendMessage(message,socket){
    if(message){
    document.getElementById('input-msg-field').value = "";
    const sender = this.props.userInput.username;
    const isLink=false;
    const msg_id=(Math.random()*Math.random()).toString();
    socket.emit('sendMessage',{message,sender,isLink,msg_id},(e)=>{
      console.log(e?e:'Delivered');
    });
    }
  }

  /* disableDrawerStyles(){
    var x = document.getElementById("sidebar");
    var width = x.offsetWidth;
    setTimeout(()=>x.style.display = "flex"?x.style.display = "none":x.style.display = "flex", 650);;
  } */
  
  render(){
    const socket= this.props.socket;
    var msg='';
    return (
      <div id="input-area">
        <div id="drawers-icon" onClick={()=>this.props.toggleDrawer()}>
                <img id="blah"  src={drawers} alt="-|-"></img>
        </div>
        <input onKeyUp={(e)=>e.key === 'Enter'?this.sendMessage(msg,socket):undefined}  onChange={(event)=>msg=event.target.value} id="input-msg-field" placeholder="Message"/>
        <div  id="send-button" onClick={()=>this.sendMessage(msg,socket)} >
            <img id="send-icon" src={send} alt="loc"></img>
        </div>
        <div  id="location-button" onClick={()=>this.sendLocation(socket)}>
            <img id="location-icon" src={mapLocation} alt="loc"></img>
        </div>
      </div>)
  }
}


const mapStateToProps = (state) => ({
  messageList:state.chat.chatMessages,
  socket:state.getSocketObj.socket,
  userInput:state.authStart.userInput,
  showDrawer:state.chat.showDrawer,
});

const mapDispatchToProps = dispatch => ({
  setMessage:msg => dispatch(setField(msg)),
  setParticipants:participants =>dispatch(setParticipants(participants)),
  setEntryMessage:msg =>dispatch(setEntryMessage(msg)),
  setOldMsgs:msgList =>dispatch(setOldChats(msgList)),
  toggleDrawer:()=>dispatch(toggleDrawer()),
  loadStop:(value) => dispatch(loadStop(value))
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