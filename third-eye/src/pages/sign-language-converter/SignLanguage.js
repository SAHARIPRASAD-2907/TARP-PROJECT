import React, { useState } from "react";
import "./sign-language-converter.scss";
import ReactPlayer from "react-player";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

const SignLanguage = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [state, setState] = useState("");
  const [status, setStatus] = useState({data:false});

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const generateVideo = () => {
    console.log("string:" + state);
    const fd = new FormData();
    fd.append("speech", transcript);
    if (state) {
      axios.post("http://127.0.0.1:5001/upload2", fd).then(
        (res) => {
          if (res.data) {
            setStatus({data:true});
            console.log("Received Data-" + status);

          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  return (
    <div>
      <h1>Text to sign Language</h1>
      <button
        onClick={() => {
          SpeechRecognition.startListening();
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          SpeechRecognition.stopListening();
          setState(transcript);
        }}
      >
        Stop
      </button>
      <button
        onClick={() => {
          resetTranscript();
          setState("");
          setStatus({data:false})
        }}
      >
        Reset
      </button>
      <p>{transcript}</p>
      <button onClick={generateVideo}>genrate</button>
      <br />
      {status.data ? <ReactPlayer url={require("./test.webm").default} controls={true} /> : "Sorry File still not generated" }
      
    </div>
  );
};
export default SignLanguage;
