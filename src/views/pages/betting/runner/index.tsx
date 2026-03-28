import React, { useState, useEffect } from 'react';
import RunnerHeader from './runnerheader';
import Runner from './runner';
import RunnerFixed from './runnerfixed';
import RunnerFooter from './runnerfooter';
import { setPositionsForSelectedPool, setPoolName, setLegsForSelectedPool } from 'store/slices/racecard';
import RacingService from 'services/RacingService';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import RaceCardResults from '../RaceCardResults';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

interface RaceInfoProps {
    programId: number;
    venueCode: string;
    venueName: string;
    raceStatus: string;
    raceName: string;
    distance: string;
    betType: string;
    raceTime: string;
    isSuspended: string;
    runners: IRunner[];
    poolsActive: IPool[];
    poolResults: IPoolResults[];
}
interface IRunner {
    runnerId: number;
    jockey_name: string;
    name: string;
    trainer_name: string;
    position: number;
    scratched: string;
}

interface IPool {
    name: string;
    shortDesc: string;
    type: string;
    unitBet: string;
    code: string;
}

interface IPoolResults {
    name: string;
    dividend: string;
    tickets: string;
    winner: string;
}
// Define the type for selectedRunnersList
type RunnerList = number[][];

const RunnerInfo = ({
    raceStatus,
    programId,
    venueCode,
    raceNumber,
    betType,
    runners,
    venueName,
    poolsActive,
    poolResults,
    isSuspended
}: RaceInfoProps & { raceNumber: number; betType: string }) => {
    const dispatch = useAppDispatch();

    const [selectedPool, setSelectedPool] = useState('win');
    const [selectedVenue, setSelectedVenue] = useState('');
    //const [selectedRunnersList, setSelectedRunnersList] = useState([]);

    // Initialize the state with a two-dimensional array
    const [selectedRunnersList, setSelectedRunnersList] = useState<RunnerList>([]);
    const theme = useTheme();
    const [selectedLeg, setSelectedLeg] = useState(1);
    const [positions, setPositions] = useState(1);
    const [legs, setLegs] = useState(0);
    const [betAmount, setBetAmount] = useState(0);
    const [unitBet, setUnitBet] = useState(0);
    const [boxOption, setBoxOption] = useState(false);
    const [oddsValuePaid, setOddsValuePaid] = useState(0);

    const changeSelectedPool = (poolName: string) => {
        const poolObject: any = RacingService.getPoolData(poolName);

        setLegs(poolObject.legs);
        setPositions(poolObject.bettingPos);
        dispatch(setPoolName(poolName));
        dispatch(setLegsForSelectedPool(legs));
        dispatch(setPositionsForSelectedPool(poolObject.bettingPos));
        setSelectedVenue(venueName);

        if (legs > 1) setSelectedLeg(1);
        const pool = poolsActive.filter((item) => {
            return item.code.toLowerCase() === poolName.toLowerCase();
        });
        if (pool.length > 0) setUnitBet(parseInt(pool[0].unitBet));
        setSelectedPool(poolName);
        initRunnersList(poolObject.legs, poolObject.bettingPos);
        setBoxOption(false);
    };

    useEffect(() => {
        changeSelectedPool('win');
    }, []);

    // Function to initialize the runners list
    const initRunnersList = (legs: number, positions: number) => {
        let arrayCount = 1;
        if (positions === 1) {
            arrayCount = legs > 0 ? legs : positions;
        } else {
            arrayCount = positions;
        }

        // Create a two-dimensional array based on arrayCount
        const arr: number[][] = [];
        for (let i = 0; i < arrayCount; i++) {
            arr[i] = [];
        }
        setSelectedRunnersList(arr);
    };

    const selectedRunners = (position: any, runner: any) => {
        let positionRunner = position;
        if (legs > 1) positionRunner = selectedLeg - 1;
        const tempRunnersList = [...selectedRunnersList];
        if (!tempRunnersList[positionRunner]) {
            tempRunnersList[positionRunner] = [];
        }

        if (boxOption) {
            for (let i = 0; i < positions; i++) {
                const pos = tempRunnersList[i].indexOf(runner);
                if (pos >= 0) tempRunnersList[i].splice(pos, 1);
                else tempRunnersList[i].push(runner);
            }
        } else {
            const pos = tempRunnersList[positionRunner].indexOf(runner);
            if (pos >= 0) tempRunnersList[positionRunner].splice(pos, 1);
            else tempRunnersList[positionRunner].push(runner);
        }
        setSelectedRunnersList(tempRunnersList);
    };

    const selectedFixedRunners = (poolName: string, runner: any, oddsValuePaid: any) => {
        setOddsValuePaid(oddsValuePaid);
        poolName = poolName.toLowerCase();
        changeSelectedPool(poolName);
        const tempRunnersList: any = [];
        if (!tempRunnersList[0]) {
            tempRunnersList[0] = [];
        }
        tempRunnersList[0][0] = runner;
        if (selectedPool === poolName && selectedRunnersList.length > 0 && selectedRunnersList[0].includes(runner)) {
            tempRunnersList[0] = [];
        }

        setSelectedRunnersList(tempRunnersList);
    };

    const onClickAll = (position: number, checked: boolean) => {
        let positionRunner = position;
        if (legs > 1) positionRunner = selectedLeg;
        const tempRunnersList = [...selectedRunnersList];
        const arr: number[] = [];
        if (checked) {
            runners.forEach((item) => {
                if (item.scratched !== 'Y') arr.push(item.position);
            });
        }
        if (boxOption) {
            for (let i = 0; i < positions; i++) {
                tempRunnersList[i] = arr;
            }
        } else {
            tempRunnersList[positionRunner] = arr;
        }
        setSelectedRunnersList(tempRunnersList);
    };

    const onClickBox = (checked: boolean) => {
        setBoxOption(checked);
        initRunnersList(legs, positions);
    };

    const changeSelectedLeg = (leg: number) => {
        setSelectedLeg(leg);
    };

    const resetTicket = () => {
        changeSelectedPool(selectedPool);
    };

    const betCalculateAmount = (val: any) => {
        setBetAmount(val);
    };

    useEffect(() => {
        if (raceNumber) {
            changeSelectedPool('win');
        }
    }, [raceNumber]);

    useEffect(() => {
        if (betType === 'tote') {
            changeSelectedPool('win');
        } else {
            changeSelectedPool('fowin');
        }
    }, [betType]);

    return (
        <div style={{ background: '', width: '100%' }}>
            {(raceStatus === 'BNS' || raceStatus === 'BSP') && (
                <>
                    <div>
                        <p className="bet_status_text">
                            {raceStatus === 'BNS' ? 'Bets not started yet' : 'Stop Bet issued. Race results are yet to be published.'}
                        </p>
                    </div>
                </>
            )}
            {raceStatus === 'BST' && (
                <RunnerHeader
                    poolsActive={poolsActive}
                    onClickAll={onClickAll}
                    positions={positions}
                    selectedLeg={selectedLeg}
                    boxOption={boxOption}
                    legs={legs}
                    betType={betType}
                    onClickBox={onClickBox}
                    selectedRaceNumber={raceNumber}
                    selectedPool={selectedPool}
                    changeSelectedPool={changeSelectedPool}
                    changeSelectedLeg={changeSelectedLeg}
                />
            )}

            <Box
                sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '650px', overflow: 'auto', transition: 'all 0.3s' }}
            >
                {(raceStatus === 'ALC' || raceStatus === 'DRL') && poolResults !== undefined && poolResults.length > 0 && (
                    <>
                        <Stack sx={{
                                borderRadius: '6px 6px 0 0',
                                borderTop: 'none',
                                display: 'flex',
                                position: 'sticky',
                                top: '0px',
                                left: '0px',
                                zIndex: '1',
                                background: alpha(theme.palette.secondary.main,0.55),
                                padding: '10px 15px',
                                flexDirection:'row',
                        }}>
                            <span className="runners" style={{width: 'calc(100% - 120px)', fontWeight:'700'}}>RUNNERS</span>
                            <span className="win" style={{width: '60px', textAlign:'right', fontWeight:'700'}}>WIN</span>
                            <span className="place" style={{width: '60px', textAlign:'right', fontWeight:'700'}}>PLACE</span>
                        </Stack>
                        <div></div>
                        <RaceCardResults poolResults={poolResults} runners={runners} raceStatus={raceStatus} />
                    </>
                )}
                <Box
                    className={`${betAmount > 0 ? 'betvalid' : ''}`}
                    sx={{ background: '', display: 'flex', flexDirection: 'column', width: '100%' }}
                >
                    {betType === 'tote' &&
                        runners.map((runner: any) => (
                            <Runner
                                raceStatus={raceStatus}
                                name={runner.name}
                                betType={betType}
                                selectedPoolCode={selectedPool}
                                runner={runner}
                                key={runner.runnerId}
                                selectedLeg={selectedLeg}
                                boxOption={boxOption}
                                positions={positions}
                                legs={legs}
                                selectedRunnersList={selectedRunnersList}
                                selectedRunners={selectedRunners}
                            />
                        ))}
                    {betType === 'fixed' &&
                        runners.map((runner: any) => (
                            <RunnerFixed
                                raceStatus={raceStatus}
                                name={runner.name}
                                betType={betType}
                                isSuspended={isSuspended}
                                selectedPoolCode={selectedPool}
                                runner={runner}
                                key={runner.runnerId}
                                selectedLeg={selectedLeg}
                                boxOption={boxOption}
                                positions={positions}
                                legs={legs}
                                selectedRunnersList={selectedRunnersList}
                                selectedRunners={selectedFixedRunners}
                            />
                        ))}
                </Box>
            </Box>

            <RunnerFooter
                programId={programId}
                venueCode={venueCode}
                poolName={selectedPool}
                venueName={selectedVenue}
                unitBet={unitBet}
                setUnitBetFn={setUnitBet}
                raceNumber={raceNumber}
                resetTicket={resetTicket}
                betCalculateAmount={betCalculateAmount}
                legs={legs}
                oddsValuePaid={oddsValuePaid}
                selectedRunnersList={selectedRunnersList}
            />
        </div>
    );
};

export default RunnerInfo;
