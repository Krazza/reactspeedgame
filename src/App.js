import React from "react";
import Circle from "./Circle.js"; 
import "./App.css";

class App extends React.Component
{
    constructor()
    {
        super();
        
        this.WinRound = this.WinRound.bind(this);
        this.GameOver = this.GameOver.bind(this);
        this.GetRandomInt = this.GetRandomInt.bind(this);
        this.SetNextActiveDrum = this.SetNextActiveDrum.bind(this);
        this.StartTheRound = this.StartTheRound.bind(this);
        this.previousDrumId = null; //to state (poten.)
        this.nextDrumId = null; //to state (poten.)
        this.theTimer = null; //to state
        this.time = 5000;
        this.state = {
            score : 0,
            showpopup: false,
            myDrumKit : [<Circle key="0" id="0" status={false}/>, 
                          <Circle key="1" id="1" status={false}/>, 
                          <Circle key="2" id="2" status={false}/>, 
                          <Circle key="3" id="3" status={false}/>]
        }
    }

    render()
    {
        return(<main className="gamecontainer">
            <h1>Welcome to the game</h1>
            <h2>Your score: {this.state.score}</h2>
            <div className="circlecontainer">{this.state.myDrumKit[0]}{this.state.myDrumKit[1]}{this.state.myDrumKit[2]}{this.state.myDrumKit[3]}</div>
            <div className="buttoncontainer">
                <button className="myButtonClass" id="start" name="start" onClick={this.StartTheRound}> Start </button>
                <button className="myButtonClass" id="stop" name="stop" onClick={this.GameOver} > Stop </button>
            </div>
        </main>
        );
    }

    StartTheRound()
    {
        console.log("round started");
        this.SetNextActiveDrum();
        let temp = this.state.myDrumKit;

        temp.forEach(drum =>
        {
            if(drum.props.id == this.nextDrumId)
            {
                temp[this.nextDrumId] = <Circle key={temp[this.nextDrumId].props.id} id={temp[this.nextDrumId].props.id} status={true} WinRound={this.WinRound}/>;
            } else
            {
                temp[drum.props.id] = <Circle key={drum.props.id} id={drum.props.id} status={false} GameOver={this.GameOver}/>;
            }
        })
        this.setState({myDrumKit: temp});

        this.theTimer = setTimeout(this.GameOver, this.time);
    }

    WinRound()
    {
        let temp = this.state.myDrumKit;
        //play sound
        this.setState({score: this.state.score + 1 });

        clearTimeout(this.theTimer);
        temp.forEach(drum => 
        {
            temp[drum.props.id] = <Circle key={drum.props.id} id={drum.props.id} status = {false} />;
        })

        this.setState({myDrumKit: temp});
        
        if(this.time > 1000)
            this.time = this.time - 500;

        this.StartTheRound();    
    }

    GameOver()
    {
        console.log("game over")
        clearTimeout(this.theTimer);
        let temp = this.state.myDrumKit;
        temp.forEach(drum => 
        {
            temp[drum.props.id] = <Circle key={drum.props.id} id={drum.props.id} status = {false} />;
        })
        this.setState({myDrumKit: temp, score: 0});
        this.theTimer = 5000;
    }

    SetNextActiveDrum()
    {
        do {
            this.nextDrumId = this.GetRandomInt(4);
            if(this.previousDrumId === null)
                this.previousDrumId = this.GetRandomInt(4);
        } while (this.nextDrumId === this.previousDrumId);
    
        this.previousDrumId = this.nextDrumId;
        //next next drum id
    }

    GetRandomInt()
    {
        return Math.floor(Math.random() * this.state.myDrumKit.length);
    }
}

export default App;