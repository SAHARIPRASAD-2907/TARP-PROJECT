import React,{useState} from 'react'
import "node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import axios from "axios";
const FileDownload = require('js-file-download');


const SignLanguage = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const [state,setState] = useState("");
  const [status,setStatus] = useState("")

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  const generateVideo =()=>{
    console.log("string:"+state);
    const fd = new FormData()
    fd.append("speech",transcript)
    if(state){
        axios.post("http://127.0.0.1:5001/upload2",fd).then(
        (res)=>{
            if(res.data){
                setStatus(res.data);
                console.log("Received Data-"+status);
            }  
        },
        (err)=>{
            console.log(err);
        }
    )
    }
    if(status){
        axios.get("http://127.0.0.1:3002/receive").then(
            (res)=>{
                console.log("data received sucessfully");
                FileDownload(res.data, 'test.mp4');
            }
        )
    }
  }
  

  return (
    <div>
      <button onClick={()=>{
          SpeechRecognition.startListening();
      }}>Start</button>
      <button onClick={()=>{
          SpeechRecognition.stopListening();
          setState(transcript)
      }}>
      Stop
      </button>
      <button onClick={()=>{
          resetTranscript();
          setState("")
      }}>Reset</button>
      <p>{transcript}</p>
      <button onClick={generateVideo}>genrate</button>
      <br/>
      <Player
      playsInline
      poster="test.mp4"
      src="test.mp4"
    />

      
    </div>
  )
}
export default SignLanguage;