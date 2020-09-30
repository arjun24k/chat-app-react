import React from 'react';
import './App.css';
import JoinRoom from './joinRoom/joinRoom.component';
import {
  Switch,
  Route,
} from "react-router-dom";
import ChatRoom from './chatRoom/chatRoom.component';
import { connect } from 'react-redux';
import { checkSessionStart } from './redux/auth/auth.actions';

//ROUTING ISSUE

class App extends React.Component {

  componentDidMount(){
    if(!this.props.user){
      const token = localStorage.getItem('junChatroomToken');
      const bearerHeader = {'authorization':`Bearer ${token}`};
      this.props.checkSession({bearerHeader});
    }
  }

  render(){ 
    return(
    <div id="chatUi">
      <Switch>
        <Route exact path='/' component={JoinRoom}/>
        <Route exact path='/room' component={ChatRoom}/>
        {/* <Route exact path='/' component={}/> */}
      </Switch>
    </div>
    )
  }
}
const mapStateToProps = (state) =>({
  user:state.authStart.user
});

const mapDispatchToProps = (dispatch) =>({
  checkSession: (bearerHeader) => dispatch(checkSessionStart(bearerHeader))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
