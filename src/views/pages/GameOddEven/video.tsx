import React, { useEffect, useState } from 'react';
import Iframe from './iframe';
import VideoJsPlayer from './player';
import RacingService from 'services/RacingService';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { setRaceStreamData } from 'store/slices/racecard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const VideoView = styled(Stack)(({ theme }) => ({
    minHeight: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    color: 'rgb(255, 255, 255)',
    fontSize: '18px',
    borderRadius: '10px',
    textAlign: 'center',
    fontWeight: '700',
    padding: '20px',
    backgroundColor: alpha(theme.palette.secondary.main, 0.15)
}));

const VideoIframe = styled(Grid)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    maxWidth: '660px',
    height: '100%',
    'iframe':{
        width: '660px !important',
        height: '346px',
    }
}));

interface IStream {
    provider?: string;
    programId?: string;
    venueCode?: any;
    iframeFlag: string;
    streamId?: string;
    streamUrl: string;
    message: string;
    isPaid: boolean;
    player?: string;
}
interface VideoProps {
    venueId: any; // Replace `any` with the specific type if available
    status: any;
}

const RaceVideo = ({ venueId, status }: VideoProps) => {
    const dispatch = useAppDispatch();
    const { raceStreamData } = useAppSelector((state: any) => state.raceinfo);
    const [streamObj, setStreamObj] = useState<IStream>({ message: '', iframeFlag: '', player: '', streamUrl: '', isPaid: false });
    const [player, setPlayer] = useState({
        fill: true,
        fluid: true,
        autoplay: true,
        controls: true,
        preload: 'metadata',
        sources: [
            {
                src: 'https://v3.szjal.cn/20191101/PZzNpqB1/index.m3u8',
                type: 'application/x-mpegURL'
            }
        ]
    });
    const getStreamDetails = async () => {
        setStreamObj({ message: '', iframeFlag: '', player: '', streamUrl: '', isPaid: false });
        const response = await RacingService.getStreamData(venueId);
        if (response.data.body && response.data.body.data) {
            const data = response.data.body.data;
            console.log(data);
            if (data.provider === 'SIS') {
                const result = await RacingService.getSISStreamUrl(data.streamId);
                data.iframeFlag = 'N';
                if (result.data.body.data.error !== undefined && result.data.body.data.error) {
                    data.message = result.data.body.data.error;
                } else {
                    data.message = '';
                    data.iframeFlag = 'Y';
                    data.streamUrl = result.data.body.data.phenixEmbedUrl;
                }
            }
            dispatch(setRaceStreamData(data));
        }
    };
    useEffect(() => {
        if (venueId) getStreamDetails();
    }, [venueId]);

    useEffect(() => {
        if (raceStreamData) {
            console.log('RACE STREAM CHANGE====', raceStreamData);
            if (raceStreamData.iframeFlag === 'N' && raceStreamData.player === 'videojs') {
                const source = { sources: [{ src: raceStreamData.streamUrl, type: 'application/x-mpegURL' }] };
                setPlayer({ ...player, ...source });
                dispatch(setRaceStreamData(raceStreamData));
            }
            setStreamObj(raceStreamData);
        }
    }, [raceStreamData]);
    return (
        <>
            <Grid>
                <Grid>
                    {/* <p>Live from Turffontein (SA) - 02 May 2023 10:45:23</p> */}
                    <VideoIframe className="videoview 1">
                        {status !== 'FINAL' &&
                        streamObj.iframeFlag === 'Y' &&
                        (streamObj.message === undefined || streamObj.message === '') ? (
                            <Iframe venueCode={streamObj.venueCode} streamUrl={streamObj.streamUrl} />
                        ) : status !== 'FINAL' && streamObj.iframeFlag === 'N' && streamObj.player === 'videojs' ? (
                            <VideoJsPlayer {...player} />
                        ) : status !== 'FINAL' && streamObj.message !== '' ? (
                            <VideoView className="messageview">
                                {streamObj.message} <p className="videovenunamerace">{streamObj.venueCode}</p>{' '}
                            </VideoView>
                        ) : status !== 'FINAL' && streamObj.message === '' ? (
                            <VideoView className="messageview">
                                LIVE STREAM WILL BE AVAILABLE WHEN THE HORSES ARE AT THE POST{' '}
                                <p className="videovenunamerace">{streamObj.venueCode}</p>{' '}
                            </VideoView>
                        ) : (
                            <VideoView className="messageview">
                                {' '}
                                RACE FINISHED <p className="videovenunamerace">{streamObj.venueCode}</p>{' '}
                            </VideoView>
                        )}
                    </VideoIframe>
                </Grid>
                {/* <StyledVideoViewUpdate>
          <p>Updates</p>
          <span title=''>Horse 11 - COUNTRY S VERSE has been scratched</span>
        </StyledVideoViewUpdate> */}
            </Grid>
        </>
    );
};

export default RaceVideo;
