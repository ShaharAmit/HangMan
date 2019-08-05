import React, {Component} from 'react';
import imageWinning from './assets/yes_symbol.png'
import imageLosing from './assets/shit_symbol.png'
import './App.css';


class Finish  extends Component {
  constructor(props) {
    super(props)
    this.state = {
        images: {}
    }
}

GetSentance(sentance,color) {
  return sentance.split(" ").map((word,key) => (
    <p style={{color: color}} key={key}>{word}</p>
  ))
}

CheckSentance() {
  if (this.props.gameState==="Looser") {
    return this.GetSentance("SHIT! YOU DIED :(","#ff495e")
  } else if (this.props.gameState==="Winner") {
    return this.GetSentance("YES YOU DID IT","#72e18e")
  }
}

CheckGameState() {
  if (this.props.gameState!=="New") {
    return( <section>
              <section>
                <section className="GameStateImage" style={{backgroundImage: `url(${this.state.images[this.props.gameState]})`}}></section>
                {this.CheckSentance()}
              </section>
              <section className="TryAgain" onClick={this.ChangeGameState.bind(this)}><p>AGAIN</p></section>
            </section>
    )
  }
}

componentWillMount() {
  var images = {}
  images["Looser"] = imageLosing
  images["Winner"] = imageWinning
  this.setState({images: images})
}

ChangeGameState() {
  this.props.gameStateHandler("New")
}


render() {
    return (
        <section className="Finish" style={{width: `${(window.innerWidth-550)/2}px`}}>
          {this.CheckGameState()}
        </section>    
    );
  }

}

export default Finish;
