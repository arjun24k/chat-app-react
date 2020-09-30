import React from 'react';
import './message.styles.css';

const Message = ({props}) =>{
    const color = decipherColor(props.sender.toString().length);

    const userStyles={
        borderBottomRightRadius: "0%",
        borderBottomLeftRadius: "20px",
        marginRight:"1%",
        textAlign: "left",
    };
    const memberStyles = {
        borderBottomRightRadius: "20px",
        borderBottomLeftRadius: "0%",
        marginLeft:"1%",
        textAlign: "right",
        alignItems: "flex-start"
    };
    const senderColorStyles = {
        color
    };
/*     const userContainer=

    const memberContainer = {

    } */
    return(
        <div style={props.isUser?{alignItems: "flex-end"}:{alignItems: "flex-start"}} className="message-bubble-container">
            <div style={props.isUser?userStyles:memberStyles} className="message-bubble">
                {props.isUser
                ?undefined
                :<div className="sender-name" style={senderColorStyles}>
                    {props.sender}
                </div>}
                {props.message}
            </div>
        </div>
    )
}

const decipherColor = (length)=>{
    if (length<6) 
        return '#09ac48';
    else if(length<8)
        return '#d10909';
    else if(length < 10)
        return '#e0af29';
    else
        return '#af79f7';            
}

export default Message;