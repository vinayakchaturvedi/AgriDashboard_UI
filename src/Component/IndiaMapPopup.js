import React from 'react'
import './Popup.css'
import IndiaMap from "./IndiaMap";
function IndiaMapPopup(props){
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <IndiaMap/>
            </div>
        </div>) : "" ;
}

export default IndiaMapPopup;