import React, { Component } from "react";
import axios from "axios";
import "./Braille-to-text.scss";

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
    axios.post("http://127.0.0.1:5000/upload", fd, {}).then(
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
      <div className="container">
        <p className="headers">Braille Image to Text</p>
        <form>
        <div class="form-group">
          <div class="input-group">
            <input type="text" class="form-control" readOnly = {true} />
              <span class="fileUpload btn btn-success">
              <span class="upl" id="upload">Select File</span>
            <input
              type="file"
              name="file"
              onChange={(e) => this.handleFile(e)}
              className = "upload up"
            />
            </span>
            </div>
          </div>
          <br />
          <div className="form-group">
            <button className="button" onClick={(e) => this.handleUpload(e)}>Upload</button>
          </div>
          <div className = "resulttext">
            <span>The Braille Text is: <span className = "text"> {answer}</span> </span>
          </div>
        </form>  
      </div>
    );
  }
}

export default BrailleToText;
