import React from 'react';
import './participant.styles.css';

const Participant = ({name}) =>{
    console.log(name);
    return (
        <div className="participant-card">
            {name}
        </div>
    )
}

export default Participant;