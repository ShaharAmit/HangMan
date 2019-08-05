import React, {Component} from 'react';
import './App.css';
import image0 from './assets/Hangman1.png'
import image1 from './assets/Hangman2.png'
import image2 from './assets/Hangman3.png'
import image3 from './assets/Hangman4.png'
import image4 from './assets/Hangman5.png'
import image5 from './assets/Hangman6.png'
import image6 from './assets/Hangman7.png'


class HangMan  extends Component {
  constructor(props) {
    super(props)
    this.state = {
        images: []
    }
}

componentWillMount() {
        this.setState({
            images:{
                [0]: image0,
                [1]: image1,
                [2]: image2,
                [3]: image3,
                [4]: image4,
                [5]: image5,
                [6]: image6
            }
        })
}
  render() {
    return (
<section className="HangMan" style={{backgroundImage: `url(${this.state.images[this.props.hangState]})`, width: `${(window.innerWidth-550)/2}px`}}></section>    );
  }

}

export default HangMan;
