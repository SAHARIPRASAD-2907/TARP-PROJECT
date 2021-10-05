import React from "react";
import { BrailleImage } from "../../components/brailleImage/BrailleImage";
class TextToBraile extends React.Component {
  constructor() {
    super();
    this.state = {
      textField: "",
      imageDisplay: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      textField: e.target.value,
      imageDisplay: e.target.value.split(""),
    });
  }
  render() {
    const { imageDisplay } = this.state;
    return (
      <div>
        <div>
          <h2>Generate your own Braille</h2>
        </div>
        <div>
          <p>
            Enter text below for it to be translated into braille. Spaces will
            be translated as blank spaces, however, other characters that are
            not English letters cannot be displayed.
          </p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter text here..."
            onChange={this.handleChange}
          />
          {imageDisplay.length > 0 ? (
            <BrailleImage letter={imageDisplay}/>
          ) : (
            " "
          )}
        </div>
      </div>
    );
  }
}

export default TextToBraile;