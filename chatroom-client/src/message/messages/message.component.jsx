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
                {props.isLink
                ?<a  target={'_blank'} rel="noopener noreferrer" style={{"color":"rgb(226, 224, 224)"}} href={`${props.message}`}>Tap to view my location</a>
                :props.message
                }
            </div>
        </div>
    )
}

const decipherColor = (length)=>{
    if (length<4) 
        return '#09ac48';
    else if(length<7)
        return '#d10909';
    else if(length < 10)
        return '#e0af29';
    else
        return '#af79f7';            
}

export default React.memo(Message);