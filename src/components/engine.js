import {useState} from "react";

let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
export default function Engine() {
    let [voice, getVoice] = useState('');
   let recognition;
   function runRecog() {
    console.log("Listening...");
    recognition = new SpeechRecognition();
    recognition.onresult = (e) => {
        if (e.results.length > 0 && e.results[0].length > 0) {
            var transcript = e.results[0][0].transcript;
            document.getElementById('fillMe').value = transcript;
            document.getElementById('speak').innerHTML = transcript;
            localStorage.setItem('storedData', transcript);
            console.log("Data stored in localStorage:", transcript);
        } else {
            console.error("No speech recognition result found.");
        }
    };
    recognition.start();
}




return (
    <div className="bnt">

    </div>
)
} 
