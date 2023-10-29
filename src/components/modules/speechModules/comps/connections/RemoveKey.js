import {useEffect} from "react";

export default function RemoveKey(){
    useEffect(() =>{
        localStorage.removeItem("apiKey");
    }, [])

    return(
      <></>
    );
}
