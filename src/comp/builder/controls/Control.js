import React from 'react';

const Control = (props) => {
    return (
        <div className="control">
            <span>{props.name}</span>
            <button onClick={props.removeFunc}>No</button>
            <button onClick={props.addFunc}>Yes</button>
            <button onClick={props.doubleFunc}>Double</button>
        </div>
    )
}

export default Control;