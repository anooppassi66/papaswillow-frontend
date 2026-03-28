import React, { useEffect, useState } from "react";

interface childProps {
    streamUrl: string;
    venueCode: string;
}
const Iframe = (props:childProps) => {
    const [url, setUrl] = useState('');
    useEffect(()=>{
        if(props.streamUrl!='')
        setUrl(props.streamUrl);
    },[props.streamUrl])
    return (
        <>
            <iframe id="iframe" src={url} style={{ width: "100%" }} allowFullScreen />
            {/* <p className=' videovenunamerace'>{props.venueCode}</p> */}
        </>
    );
}
export default Iframe;