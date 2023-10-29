import {useState} from "react";


export default function Engine_(){
    let synth = window.speechSynthesis;
    let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let recognition;
    let [getVoice, setVoice] = useState('');
    function speak(voices) {
        const utterance = new SpeechSynthesisUtterance(voices);
        synth.speak(utterance);
    }
    function runRecog() {
        console.log("Listening...");
        recognition = new SpeechRecognition();
        recognition.onresult = (e) => {
            if (e.results.length > 0 && e.results[0].length > 0) {
                let transcript = e.results[0][0].transcript;
                speak(e.results[0][0].transcript);
                setVoice(transcript);
                console.log("Data stored in localStorage:", transcript);
            } else {
                console.error("No speech recognition result found.");
            }
        };
        recognition.start();
    }

    return(
        <div className="container text-center mt-3">
            <div className="row mt-3">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            Save Information
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Record and Save Information</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional
                                content.</p>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" onClick={runRecog}>
                                Start Recording
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            AI Assistant
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Ask Ai For Help and Save</h5>
                            <p className="card-text">Engage in a conversational AI session to get assistance and save
                                important
                                information..</p>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModalAI">
                                Start Ai Session
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Answer From AI</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form action="/home/session" method="POST">
                            <div className="modal-body">
                                <div className="mb-2">
                                    <input type="text" placeholder="Enter an identifier" className="form-control"
                                           name="iden" id="iden"/>
                                </div>
                                <div className="form-floating">
                                        <textarea className="form-control" placeholder="Ai Response" id="fillMeAi"
                                                  style={{
                                                      height: 500
                                                  }} name="storedData" value={getVoice}></textarea>
                                    <label htmlFor="fillMeAi">AI Response</label>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch"
                                           id="muteAI" name="muteAI" />
                                    <label htmlFor="flexSwitchCheckDefault" className="form-check-label">Mute </label>

                                </div>
                                <button type="button" className="btn btn-secondary"
                                        data-bs-dismiss="modal" onClick="stopAI()">Close
                                </button>

                                <button className="btn btn-danger" id="stop">Stop</button>
                                <button className="btn btn-success" id="continue">Speak</button>
                                <button type="submit" className="btn btn-primary disabled" id="saveAi">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    )
}
