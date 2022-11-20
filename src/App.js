import React from "react";
import Circle from "./Circle.js"; 
import GameOver from "./GameOver.js"
import clickSound from "./assets/click.wav";
import startSound from "./assets/ Omnissiah.mp3";
import stopSound from "./assets/stop.wav";
import "./App.css";
import { click } from "@testing-library/user-event/dist/click.js";

class App extends React.Component
{
    constructor()
    {
        super();
        this.WinRound = this.WinRound.bind(this);
        this.LostRound = this.LostRound.bind(this);
        this.GameOver = this.GameOver.bind(this);
        this.GetRandomInt = this.GetRandomInt.bind(this);
        this.SetNextActiveDrum = this.SetNextActiveDrum.bind(this);
        this.StartTheRound = this.StartTheRound.bind(this);
        this.ClosePopUp = this.ClosePopUp.bind(this);
        this.previousDrumId = null; //to state (poten.)
        this.nextDrumId = null; //to state (poten.)
        this.theTimer = null; //to state
        this.time = 5000;
        this.clickSound = new Audio(clickSound);
        this.startSound = new Audio(startSound);
        this.stopSound = new Audio(stopSound);
        this.state = {
            score : 0,
            lives : 3,
            showpopup: false,
            gameinprogress: false,
            myDrumKit : [<Circle key="0" id="0" status={false}/>, 
                          <Circle key="1" id="1" status={false}/>, 
                          <Circle key="2" id="2" status={false}/>, 
                          <Circle key="3" id="3" status={false}/>]
        }
    }

    render()
    {
        return(<main className="gamecontainer">
            <h1>Welcome</h1>
            <h2>Current Score: {this.state.score}</h2>
            <h2 className="score">Remaining blessings: {this.state.lives}</h2>
            <div className="circlecontainer">{this.state.myDrumKit[0]}{this.state.myDrumKit[1]}{this.state.myDrumKit[2]}{this.state.myDrumKit[3]}</div>
            <div className="buttoncontainer">
                { !this.state.gameinprogress && <button className="myButtonClass" id="start" name="start" onClick={this.StartTheRound}> START </button> }
                { this.state.gameinprogress && <button className="myButtonClass" id="stop" name="stop" onClick={this.GameOver} > STOP </button> }
            </div>
            {this.state.showpopup && <GameOver score={this.state.score} closer={this.ClosePopUp}/>}
        </main>
        );
    }

    StartTheRound()
    {
        if(this.startSound.paused)
        {
            this.startSound.play();
        }

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

        this.setState({myDrumKit: temp, gameinprogress: true});

        this.theTimer = setTimeout(this.LostRound, this.time);
    }

    WinRound()
    {
        let temp = this.state.myDrumKit;
        //play sound
        this.clickSound.play();
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

    LostRound()
    {
        if(this.state.lives > 0)
        {
            this.setState({lives: this.state.lives - 1});
            this.StartTheRound();
            return;
        }

        this.GameOver();
    }

    GameOver() 
    {
        this.stopSound.play();
        clearTimeout(this.theTimer);
        let temp = this.state.myDrumKit;
        temp.forEach(drum => {
            temp[drum.props.id] = <Circle key={drum.props.id} id={drum.props.id} status={false} />;
        });
        this.setState({ myDrumKit: temp, gameinprogress: false, lives: 3, showpopup: true });
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

    ClosePopUp()
    {
        this.setState({showpopup: false, score: 0});
    }

    GetRandomInt()
    {
        return Math.floor(Math.random() * this.state.myDrumKit.length);
    }
}

export default App;