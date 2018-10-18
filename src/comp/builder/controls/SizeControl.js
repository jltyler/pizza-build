import React from 'react';

const SizeControl = (props) => {
    return (
    <div className="size-control">
        <button className="small top"
            onClick={() => props.changeSize('small')}
            disabled={props.size === 'small'} >Small</button>
        <button className="medium middle"
            onClick={() => props.changeSize('medium')}
            disabled={props.size === 'medium'} >Medium</button>
        <button className="large middle"
            onClick={() => props.changeSize('large')}
            disabled={props.size === 'large'} >Large</button>
        <button className="party bottom"
            onClick={() => props.changeSize('party')}
            disabled={props.size === 'party'} >Party</button>
    </div>
    );
}

export default SizeControl;