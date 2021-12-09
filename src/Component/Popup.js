import React from 'react'
import './Popup.css'
import Register from './register';

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <Register/>
            </div>
        </div>) : "";
}

export default Popup;