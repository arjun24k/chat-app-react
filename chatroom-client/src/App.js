import React, { Suspense } from 'react';
import './App.css';
import JoinRoom from './joinRoom/joinRoom.component';
import {
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import { checkSessionStart } from './redux/auth/auth.actions';
import Spinner from './spinner/spinner.component';

//ROUTING ISSUE
const ChatRoom =  React.lazy(()=>import('./chatRoom/chatRoom.component'));
class App extends React.Component {



  componentDidMount(){
    if(!this.props.user){
      const token = localStorage.getItem('junChatroomToken');
      if(token){
        const bearerHeader = {'authorization':`Bearer ${token}`};
        this.props.checkSession({bearerHeader});
      }
    }
  }

  render(){ 
    return(
    <div id="chatUi">
      <Switch>
        <Route exact path='/' component={JoinRoom}/>
        <Suspense fallback={<Spinner/>}>
          <Route exact path='/room' component={ChatRoom}/>
        </Suspense>
      </Switch>
    </div>
    );
  }
}
const mapStateToProps = (state) =>({
  user:state.authStart.user,
  leftRoom:state.authStart.leftRoom
});

const mapDispatchToProps = (dispatch) =>({
  checkSession: (bearerHeader) => dispatch(checkSessionStart(bearerHeader))
});


export default connect(mapStateToProps,mapDispatchToProps)(App);
