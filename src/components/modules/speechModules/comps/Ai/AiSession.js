import axios from "axios";
import {useEffect, useState} from "react";
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

    useEffect(() =>{
        setSecretKey(localStorage.getItem('apiKey'));
    }, []);

    const getApiKey = () => {
        return localStorage.getItem("apiKey");
    }

    function speak(voices) {
        const utterance = new SpeechSynthesisUtterance(voices);
        synth.speak(utterance);
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
            let utterance = new SpeechSynthesisUtterance(completion.choices[0].message.content);
            synth.speak(utterance);
        } catch (e) {

        }
    }

    async function saveContent() {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/home/session", {
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

    const showRes = () => {
        if (aiRes) {
            return (
                <>
                    <div className="mt-3 start-0">
                        <form action="">
                            <div className="card-body">
                                <div className={"card-title"}><h5 className={"text-warning-emphasis"}>Ai Response</h5>
                                </div>
                                <div className={"mt-1"}>
                                    <label htmlFor="contentName" className={"form-label"}>Response Name</label>
                                    <input className={"form-control"} type="text" name="iden" id="contentName"
                                           value={humanVoice}
                                           onChange={(e) => setHumanVoice(e.target.value)}
                                    />
                                </div>
                                <div className={"mt-1"}>
                                    <label htmlFor={"aiResponse"} className={"form-label"}>Ai Response</label>
                                    <textarea className={"form-control"} name="storedData" id="aiResonse" cols="30"
                                              rows="10" readOnly={true} value={aiRes}></textarea>
                                </div>
                                <div className={"mt-3"}>
                                    <button className={"btn btn-success"} onClick={saveContent}>Save</button>
                                </div>
                            </div>
                        </form>
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
            <h5 className="card-title">Ai Session</h5>
            <p className="card-text">Engage in a conversational AI session to get assistance and save
                important
                information.</p>
            <a href="#" className="btn btn-primary" onClick={startListening}>Start Ai Session</a>
            <div className={"container text-start shadow-lg p-3 mb-5 bg-body-tertiary rounded mt-5"}>
                {showRes()}
            </div>


        </>
    )
}
