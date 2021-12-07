import React from "react";
import { BrailleImage } from "../../components/brailleImage/BrailleImage";
import "./textToBraille.scss";
const { checkIfNumber } = require("./numbers");

class TextToBraile extends React.Component {
  constructor() {
    super();
    this.state = {
      textField: "",
      imageDisplay: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  formatStringArray(x) {
    let y = [];
    x.forEach((a) => {
      if (checkIfNumber(a)) {
        y.push("#");
      }
      y.push(a);
    });
    console.log(y);
    return y;
  }
  handleChange(e) {
    const imgDisplay = e.target.value.split("");
    const formatArray = this.formatStringArray(imgDisplay);
    this.setState({
      textField: e.target.value,
      imageDisplay: formatArray,
    });
  }
  render() {
    const { imageDisplay } = this.state;
    return (
      <div className="container">
        <p className="headers">Generate your own Braille</p>
        <p className="paratext">
          Enter text below for it to be translated into braille. Spaces will be
          translated as blank spaces, however, other characters that are not
          English letters cannot be displayed.
        </p>
        <div className="textbox-align">
          <div className="input">
            <input
              type="text"
              placeholder="Enter text here"
              onChange={this.handleChange}
            />
            <span class="input__border"></span>
          </div>
        </div>
        <div className="display-padding">
          <div className="braille-display">
            {imageDisplay.length > 0 ? (
              <BrailleImage letter={imageDisplay} />
            ) : (
              " "
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TextToBraile;
