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
      <div>
        <h1>Braile keyboard</h1>
        {alphabet.map((l) => {
          const alpha = l !== " " ? l.toLowerCase() : "space";
          return (
            <img
              src={require("../../datasets/images/" + alpha + ".png").default}
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
          );
        })}
        <textarea onChange={this.handleChange} value={this.state.displayText} />
      </div>
    );
  }
}

export default BrailleKeyboard;
