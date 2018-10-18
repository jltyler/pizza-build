import React from 'react';
import Helpers from '../../../Helpers';

const Control = (props) => {
    return (
        <div className="control">
            <span>{Helpers.capitalize(props.name)}</span>
            <div className="control-buttons">
                <button className="left" onClick={props.removeFunc} disabled={props.current === 0}>None</button>
                <button className="middle" onClick={props.addFunc} disabled={props.current === 1}>Some</button>
                <button className="right" onClick={props.doubleFunc} disabled={props.current === 2}>Lots</button>
            </div>
        </div>
    )
}

export default Control;