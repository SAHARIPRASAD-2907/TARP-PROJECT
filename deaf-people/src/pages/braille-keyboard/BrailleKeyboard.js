import React from "react";
import "./braille-keyboard.scss";
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "space",
];
class BrailleKeyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      displayText: e.target.value,
    });
  }
  render() {
    return (
      <div className="container">
        <p className = "headers">Braille Keyboard</p>
        <p className = "paratext">
            Select Braille characters to Translate
        </p>
        {alphabet.map((l) => {
          const alpha = l !== " " ? l.toLowerCase() : "space";
          console.log("../../assets/images/"+alpha+".png");
          return (
          <div className="images">
            <img
              key={alpha}
              src={require("../../../public/assets/images/"+alpha+".png").default}
              className="image"
              alt={alpha}
              onClick={() => {
                const { displayText } = this.state;
                const letter = l === "space" ? " " : l;
                this.setState({
                  displayText: displayText + letter,
                });
              }}
            />
            </div>
          );
        })}
        <div className="textarea">
          <textarea onChange={this.handleChange} value={this.state.displayText} />
        </div>
      </div>
    );
  }
}

export default BrailleKeyboard;
