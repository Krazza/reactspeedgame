import React from "react";

function Circle(props)
{
    if(props.status === true)
        return(<div className="circle circleActive" onClick={props.WinRound}></div>);
    else 
        return <div className="circle circleInactive" onClick={props.GameOver}></div>
}

export default Circle;