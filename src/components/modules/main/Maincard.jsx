import {useEffect, useState} from "react";
import AiSession from "../speechModules/comps/Ai/AiSession";
import LocalSession from "../speechModules/comps/Local/LocalSession";
import axios from "axios";

export default function MainCard() {
    const [local, setLocal] = useState('active');
    const [ai, setAi] = useState('');
    const handleLocal = () => {
        setLocal("active");
        setAi('')
    }


    const handleAi = () => {
        setAi('active');
        setLocal('');
    }

    const componentToRender = () => {
        if (local) {
            return (
                <>

                   <LocalSession></LocalSession>

                </>
            )
        } else {
            return (
                <>

                    <AiSession></AiSession>

                </>
            )
        }
    }

    return (
        <>
            <div className="container text-center mt-3">
                <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <a className={"nav-link " + local} href="#" onClick={handleLocal}>Local Session</a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link " + ai} href="#" onClick={handleAi}>Ai Session</a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        {componentToRender()}
                    </div>
                </div>
            </div>

        </>
    )
}
