import {useState} from "react";

export default function DBConn() {
    const [url, setUrl] = useState('');
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [port, setPort] = useState('');

    function getUrl(event) {
        setUrl(event.target.value);
    }
    function getUsername(event) {
        setUsername(event.target.value);
    }
    function getPwd(event) {
        setPwd(event.target.value);
    }
    function getPort(event) {
        setPort(event.target.value);
    }

    async function sendInfoToServer() {
        try{
            let response = await fetch('http://localhost:2000/connect', {
                method: 'POST',
                body: JSON.stringify({
                    url: url,
                    username: username,
                    pwd: pwd,
                    port: port
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                // Handle a successful response
                sessionStorage.setItem("connected", "true");
                console.log('Data sent successfully');
                // You can also reset the form fields if needed
                setUrl('');
                setUsername('');
                setPwd('');
                setPort('');
            } else {
                // Handle the response for other status codes
                console.error('Failed to send data. Status code:', response.status);
            }
        } catch (e) {

        }
    }



};
