import React, {Component} from 'react';
import './App.css';

class GamePlay  extends Component {
  constructor(props) {
    super(props)
    this.state = {
        wordsObj: [],
        words: [],
        selected: [],
        correctSelected:0,
        neededToSelect: 0
    }
  }

  GetWords(val) {
    return (
        val.map((objVal,key) => (
                <section key={100+key} className={objVal['color']} style={{visibility: objVal['space']? 'hidden' : ""}}>
                    <div>{objVal['letter']}</div>
                    <div></div>
                </section>
            ))
    )
  }

  componentWillUpdate(newProps) {
      if (newProps) {
        var sentance = newProps.sentance
      }
    if (!this.props.sentance || newProps.sentance !== this.props.sentance) {
      var tempWords = sentance.split(" "),
        calculatedLen = 0,
        wordsIndex = 0,
        words = [],
        wordsObj = [],
        revealedLettersLen= Math.floor(sentance.length / 4),
        correctSelected = 0,
        characters = "";
      for (var i=0; i<tempWords.length; i ++) {
        if (tempWords[i].length + calculatedLen <= 10) {
            if (words[wordsIndex]) {
                words[wordsIndex] += " "
            } else {
                words[wordsIndex] = ""
            }
            words[wordsIndex] += tempWords[i]
            calculatedLen += tempWords[i].length + 1
        } else {
            wordsIndex+=1;
            words[wordsIndex] = tempWords[i]
            calculatedLen = tempWords[i].length + 1
        }
        characters+=tempWords[i]
      }
      var selected = [];
        for (var j = 0; j < revealedLettersLen; j++ ) {
            var rand = Math.floor(Math.random() *  (characters.length - 1))
            selected[j] = characters.charAt(rand);
            var tempCharecters = characters.split(selected[j])
            revealedLettersLen -= tempCharecters.length;
            for(var k=0; k<tempCharecters.length; k++)
                characters+= tempCharecters[k]
         }
      
      words.map((word,key) => {
          wordsObj[key] = [word.length]
          word.split("").map((char,charIndex) => {
              var isSpace = (char===" "),
                includes = selected.includes(char)
                wordsObj[key][charIndex] = {
                    color: includes?"ColorBlack" : "ColorBlue",
                    letter: includes? char : "",
                    space: isSpace
                }
          })
      })
      correctSelected = selected.length;
        this.setState({
            wordsObj: wordsObj,
            selected: selected,
            words: words,
            correctSelected: correctSelected
        })
        this.ExtractUniqueChars(sentance)
    }
  }

  SelectCharecter = param => {
    const selectedChar = param
    var indices = [],
        found = false,
        correctSelected = this.state.correctSelected;
    if(this.props.gameState === "New") {
        var selected = this.state.selected;
        selected[selected.length] = selectedChar;
        this.setState({
            selected: selected
        })
        for(var l=0; l<this.state.words.length; l++) {
            var word = this.state.words[l];
            indices = []
            for(var i=0; i<word.length;i++) {
                if (word[i] === selectedChar) {
                    indices.push(i);
                    found = true;
                } 
            }
            for(var k=0; k<indices.length; k++) {
                var wordsObj = this.state.wordsObj
                wordsObj[l][indices[k]]['letter'] =  selectedChar
                  this.setState({
                    wordsObj: wordsObj
                })
            }
        }
        if (found === false) {
            this.props.handler()
        } else {
            correctSelected+=1;
            this.setState({correctSelected:correctSelected})
            if (this.state.neededToSelect === correctSelected) {
                this.props.gameStateHandler("Winner")
            }
        }
    }
  }

  ExtractUniqueChars(sentance) {
      var count = 0,
      chars = []
      for (var i=0; i<sentance.length; i++) {
          if (sentance[i] !== " " && chars.includes(sentance[i]) === false) {
              console.log(sentance[i])
              chars.push(sentance[i])
              count++;
          }
      }
      this.setState({neededToSelect: count});
  }

  GetLetters(letters) {
      return (
          <section>
                {letters.split("").map((letter,key) => (
                    <div key={100+key} className={this.state.selected.includes(letter)? "ColorGrey" : "ClickDiv"} onClick={this.state.selected.includes(letter)? null : this.SelectCharecter.bind(this,letter)}>{letter}</div>
                ))}
          </section>
      )
  }
  
  render() {
    return (
      <div className="GameCont">
            <section className="Words">
            {this.state.wordsObj.map((val,key) => (
                <section key={key}>
                    {this.GetWords(val)}
                </section>
            ))}
            </section>
            <section className="Letters">
                {this.GetLetters("ABCDEFGHIJ")}
                {this.GetLetters("KLMNOPQRS")}
                {this.GetLetters("TUVWXYZ")}
            </section>
      </div>
    );
  }

}

export default GamePlay;
