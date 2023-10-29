import Component from "../../../sComp/Component";
import {useState} from "react";
import axios from "axios";

export default function SpeakAi() {
    let synth = window.speechSynthesis;
    let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let recognition;
    const [aiRes, setAiRes] = useState('');
    const [humanVoice, setHumanVoice] = useState('');
    const [text, setText] = useState('');

    async function startListening() {
        recognition = new SpeechRecognition();
        recognition.onresult = async (e) => {
            if (e.results.length > 0 && e.results[0].length > 0) {
                let transcript = e.results[0][0].transcript;
                await setHumanVoice(transcript);
                await chatGPTCompletion(transcript);
            } else {
                console.error("No speech recognition result found.");
            }
        };
        recognition.start();
    }

    async function chatGPTCompletion(prompt) {
        const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
        const apiKey = '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'; // Replace with your actual API key
        const maxTokens = 100; // Adjust based on your needs
        const temperature = 0.7; // Adjust based on your needs

        const response = await axios.post(apiUrl, {
            prompt: prompt,
            max_tokens: maxTokens,
            temperature: temperature
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (response.data.choices.length > 0) {
            const completionText = response.data.choices[0].text;
            for (let i = 0; i < completionText.length; i++) {
                let newChar = aiRes.charAt(aiRes.length - 1);
                setAiRes(completionText);
                console.log(completionText.charAt(i));
            }
        } else {
            console.log('No completion received.');
        }
    }

    const handleInputChange = (e) => {
        let newText = text + aiRes.charAt(text.length);
        setText(newText);
    }

    return (
        <>
            <div className="container text-center mt-3">
                <Component
                    title="Speak to Ai"
                    btnName="Start Ai Session"
                    func={startListening}
                ></Component>
                {
                    !aiRes ? (
                        <div className="mt-5">
                            <h1>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <h2>Waiting for Human to speak</h2>
                            </h1>
                        </div>
                    ) : (
                        <div className="card text-center mt-5">
                            <div className="card-header">
                                Featured
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <textarea name="" id="" cols="30" rows="10" value={aiRes}></textarea>

                            </div>
                            <div className="card-footer text-body-secondary">
                                2 days ago
                            </div>
                        </div>
                    )
                }


            </div>

        </>
    );
}
