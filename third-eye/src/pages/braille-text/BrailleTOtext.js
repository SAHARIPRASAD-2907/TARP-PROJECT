import React, { Component } from "react";
import axios from "axios";
import './Braille-to-text.scss';

class BrailleToText extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      answer: "",
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file });
  }
  handleUpload(e) {
    e.preventDefault();
    console.log(this.state.file, "STATE ---- $$$$");
    const fd = new FormData();
    fd.append("file", this.state.file, this.state.file.name);
    axios
      .post("http://127.0.0.1:5000/upload", fd, {})
      .then(
        (res) => {
          this.setState({ answer: res.data });
        },
        (err) => {
          console.log(err);
        }
      );
  }
  render() {
    const { answer } = this.state;
    return (
      <div className = 'container mt-4'>
        <div className="display-4 text-center mb-4">
          <h1>Image to braille</h1>
          <form>
            <div>
              <label>Select File</label>
              <input
                type="file"
                name="file"
                onChange={(e) => this.handleFile(e)}
              />
            </div>
            <br />
            <button onClick={(e) => this.handleUpload(e)}>Upload</button>
            <h1>{answer}</h1>
          </form>
        </div>
      </div>
    );
  }
}

export default BrailleToText;
