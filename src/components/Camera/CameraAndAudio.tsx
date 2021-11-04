import { useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import './camera.scss'

export function CameraAndAudio() {
    const videoRef = useRef(null as unknown as HTMLVideoElement);
    // const [playing, setPlaying] = useState(false)
    const [audio, setAudio] = useState(true);
    
    useEffect(() => {
        startVideo();
    }, [videoRef])
    
    function startVideo() {
        // setPlaying(true);
        navigator.mediaDevices
            .getUserMedia({video: true, audio: true})
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error(err);
            })
    }


    // const stopVideo = () => {
    //     setPlaying(false);
    //     navigator.mediaDevices
    //         .getUserMedia({video: false, audio: true})
    //         .then(stream => {
    //             let video = videoRef.current;
    //             video.srcObject = stream;
    //             video.play();
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         })
    // }
    
    function startAudio() {
        
        setAudio(true);
        navigator.mediaDevices
            .getUserMedia({video: true, audio: true})
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error(err);
            })
    }

    function stopAudio() {
        setAudio(false);
        navigator.mediaDevices
            .getUserMedia({video: true, audio: false})
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error(err);
            })
    }


    return (
        <div className="camera">
            <video
                ref={videoRef}
            ></video>
            <div className="button-audio">
                {audio ? (
                    <Button isOutlined onClick={stopAudio}>Desligar Microfone</Button>
                ) : (
                    <Button isOutlined onClick={startAudio}>Ligar Microfone</Button>
                )}
            </div>
        </div>
    )
}

