import React from 'react';
import './errorBound.styles.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      this.setState({ hasError: true });
    }

    goToHomepage(){
        if(this.props.history!==undefined)
            this.props.history.goBack();
        else
         window.location.reload();
    }
  
    render() {
      if (this.state.hasError) {
        return( 
            <div id='error-component'>
                <img alt='' src='https://i.imgur.com/flHudHE.png' id='error-image'/>
                <h1>This Page is Lost</h1>
                <p>
                You bought a little bracelet for the express purpose of not losing your keys. You put a hook on your door specifically meant for keeping your keys. You briefly attempted to attach your keys to your phone. But here they are. In the dirt. In the park across the street from that bar you used to like but decided the last time you went that you probably wouldn’t go again. You’ll never find them.
                </p>
                <button onClick={()=>this.goToHomepage()}>Go to homepage</button>
            </div>);
      }
  
      return this.props.children; 
      
    }
  }

export default ErrorBoundary;