import React from 'react';
import './AttackButton.css';

const AttackButton = ({onClick, attack}) => {
    return (
        <button className='attack-button' onClick={onClick}>
            <div className="rpgui-icon empty-slot">
            </div>
        </button>
    );
};

export default AttackButton;