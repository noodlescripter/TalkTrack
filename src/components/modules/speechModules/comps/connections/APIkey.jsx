import {useState} from "react";

export default function APIkey() {
const [apikey, setapiKey] = useState('');

    function handleChange(event){
        setapiKey(event.target.value);
    }

    function storeApiKey(){
        console.log("Worked", apikey)
        localStorage.setItem("apiKey", apikey);
    }

    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Api Key</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                <p>To get the api key visit here: <a href="https://openai.com/product">OpenAI</a></p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dburl" className="col-form-label">Secret Key</label>
                                <input type="password" className="form-control" id="dburl" onChange={handleChange}/>
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <a type="button" className="btn btn-primary" href="/" onClick={storeApiKey}>Add
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}
