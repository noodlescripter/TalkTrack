import axios from "axios";
import { useEffect, useState } from "react";
import OpenAI from "openai";

export default function AiSession() {
    let synth = window.speechSynthesis;
    let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let recognition;
    const [aiRes, setAiRes] = useState('');
    const [humanVoice, setHumanVoice] = useState('');
    const [start, setStart] = useState(0);
    const [secretKey, setSecretKey] = useState('');
    const [saved, setSave] = useState('');
    const [mode, setMode] = useState('chatMode');
    const [check, setCheck] = useState('');
    const [compErr, setCompErr] = useState(false);

    useEffect(() => {
        setSecretKey(localStorage.getItem('apiKey'));
        setCompErr(false);
    }, []);

    const getApiKey = () => {
        return localStorage.getItem("apiKey");
    }

    function speak(voices) {
        const utterance = new SpeechSynthesisUtterance(voices);
        synth.speak(utterance);
    }

    function handleMode(event) {
        if (event.target.checked) {
            setMode('conversationMode');
        } else {
            setMode('chatMode');
        }
    }

    function isListening() {
        if (start) {
            return (
                <>
                    <div className="container-fluid text-center text-light mt-3 bg-warning">
                        <h3>Listening To Your Bullshit, Please go on</h3>
                    </div>
                </>
            )
        }

    }

    async function startListening() {
        setAiRes('');
        try {
            recognition = new SpeechRecognition();
            recognition.onstart = () => {
                setStart(1);
            }
            recognition.onresult = async (e) => {
                if (e.results.length > 0 && e.results[0].length > 0) {
                    let transcript = e.results[0][0].transcript;
                    await setHumanVoice(transcript);
                    await openAi(transcript);
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

    function stopSpeech() {
        if (synth) {
            const newLocal = "Ok Stopedd now...........................................................";
            console.log(newLocal);
            synth.cancel();
        } else {
            console.error("Speech recognition is not active.");
        }
    }

    let openAiError = () => {
        if (compErr) {
            return (
                <div>
                    <div className="container text-center mt-3">
                        <h3 className="text-danger">
                            You do not have permission or valid api key. Please contact developers for more information, Thanks.
                        </h3>
                        <p className="text-warning ">Note: If you just enterd api key then start the session or refresh the browser window</p>
                    </div>
                </div>
            )
        }
    }

    const openAi = async (prompt) => {
        const openai = new OpenAI({
            apiKey: getApiKey(), dangerouslyAllowBrowser: true
        });

        try {
            const completion = await openai.chat.completions.create({
                messages:
                    [
                        {
                            role: "user", content: prompt
                        }
                    ],
                model: 'gpt-3.5-turbo'
            });
            console.log("Completion: ", completion.choices[0].message.content);
            await setAiRes(completion.choices[0].message.content);
            setCompErr(false);
            if (mode === 'conversationMode') {
                console.log("Now in conversationMode");
                let utterance = new SpeechSynthesisUtterance(completion.choices[0].message.content);
                synth.speak(utterance); 
                
            } else {
                console.log("Not in conversation Mode");
            }

        } catch (e) {
            console.error(e);
            setCompErr(true);
        }
    }

    const openAiRendar = (e) => {
        e.preventDefault();
        openAi(humanVoice);
    }

    async function saveContent() {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/home/session", {
                method: 'POST',
                body: JSON.stringify({
                    iden: humanVoice,
                    storedData: aiRes
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log("working");
                setHumanVoice('');
                setAiRes('');
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


    const showRes = () => {
        if (true) {
            return (
                <>
                    <div className="mt-3 start-0">

                        <div className="card-body">
                            <div className={"card-title"}><h5 className={"text-warning-emphasis"}>Ai Response</h5>
                            </div>
                            <div className={"mt-1"}>
                                <label htmlFor="contentName" className={"form-label"}>Question:</label>
                                <input className={"form-control"} type="text" name="iden" id="contentName"
                                    value={humanVoice}
                                    onChange={(e) => setHumanVoice(e.target.value)}
                                />
                            </div>
                            <div className={"mt-1"}>
                                <label htmlFor={"aiResponse"} className={"form-label"}>Ai Response:</label>
                                <textarea className={"form-control"} name="storedData" id="aiResonse" cols="30"
                                    rows="10" readOnly={true} value={aiRes}></textarea>
                            </div>

                            <div className={"mt-3"}>
                                {
                                    mode === 'chatMode' ? (
                                        <button className="btn btn-primary me-2" disabled = {!humanVoice ? true: null} onClick={openAiRendar}>Ask</button>
                                    ) : null
                                }
                                <button className={"btn btn-success me-2"} disabled={aiRes ? false : true} onClick={saveContent}>Save</button>
                                <button className={"btn btn-danger"} hidden ={aiRes ? false : true}  onClick={stopSpeech}>Stop</button>
                            </div>
                        </div>

                    </div>
                </>
            );
        } else {
            return (
                <>
                    {
                        start ? (
                            <div className={"container text-center"}>
                                <h3 className={"text-muted"}>
                                    Listening to your bullshit!!!!
                                </h3>
                            </div>
                        ) : (
                            <>
                                <div className={"container text-center"}>
                                    <h3 className={"text-muted"}>
                                        Click to start the session!!
                                    </h3>
                                </div>
                            </>
                        )
                    }
                </>
            )
        }
    }

    return (
        <>
            {
                statusMsg()
            }

            <h5 className="card-title">Ai Session</h5>
            <p className="card-text">Engage in a conversational AI session to get assistance and save
                important
                information.</p>

            <button className="btn btn-primary" onClick={startListening} disabled={mode === 'conversationMode' ? false : true}>Start Ai Session</button>
            {
                isListening()
            }
            {
                openAiError()
            }
            <div className="mt-2 text-start">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="mode" onChange={handleMode} />
                    <label class="form-check-label" for="mode">{mode === 'chatMode' ? "Chat Mode" : "Conversation Mode"}</label>
                </div>
            </div>
            <div className={"container text-start shadow-lg p-3 mb-5 bg-body-tertiary rounded mt-5"}>
                {showRes()}
            </div>


        </>
    )
}
