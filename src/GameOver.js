import React from "react";

function GameOverPopUp(props)
{
    return(<div className="overlay">
        <div className="popup">
            <h2>Game Over</h2>
            <h3>Here is your final score: {props.score}</h3>
            <button>Close</button>
        </div>
    </div>)
}

export default GameOverPopUp;