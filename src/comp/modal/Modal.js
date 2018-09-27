import React from 'react';
import './Modal.css';

const Modal = (props) => {
    return (
        <div
            className="Modal"
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100)',
                opacity: props.show ? '1' : '0',
                zIndex: props.show ? '500': '-500',
            }}>
            {props.children}
        </div>
    );
}

export default Modal;