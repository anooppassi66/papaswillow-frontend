import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
// import 'videojs-http-streaming';

type PropsType = {
    source: string;
};

const VideoPlayer = ({ source }: PropsType) => {
    const videoRef = useRef(null);
    let player: null | Player = null;

    useEffect(() => {
        if (!videoRef.current || player) return;
        // Initialize the video player
        player = videojs(videoRef.current, {
            preload: 'metadata',
            // aspectRatio: '16:9',
            autoHeight: true,
            autoWidth: true,
            fill: true,
            fluid: false,
            responsive: true,
            autoplay: 'muted',
            normalizeAutoplay: true,
            // muted: false,
            controls: true,
            preferFullWindow: false,
            disablePictureInPicture: true,
            // fullscreen: {options: {navigationUI: 'hide'},
            // autoplay: 'muted',
            // children: [
            //   'bigPlayButton',
            //   'controlBar'
            // ],
            // controlBar: {
            //   skipButtons: {
            //     forward: 10,
            //     backward: 10,
            //   }
            // },
            sources: [
                {
                    src: source,
                    type: 'application/x-mpegURL'
                }
            ],
            html5: {
                playsinline: true,
                nativeTextTracks: false
                // hls: {
                //   overrideNative: true
                // },
            }
        });
        return () => {
            // Dispose of the video player when the component unmounts.
            if (player) {
                player.dispose();
            }
        };
    }, [source]);

    return (
        <div key={source} data-vjs-player>
            <video ref={videoRef} className="video-js"></video>
        </div>
    );
};

export default VideoPlayer;
