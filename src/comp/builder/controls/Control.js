import React from 'react';

const Control = (props) => {
    return (
        <div className="control">
            <span>{props.name}</span>
            <button onClick={props.removeFunc} disabled={props.current === 0}>None</button>
            <button onClick={props.addFunc} disabled={props.current === 1}>Some</button>
            <button onClick={props.doubleFunc} disabled={props.current === 2}>Lots</button>
        </div>
    )
}

export default Control;