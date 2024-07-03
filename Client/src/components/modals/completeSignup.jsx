import React from "react";
export default function completeSignup({ isOpen, onClose, text }) {
    if (!isOpen) return null;

    return (
        <div className="complete-overlay">
            <div className="complete-content">
                <p>{text}</p>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>

    )

}