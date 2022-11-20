import React from "react";

function GameOverPopUp(props)
{
    return(<div className="overlay">
        <div className="popup">
            <h2>Game Over</h2>
            {props.score <= 4 && <h3>Are you even trying? Final score: {props.score}</h3>}
            {props.score >= 5 && props.score <= 10 && <h3>Good job, final score is: {props.score}</h3>}
            {props.score >=11 && <h3>Omnissiah is pleased by your work, priest. Final score: {props.score}</h3>}
            <button className="myButtonClass" onClick={props.closer}>CLOSE</button>
        </div>
    </div>)
}

export default GameOverPopUp;