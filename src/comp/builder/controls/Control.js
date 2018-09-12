import React from 'react';

const Control = (props) => {
    return (
        <div className="control">
        <span>{props.name}</span>
            <button>No</button>
            <button>Yes</button>
            <button>Double</button>
        </div>
    )
}

export default Control;