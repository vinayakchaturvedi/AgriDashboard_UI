import React from 'react'
import './Popup.css'
import Summary from "./Summary";

function SummaryPopup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <Summary/>
            </div>
        </div>) : "";
}

export default SummaryPopup;