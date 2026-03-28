import React, { useRef, useState, useEffect } from 'react';
import videojs from 'video.js';

import 'video.js/dist/video-js.css';

const VideoJsPlayer = (props: any) => {
    const videoRef = useRef(null);
    const [player, setPlayer] = useState<any>(null);

    useEffect(() => {
        if (!videoRef.current || player) return;

        const initPlayer = videojs(videoRef.current, props, function onPlayerReady() {});
        setPlayer(initPlayer);

        return () => {
            if (initPlayer) {
                initPlayer.dispose();
            }
        };
    }, [props, player]);

    return (
        <div>
            <div data-vjs-player>
                <video ref={videoRef} className="video-js" />
            </div>
        </div>
    );
};

export default VideoJsPlayer;
