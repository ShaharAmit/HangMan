import React, {Component} from 'react';
import './App.css';
import HangMan from './hangman'
import GamePlay from './gamePlay'
import Finish from './finish'
import movies from './movies.json'

class HangManApp  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      badPoints: 0,
      handler: this.SetGamePoints.bind(this),
      sentance: "",
      gameStateHandler: this.SetGameState.bind(this),
      gameState: "New"
    }
  }

  SetGamePoints () {
    var badPoints = this.state.badPoints + 1
    this.setState({badPoints: badPoints})
    if (badPoints === 6) {
      this.SetGameState("Looser")
    }
  }
  
  SetGameState (state) {
    this.setState({gameState: state})
    if (state === "New") {
      this.InitGame()
    }
  }

  InitGame() {
    this.setState({badPoints: 0})
    this.RandomSentance()
  }

  RandomSentance() {
    var rand = Math.floor(Math.random() * movies.length),
    sentance = movies[rand].title
    this.setState({sentance: sentance.toUpperCase()})
  }

  componentDidMount() {
    this.InitGame()
  }

  render() {
    return (
      <div >
        <div className="HangManHeader">
          <div className="LittleWhiteCircle"></div>
          <h1>HANGMAN</h1>
          <div className="LittleWhiteCircle"></div>
        </div>
        <div className="Game">
          <HangMan hangState={this.state.badPoints}></HangMan>
          <GamePlay handler={this.state.handler} sentance={this.state.sentance} gameState={this.state.gameState} gameStateHandler={this.state.gameStateHandler}></GamePlay>
          <Finish gameState={this.state.gameState} gameStateHandler={this.state.gameStateHandler}></Finish>
        </div>
      </div>
    );
  }

}

export default HangManApp;
