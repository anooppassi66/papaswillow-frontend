import React, { useRef, useEffect } from 'react';
import screenfull from 'screenfull';

interface storeVideoProps {
    toggleStore: Function;
}
const videoSrc = 'https://projects.amigosmartech.com/cricket.mp4';
export const StoreVideo: React.FC<storeVideoProps> = ({ toggleStore }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    useEffect(() => {
        const handleFullScreenExit = () => {
            console.log('Exited fullscreen');
            // Call your function here
            yourFunction();
        };

        if (screenfull.isEnabled) {
            screenfull.on('change', () => {
                if (!screenfull.isFullscreen) {
                    handleFullScreenExit();
                }
            });

            // Attempt to go fullscreen when the component mounts
            if (videoRef.current) {
                screenfull.request(videoRef.current);
            }
        }

        // Cleanup the event listener on unmount
        return () => {
            if (screenfull.isEnabled) {
                screenfull.off('change', handleFullScreenExit);
            }
        };
    }, []);

    const yourFunction = () => {
        // Your function logic here
        toggleStore();
    };
    return (
        <div>
            <video ref={videoRef} src={videoSrc} controls autoPlay style={{ width: '100%', display: 'block' }}>
                Your browser does not support the video tag.
            </video>
        </div>
    );
};
