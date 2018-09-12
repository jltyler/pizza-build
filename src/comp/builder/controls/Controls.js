import React from 'react';
import './Controls.css';


const Controls = (props) => {
    return (
        <div className="controls">
        {props.children}
        </div>
    )
}

export default Controls;