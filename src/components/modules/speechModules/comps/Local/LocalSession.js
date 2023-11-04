import axios from "axios";
import {useEffect, useState} from "react";

export default function LocalSession() {
    let synth = window.speechSynthesis;
    let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let recognition;
    const [iden, setIden] = useState('');
    const [storedData, setStoredData] = useState('');
    const [saved, setSave] = useState('');
    const [visible, setVisible] = useState("visually-hidden");
    const [humanVoice, setHumanVoice] = useState('');
    const [start, setStart] = useState(0);
    async function startListening() {
        try {
            recognition = new SpeechRecognition();
            recognition.onstart = () => {
                setStart(1);
            }
            recognition.onresult = async (e) => {
                if (e.results.length > 0 && e.results[0].length > 0) {
                    let transcript = e.results[0][0].transcript;
                    await setHumanVoice(transcript);
                } else {
                    console.error("No speech recognition result found.");
                }
            };
            recognition.onend = () => {
                setStart(0);
            }
            recognition.start();
        } catch (error) {
            console.error("SpeechRecognition not supported in this browser:", error);
        }
    }
    function getInput(event) {
        setIden(event.target.value);
    }

    function getStoredData(event) {
        setStoredData(event.target.value);
    }

    async function saveContent() {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/home/session", {
                method: 'POST',
                body: JSON.stringify({
                    iden: iden,
                    storedData: humanVoice
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setIden('');
                setHumanVoice('')
                console.log("working")
                setSave('ok');
            } else {
                console.log("not working")
                setSave('fail');
            }
        } catch (e) {
            console.log("Something went wrong")
            setSave('error');
        }
    }

    let statusMsg = () => {
        if (saved === 'ok') {
            return (
                <div className="alert alert-success" role="alert">
                    Data Saved Successfully
                </div>
            )
        }
        if (saved === 'fail') {
            return (
                <div className="alert alert-warning" role="alert">
                    Not Able to save the data
                </div>
            )
        }
        if (saved === 'error') {
            return (
                <div className="alert alert-danger" role="alert">
                    Something went wrong!!
                </div>
            )
        }
    }


    let localSession = () => {
        return (
            <div className="mt-3 start-0">
                <>
                    <div className="card-body">
                        <div className={"card-title"}><h5 className={"text-warning-emphasis"}>Local Session</h5>
                        </div>
                        <div className={"mt-1"}>
                            <label htmlFor="contentName" className={"form-label"}>Name</label>
                            <input className={"form-control"} type="text" name="iden" id="contentName"
                                   onChange={getInput}
                            />
                        </div>
                        <div className={"mt-1"}>
                            <label htmlFor={"localResponse"} className={"form-label"}>Your Response</label>
                            <textarea className={"form-control"} name="storedData" id="localResponse" cols="30"
                                      rows="10" readOnly={false} value={humanVoice} onChange={(e) => setHumanVoice(e.target.value)}></textarea>
                        </div>
                        <div className={"mt-3"}>
                            <button className={"btn btn-success"} onClick={saveContent}>Save</button>
                        </div>
                    </div>
                </>
            </div>
        )
    }
    return (
        <div>
            {
                statusMsg()
            }
            <h5 className="card-title">Local Session</h5>
            <p className="card-text">The Local Session module records conversations and saves them in a database.</p>
            <a href="#" className="btn btn-primary" onClick={startListening}>Start Local Session</a>
            <div className={"container shadow-sm text-center mt-3"}>
                {
                    start ? (
                        <div className={"container text-center"}>
                            <h3 className={"text-muted text-warning"}>
                                Listening to your bullshit!!!!
                            </h3>
                        </div>
                    ) : (
                        <>
                            <div className={"container text-center"}>
                                <h3 className={"text-muted text-warning"}>
                                    Click to start the session || Enter Information and Save
                                </h3>
                            </div>
                        </>
                    )
                }
            </div>
            <div className={"container text-start shadow-lg p-3 mb-5 bg-body-tertiary rounded mt-5"}>
                {localSession()}
            </div>

        </div>
    )
}
