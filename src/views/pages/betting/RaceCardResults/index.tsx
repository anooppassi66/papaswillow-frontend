import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

interface ChildProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
type RaceCardResults = {
    poolResults: any;
    runners: any;
    raceStatus: string;
};

const RaceCardResults: React.FC<RaceCardResults> = ({ poolResults, runners, raceStatus }) => {
    const [poolRaceResults, setPoolRaceResults] = useState([]);
    const [poolWinResults, setPoolWinResults] = useState([]);
    const [poolPlcResults, setPoolPlcResults] = useState([]);
    const [winners, setWinners] = useState([]);
    const theme = useTheme();
    const postionFormation = (val: any) => {
        switch (val.toString()) {
            case '1':
                return (
                    <span>
                        1<sup>st</sup>
                    </span>
                );
            case '2':
                return (
                    <span>
                        2<sup>nd</sup>
                    </span>
                );
            case '3':
                return (
                    <span>
                        3<sup>rd</sup>
                    </span>
                );
            default:
                return (
                    <span>
                        {val}
                        <sup>th</sup>
                    </span>
                );
        }
    };

    const poolResultsFn = () => {
        if (poolResults.length > 0) {
            const poolResultData = poolResults
                .map((item: any) => {
                    if (item.name !== 'WIN' && item.name !== 'PLC') {
                        return item;
                    }
                })
                .filter(Boolean);
            setPoolRaceResults(poolResultData);

            const poolWinResultData = poolResults
                .map((item: any) => {
                    if (item.name === 'WIN') {
                        return item.dividend;
                    }
                })
                .filter(Boolean);
            setPoolWinResults(poolWinResultData);

            let plcData: any[] = [];
            const poolPlcResultData = poolResults
                .map((item: any) => {
                    if (item.name === 'PLC') {
                        let d = item.dividend.split(',');
                        let w = item.winner.split(',');

                        for (let i = 0; i < w.length; i++) {
                            if (d[i] != undefined) plcData[w[i]] = parseInt(d[i]) ? parseInt(d[i]) : '-';
                            else plcData[w[i]] = '-';
                        }
                        return item;
                    }
                })
                .filter(Boolean);
            setPoolPlcResults(poolPlcResultData);

            if (runners.length > 0) {
                const poolWinnerResultData = runners
                    .map((runner: any) => {
                        if (runner.winPosition == 1 || runner.winPosition == 2 || runner.winPosition == 3) {
                            let w = runner.odds.WIN;
                            if (raceStatus === 'ALC') w = '';
                            let temp = {
                                name: runner.name,
                                position: runner.position,
                                winPosition: runner.winPosition ? parseInt(runner.winPosition) : '-',
                                winPositionFormat: postionFormation(runner.winPosition),
                                odds: { WIN: poolWinResultData, PLC: plcData[runner.position] }
                            };
                            //setWinners(temp);
                            return temp;
                        }
                    })
                    .filter(Boolean);
                setWinners(poolWinnerResultData);
            }
        }
    };
    useEffect(() => {
        if (poolResults) poolResultsFn();
    }, [raceStatus, poolResults]);

    return (
        <div>
            {/* <StyledResultHeader>
        <span className='runners'>RUNNERS</span>
        <span className='win'>WIN</span>
        <span className='place'>PLACE</span>
      </StyledResultHeader> */}
            <div>
                <ul style={{padding:'0px', margin:'0px',}}>
                    {winners != undefined &&
                        winners.length > 0 &&
                        winners?.map((item: any, index: number) => (
                            <li key={index} style={{
                                borderBottom:`1px solid ${alpha(theme.palette.secondary.main, 0.95)}`,
                                padding: '10px 15px',
                                width: '100%',
                                display: 'flex',
                            }}>
                                <span className="position" style={{width:'40px', color:'#fff'}}>
                                    <span className="" style={{color:'#fff'}}>{item.winPositionFormat}</span>
                                </span>
                                <span className="horse_no" style={{
                                        background: alpha(theme.palette.secondary.main,1),
                                        borderRadius: '2px',
                                        color: '#ffffff',
                                        height: '20px',
                                        lineHeight: '20px',
                                        marginRight: '10px',
                                        textAlign: 'center',
                                        width: '30px',
                                        fontWeight:'700',
                                }}>{item.position}</span>
                                <span className="horse_name"
                                 style={{
                                    fontSize: '12px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: 'calc(100% - 200px)',
                                    color: '#fff',
                                    fontWeight:'600',
                                 }}
                                >{item.name}</span>
                                <span className="win"
                                 style={{
                                    textAlign: 'right',
                                    width: '60px',
                                    color: '#fff',
                                    fontSize: '12px',
                                    lineHeight: '20px',
                                    fontWeight:'600',
                                 }}
                                >{item.odds.WIN}</span>
                                <span className="place"
                                 style={{
                                    textAlign: 'right',
                                    width: '60px',
                                    color: '#fff',
                                    fontSize: '12px',
                                    lineHeight: '20px',
                                    fontWeight:'600',
                                 }}
                                >{item.odds.PLC}</span>
                            </li>
                        ))}

                    {poolRaceResults != undefined &&
                        poolRaceResults.length > 0 &&
                        poolRaceResults?.map((items: any, index: number) => (
                            <li key={index}
                            style={{
                                borderBottom:`1px solid ${alpha(theme.palette.secondary.main, 0.95)}`,
                                padding: '10px 15px',
                                width: '100%',
                                display: 'flex',
                                fontWeight:'700',
                            }}
                            >
                                <span className="multi_pool"
                                style={{
                                    lineHeight: '16px',
                                    width: 'calc(100% - 60px)',
                                    color: '#c2c9d6',
                                    fontSize: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    fontWeight:'700',
                                }}
                                >
                                    {items.name}
                                    {items.winner !== '' && ','}
                                    <b>{items.winner}</b>
                                </span>
                                <span className="place"
                                  style={{
                                    textAlign: 'right',
                                    width: '60px',
                                    color:' #c2c9d6',
                                    fontSize: '12px',
                                    lineHeight: '20px',
                                    fontWeight:'700',
                                  }}
                                >{items.dividend}</span>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default RaceCardResults;
