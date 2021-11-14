import "./App.scss";
import ReactPlayer from "react-player";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import { useState } from "react";

function App() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [state, setState] = useState("");
  const [status, setStatus] = useState({ data: false, data2: false });

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
            setStatus({ data: true });
            console.log("Received Data-" + status);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
    setStatus({ data2: true });
  };
  return (
    <div>
      <header>
        <h2>
          <p href="#">Sign language converter</p>
        </h2>
        <nav>
          <li>
            <p href="#">Ramkrithik</p>
          </li>
          <li>
            <p href="#">Anirudh</p>
          </li>
          <li>
            <p href="#">Parthasarathi</p>
          </li>
        </nav>
      </header>
      <section class="hero">
        <div class="hero-content-area">
          <h1>Sign lanuage converter!</h1>
          <h3>Talk with anyone you want freely</h3>
          <p href="#" class="btn">
            Contact Us for API
          </p>
        </div>
      </section>
      <div className="container">
        <h1 className="headers">Sign Language Converter API</h1>
        <img
          src="data:image/png;base64,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"
          onClick={() => {
            SpeechRecognition.startListening();
          }}
          className="microphone"
          alt="Start"
          title="Start Recording"
        />
        <img
          src="data:image/jpeg;base64,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"
          onClick={() => {
            SpeechRecognition.stopListening();
            setState(transcript);
          }}
          className="stoprec"
          alt="Stop"
          title="Stop Recording"
        />
        <img
          src="https://us.123rf.com/450wm/ahasoft2000/ahasoft20001601/ahasoft2000160100860/51452547-refresh-glyph-icon-style-is-bicolor-flat-circled-symbol-blue-and-gray-colors-rounded-angles-white-ba.jpg?ver=6"
          onClick={() => {
            resetTranscript();
            setState("");
            setStatus({ data: false, data2: false });
          }}
          className="reset"
          alt="Reset"
          title="Reset"
        />
        <p>{transcript}</p>
        <button onClick={generateVideo} className="btnsign">
          Generate
        </button>
        {!status.data2 ? (
          <div className="space">
            <div className="videogenerated">
              {status.data ? (
                <ReactPlayer
                  className="video"
                  url={require("./final.webm").default}
                  controls={true}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
