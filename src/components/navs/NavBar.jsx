import { useState } from "react";
import axios from "axios";
import { dividerClasses } from "@mui/material";
import DBConn from "../modules/speechModules/comps/connections/DBConn";
import APIkey from "../modules/speechModules/comps/connections/APIkey";

export default function NavBar() {
    const brandName = "TALKtrack"
    const [searchInput, setSearchInput] = useState('');
    const [datas, setDatas] = useState([]);
    const [start, setStart] = useState(0);
    const [online, setOnline] = useState('');

    let synth = window.speechSynthesis;
    let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let recognition;
    const [humanVoice, setHumanVoice] = useState('');

    useState(() => {
        setOnline(localStorage.getItem('apiKey'));
    }, [])
    const removeKey = () => {
        localStorage.removeItem("apiKey");
        localStorage.removeItem("apiKey");
        localStorage.removeItem("apiKey");
        localStorage.removeItem("apiKey");
    }

    function speak(voices) {
        const utterance = new SpeechSynthesisUtterance(voices);
        synth.speak(utterance);
    }

    function onClose() {
        setSearchInput('');
        setDatas([]);
    }


    async function startListening() {

        try {
            recognition = new SpeechRecognition();
            recognition.onstart = () => {
                setStart(1);
            }
            recognition.onresult = async (e) => {
                if (e.results.length > 0 && e.results[0].length > 0) {
                    let transcript = e.results[0][0].transcript;
                    setHumanVoice(transcript);
                    console.log(transcript);
                    let removeDot = transcript.replace(".", "");
                    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/home/session/alldata');
                    const filteredData = response.data.filter((data) => data.iden.toLowerCase().includes(removeDot.toLowerCase()));
                    console.log(filteredData)
                    await setDatas(filteredData);
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

    async function getResV() {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/home/session/alldata');
            const filteredData = await response.data.filter((data) => data.iden.toLowerCase().includes(humanVoice.toLowerCase()));
            console.log(filteredData)
            setDatas(filteredData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            // Handle the error as needed, e.g., show an error message to the user
        }
    }

    const handleSearchResult_Voice = () => {
        return (
            <div className="modal fade text-light modal-xl" id="staticBackdropV" data-bs-backdrop="static"
                data-bs-keyboard="true" tabIndex="-1"
                aria-labelledby="staticBackdropLabelV" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Search Result</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-light">

                            <div className="row mt-3">
                                {
                                    start ? (
                                        <div className="col-sm-6 mb-3 mb-sm-0 mt-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h3 className="card-title text-info"> Listening to your
                                                        bullshit </h3>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        datas.length > 0 ? (
                                            datas.map((data) => (
                                                <>
                                                    <div className="col-sm-6 mb-3 mb-sm-0 mt-2">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5 className="card-title text-info">✅ {data.iden}: </h5>
                                                                <p className="card-text">
                                                                    {data.storedData}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        ) : (
                                            <>
                                                <div className="col-sm-6 mb-3 mb-sm-0 mt-2">
                                                    <div className="card text-center ">
                                                        <div className="card-body">
                                                            <h3 className="card-title text-info">❌ Oppsi, No data
                                                                found!!!! </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal"
                                onClick={onClose}>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    function handleSearch(event) {
        setSearchInput(event.target.value);
    }

    async function getRes() {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/home/session/alldata');
            const filteredData = response.data.filter((data) => data.iden.toLowerCase().includes(searchInput.toLowerCase()));
            setDatas(filteredData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            // Handle the error as needed, e.g., show an error message to the user
        }
    }

    const handleSearchResult = () => {
        return (
            <div className="modal fade text-light modal-xl" id="staticBackdrop" data-bs-backdrop="static"
                data-bs-keyboard="true" tabIndex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Search Result</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-light">

                            <div className="row mt-3">
                                {
                                    datas.length > 0 ? (
                                        datas.map((data) => (
                                            <>
                                                <div className="col-sm-6 mb-3 mb-sm-0 mt-2">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title text-info">✅ {data.iden}: </h5>
                                                            <p className="card-text">
                                                                {data.storedData}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    ) : (
                                        <>
                                            <div className="col-sm-6 mb-3 mb-sm-0 mt-2">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h1 className="card-title text-info">❌ Oppsi, No data
                                                            found!!!! </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal"
                                onClick={onClose}>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    /*function DBConn() {
        return (
            <div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                                        <input type="text" className="form-control" id="recipient-name"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Message:</label>
                                        <textarea className="form-control" id="message-text"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Send message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }*/


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">{brandName}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/*<li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/speak">Speak And Store</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/speaktoai">Speak To Ai</a>
                            </li>*/}

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Manage App
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">Add Api Key</a></li>
                                    {/*<li><a className="dropdown-item" href="#">Enter Api Key</a></li>*/}
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item text-danger" href="/" onClick={removeKey}>Destroy Key</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form onSubmit={getRes}>
                            <div className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"

                                    onChange={handleSearch}
                                />
                                <form onSubmit={startListening}>
                                    <div className={"text-light me-2"}>
                                        <button className={"btn btn-secondary"} data-bs-toggle="modal"
                                            data-bs-target="#staticBackdropV" onClick={(e) => {

                                                e.preventDefault();

                                                startListening();
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="bi bi-mic" viewBox="0 0 16 16">
                                                <path
                                                    d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                                            </svg>
                                        </button>

                                    </div>
                                </form>

                                <button className="btn btn-outline-success" type="submit" data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop" onClick={(e) => {
                                        e.preventDefault()
                                        getRes()
                                    }}>Search
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </nav>
            {handleSearchResult()}
            {handleSearchResult_Voice()}
            <div className={"mt-4"}>
                {
                    online ? (
                        <>
                            <h1 className={"text-center text-success"}>
                                Online
                            </h1>
                        </>
                    ) : (
                        <>
                            <h1>
                                <h3 className={"text-center text-warning"}>Api Key Needed</h3>
                                <h4 className="text-center text-danger">Ai Session OFFLINE</h4>
                            </h1>
                        </>
                    )
                }
            </div>
            <APIkey></APIkey>
        </div>
    );
}
