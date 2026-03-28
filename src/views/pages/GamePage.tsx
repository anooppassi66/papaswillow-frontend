/**
 * Component dedicated to display external content and game provider games.
 *
 * First call API to get an external provider game URL, often sign by a special token.
 * If our API return a URL, add iFrame with a URL.
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// Service

// Try to move this to a game section?

import Page from './Page';
import Loading from 'views/Loading';
import { fetchGameDetails } from 'api/GameApi';

const GamePage = () => {
    console.log('testme');
    const { providerId, gameId } = useParams();
    // State
    const [gameURL, setGameURL] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const hideSpinner = () => {
        setLoading(false);
    };

    const setIFrameURL = async (apiOpenGameURL: string) => {
        const gameURL: any = await fetchGameDetails(apiOpenGameURL);
        if (gameURL.status) {
            console.log(gameURL, 'gameURL');
            const gameIframeUrl = gameURL.data.data;
            setGameURL(gameIframeUrl);
            if (providerId === 'evo') {
                setEvolutionScript(gameIframeUrl);
            }
        } else {
            hideSpinner();
            setMessage(gameURL.error);
        }
    };

    const setEvolutionScript = (url: string) => {
        const scripturl = 'https://studio.evolutiongaming.com/mobile/js/iframe.js';
        let script = document.createElement('script');
        script.src = scripturl;
        script.type = 'application/javascript';
        script.async = true;
        document.head.appendChild(script);
        // setTimeout(() => {
        //     const scripturl2 = '/iframe.js';
        //     let script2 = document.createElement("script");
        //     script2.src = scripturl2;
        //     script2.type = "application/javascript";
        //     script2.async = true;
        //     document.head.appendChild(script2);
        // }, 2000);
    };

    useEffect(() => {
        setIFrameURL(`/game/${providerId}/${gameId}/open/?partner=arionplay`);
    }, [providerId, gameId]);

    return (
        <Page key={`${providerId}/${gameId}`} title="Game" favicon={'favicon.ico'} hideScroll={true}>
            {loading && <Loading />}
            {gameURL && (
                <iframe
                    key={gameURL}
                    id="game"
                    name="Game"
                    src={gameURL}
                    scrolling="yes"
                    allowFullScreen={true}
                    onLoad={hideSpinner}
                    width="100%"
                    height="100%"
                ></iframe>
            )}
            {message !== '' && (
                <Stack justifyContent="center" alignItems="center" direction="row" height="100%">
                    <Typography variant="body1">{message}</Typography>
                </Stack>
            )}
        </Page>
    );
};

export default GamePage;
