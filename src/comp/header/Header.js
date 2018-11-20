import React from 'react';
import './Header.css';

const Header = (props) => {
    return (
        <div className="header">
            <div className="link" onClick={props.displayChange.bind(null, 'builder')}>Builder</div>
            <div className="link" onClick={props.displayChange.bind(null, 'history')}>History ({props.historyEntries})</div>
        </div>
    );
};

export default Header;