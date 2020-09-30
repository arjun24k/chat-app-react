import React from 'react';
import './entryMessage.styles.css';

const EntryMessage = ({props:{message}}) => {
    return (
        <div id="entry-message">
            {message}
        </div>
    )
}

export default EntryMessage;