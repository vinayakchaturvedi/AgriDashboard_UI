import React from 'react'
import './Popup.css'
import IndiaMap from "./IndiaMap";
import Register from './register';
function Popup(props){
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                {/* <IndiaMap/> */}
                <Register/>
            </div>
        </div>) : "" ;
}

export default Popup;