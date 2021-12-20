
import React from 'react';
import ReactDOM from 'react-dom';
import './CardCss.css'


const Card = ({ card, handelChoice, flipped, disabled }) => {

    const handelClick = () => {
        if (!disabled) {
            handelChoice(card)
        }
    }
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.scr} alt="card front" />
                <img onClick={handelClick} className="back" src="/imgs/cover.png" alt="card back" />
            </div>
        </div>
    )
}

export default Card;