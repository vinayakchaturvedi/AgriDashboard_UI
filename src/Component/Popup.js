import React from 'react'
import './Popup.css'
import IndiaMap from "./IndiaMap";
function Popup(props){
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <IndiaMap/>
            </div>
        </div>) : "" ;
}

export default Popup;