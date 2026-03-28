import React, { useEffect, useState } from 'react';
import { PlusIconSvg, SelectedSvg } from 'assets/svg';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { IconCheck } from '@tabler/icons-react';
import { IconPlus } from '@tabler/icons-react';
import BorderRadius from 'layout/Customization/BorderRadius';
import Skeleton from '@mui/material/Skeleton';


interface ButtonCheck {
    theme: Theme;
}

const ButtonCheck = styled(Button)(({ theme }) => ({
    // background: '#ff0000',
    borderRadius: '10px',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    height: '42px',
    width: '52px',
    backgroundColor: theme.palette.dark[800],
    padding: '0px',
    color:'#fff',
    fontWeight:'700',
    minWidth:'62px',
    // backgroundImage: 'url(assets/images/landing/Horse Racing-Fixed.jpg)',

    backgroundSize: 'cover',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',

    svg: {
        strokeWidth: '3',
        height: '22px',
        width: '22px',
        path: {
            stroke: '#fff'
        }
    },

    '&.active': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.55), // Adjust this color as needed
        borderColor: alpha(theme.palette.secondary.main, 0.95) // Adjust this color as needed
    }
}));

const HorseRider = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down(1023)]: {
        width:'58px !important',
      },
    width: '45px',
    height: '80px',
    border: '1px solid #c20e0e',
    borderRadius: '5px',
    marginRight: '15px',
    overflow: 'hidden',
    color: '#ffffff',
    textAlign: 'center',
    transition: 'all 0.3s',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'Poppins'
}));

const HorseRacingMain = styled(Grid)(({ theme }) => ({
    // height:'650px',
    '&.scratched':{
        opacity:' 0.4',
        borderBottom:`2px solid ${alpha(theme.palette.secondary.main, 0.95)} !important`,
    },
    '&:nth-child(1)': {
        '.horseuser': {
            border: '1px solid #c20e0e',
            '.infonumber': {
                background: '#c20e0e'
            }
        }
    },

    '&:nth-child(2)': {
        '.horseuser': {
            border: '1px solid #2659c2',
            '.infonumber': {
                background: '#2659c2'
            }
        }
    },
    '&:nth-child(3)': {
        '.horseuser': {
            border: '1px solid #7f0cf2',
            '.infonumber': {
                background: '#7f0cf2'
            }
        }
    },
    '&:nth-child(4)': {
        '.horseuser': {
            border: '1px solid #00aa4f',
            '.infonumber': {
                background: '#00aa4f'
            }
        }
    },
    '&:nth-child(5)': {
        '.horseuser': {
            border: '1px solid #87ef0c',
            '.infonumber': {
                background: '#87ef0c'
            }
        }
    },
    '&:nth-child(6)': {
        '.horseuser': {
            border: '1px solid #f7ba05',
            '.infonumber': {
                background: '#f7ba05'
            }
        }
    },
    '&:nth-child(7)': {
        '.horseuser': {
            border: '1px solid #9e29bf',
            '.infonumber': {
                background: '#9e29bf'
            }
        }
    },
    '&:nth-child(8)': {
        '.horseuser': {
            border: '1px solid #e80f9d',
            '.infonumber': {
                background: '#e80f9d'
            }
        }
    },
    '&:nth-child(9)': {
        '.horseuser': {
            border: '1px solid #d96a19',
            '.infonumber': {
                background: '#d96a19'
            }
        }
    },
    '&:nth-child(10)': {
        '.horseuser': {
            border: '1px solid #8bb518',
            '.infonumber': {
                background: '#8bb518'
            }
        }
    },
    '&:nth-child(11)': {
        '.horseuser': {
            border: '1px solid #0e5e17',
            '.infonumber': {
                background: '#0e5e17'
            }
        }
    },
    '&:nth-child(12)': {
        '.horseuser': {
            border: '1px solid #2b5660',
            '.infonumber': {
                background: '#2b5660'
            }
        }
    },
    '&:nth-child(13)': {
        '.horseuser': {
            border: '1px solid #7b3535',
            '.infonumber': {
                background: '#7b3535'
            }
        }
    },
    '&:nth-child(14)': {
        '.horseuser': {
            border: '1px solid #392d5b',
            '.infonumber': {
                background: '#392d5b'
            }
        }
    },
    '&:nth-child(15)': {
        '.horseuser': {
            border: '1px solid #228274',
            '.infonumber': {
                background: '#228274'
            }
        }
    },
    '&:nth-child(16)': {
        '.horseuser': {
            border: '1px solid #12afbf',
            '.infonumber': {
                background: '#12afbf'
            }
        }
    },
    '&:nth-child(17)': {
        '.horseuser': {
            border: '1px solid #12bf5e',
            '.infonumber': {
                background: '#12bf5e'
            }
        }
    },
    '&:nth-child(18)': {
        '.horseuser': {
            border: '1px solid #4e199b',
            '.infonumber': {
                background: '#4e199b'
            }
        }
    },
    '&:nth-child(19)': {
        '.horseuser': {
            border: '1px solid #7b0d46',
            '.infonumber': {
                background: '#7b0d46'
            }
        }
    }
}));

const HorseRiderDetails = styled(Stack)(({ theme }) => ({
    width:'calc(100% - 247px)', 
    display:'flex', 
    flexDirection:'column', gap:'0px',
    [theme.breakpoints.down(1023)]: {
        width:'100% !important',
      },
      [theme.breakpoints.down(600)]: {
        flexDirection:'column !important',
      },


}));

const HorseRiderButton = styled(Stack)(({ theme }) => ({
    width:'192px', display:'flex', flexDirection:'column', alignItems:'end', justifyContent:'center',
    [theme.breakpoints.down(1023)]: {
        width: '100% !important',
        },

}));

const RaceCardDetails = styled('li')(({ theme }) => ({
    '&.tan':{
    [theme.breakpoints.down(1023)]: {
        display:'initial',
        float:'left',
      },
    '.horseuser':{ width: '40px !important', float:'left',},
    '.tanriderdetails':{ width:'calc(100% - 60px)  !important', float:'left', gap:'0px'},
    '.tanbtn':{ width: '100% !important',
        'svg':{
            strokeWidth: '3px',
            height: '16px',
            width: '16px',
            position: 'absolute',
            top: '1px',
            right: '4px',
        },
        '.winbutton':{
            minWidth:'40px',
            width:'50px',
            height:'35px',
            fontWeight:'700',
            'p':{fontWeight:'700',}
        }
    },
    },
   background: '', display: 'flex', flexDirection: 'row', gap: '10px'
   

}));

type RunnerType = {
    runner: any;
    raceStatus: string;
    betType: string;
    name: string;
    selectedPoolCode: string;
    selectedRunners: Function;
    selectedRunnersList: any;
    selectedLeg: number;
    positions: number;
    legs: number;
    boxOption: boolean;
};
// Define the type for selectedRunnersList
type RunnerList = number[][];

const Runner: React.FC<RunnerType> = ({
    runner,
    raceStatus,
    betType,
    name,
    selectedPoolCode,
    selectedRunners,
    selectedRunnersList,
    selectedLeg,
    positions,
    legs,
    boxOption
}) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulate an API call or data fetching
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
        // const downMD = useMediaQuery(theme.breakpoints.down('md'));
    }, []);
    const [numberOfPositions, setNumberOfPositions] = useState(1);
    const [runnersList, setRunnersList] = useState<RunnerList>([]);
    useEffect(() => {
        let pos = 1;
        if (!boxOption) pos = positions;
        setNumberOfPositions(pos);
    }, [positions, boxOption]);

    useEffect(() => {
        if (legs > 1) {
            const arr: RunnerList = [];
            arr[0] = selectedRunnersList[selectedLeg - 1];
            setRunnersList(arr);
        } else {
            setRunnersList(selectedRunnersList);
        }
    }, [legs, selectedLeg, selectedRunnersList]);

    return (
        <>
            <HorseRacingMain
                className={`${runner.scratched === 'Y' ? 'scratched' : positions === 1 ? '' : 'racecardheight'}`}
                sx={{ borderBottom: 1, borderColor: alpha(theme.palette.secondary.main, 0.5), padding: '12px 16px' }}
            >
                {loading ? (
                            <>
                                <Stack sx={{display:'flex', flexDirection:'row', gap:'10px'}}>
                                  <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px', borderRadius:'5px', background: theme.palette.secondary.main, }} height={80} width={60} />
                                  <Stack  sx={{display:'flex', flexDirection:'column', gap:'5px', width:'100%'}}>
                                    <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px',  background: theme.palette.secondary.main, }} height={20} width={'100%'} />
                                    <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px', background: theme.palette.secondary.main, }} height={10} width={'100%'} />
                                    <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px', background: theme.palette.secondary.main, }} height={10} width={'100%'} />
                                    <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px', background: theme.palette.secondary.main, }} height={10} width={'100%'} />
                                  </Stack>
                                  <Stack  sx={{display:'flex', flexDirection:'column', gap:'5px'}}>
                                   <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px', borderRadius:'5px', background: theme.palette.secondary.main, }} height={50} width={70} />
                                   <Skeleton variant="rectangular" sx={{ mt: '2px', mb: '2px', background: theme.palette.secondary.main, }} height={20} width={70} />
                                  </Stack>
                                </Stack>
                                <div></div>
                                
                            </>
                        ) : (
                <ul style={{ margin: '0px', padding: '0px', listStyle: 'none' }}>
                    <RaceCardDetails className={`${selectedPoolCode.toLowerCase()}`} style={{  }}>
                        <HorseRider className="horseuser" sx={{ width: '40px' }}>
                            <span className="infonumber">{runner.position}</span>
                            <img src={runner.jerseyUrl} />
                            <small>({runner.drawNumber})</small>
                        </HorseRider>
                        <HorseRiderDetails  className='tanriderdetails'>
                            <Stack>
                                <span className="horse_name 222" style={{ fontSize: '15px', color: '#fff', fontWeight: '700' }}>
                                    {name}
                                </span>
                                <span className="sire_dam_name" style={{ fontSize: '12px', color: '#c5c8c7', fontWeight: '400' }}>
                                    ({runner.desc})*({runner.shortForm})*(Rt.{runner.rating})
                                </span>
                            </Stack>
                            <Stack>
                                <span className="jockey_name" style={{ fontSize: '12px', color: '#c5c8c7', fontWeight: '600' }}>
                                    <b>J&nbsp;&nbsp;</b>
                                    {runner.jockey.name}
                                    <span>
                                        ( wt {runner.weight} <span>Aw.0</span> ){' '}
                                    </span>
                                </span>
                                <span className="trainer_name" style={{ fontSize: '12px', color: '#c5c8c7', fontWeight: '400' }}>
                                    <b>T&nbsp;&nbsp;</b>
                                    {runner.trainer.name}
                                    {runner.scratched}
                                </span>
                            </Stack>
                        </HorseRiderDetails>
                        <HorseRiderButton className='tanbtn' >
                            {runner.scratched === 'Y' ? (
                                <Stack>
                                    <span style={{
                                        border: '2px solid #f96464',
                                        borderRadius: '3px',
                                        color: '#f96464',
                                        fontSize: '18px',
                                        height: '40px',
                                        lineHeight: '36px',
                                        marginTop: '4px',
                                        position: 'relative',
                                        textAlign: 'center',
                                        width: '60px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '3px',
                                    }}>W</span>
                                    <p style={{
                                        color: '#f96464',
                                        fontSize: '12px', margin:'0px'
                                    }}>Scratched</p>
                                </Stack>
                            ) : raceStatus === 'BNS' || raceStatus === 'BSP' ? (
                                ''
                            ) : raceStatus === 'DRL' || raceStatus === 'ALC' ? (
                                <>
                                    <Stack>
                                        <ButtonCheck type="button" className="winbutton 2323">
                                            {runner.odds[selectedPoolCode.toUpperCase()] || 0}
                                        </ButtonCheck>
                                    </Stack>
                                </>
                            ) : (
                                <>
                                    <Stack className={`${positions === 1 ? 'singlebet' : 'multibet'}`} sx={{ flexDirection:'row'}}>
                                        <Stack className="totebet" style={{}} sx={{ flexDirection:'row', gap:'15px'}}>
                                            {[...Array(numberOfPositions)].map((x, i) => (
                                                <Stack key={i} >
                                                    <ButtonCheck
                                                        sx={{}}
                                                        type="button"
                                                        className={`winbutton ${
                                                            runnersList && runnersList[i] && runnersList[i].includes(runner.position)
                                                                ? `active`
                                                                : ''
                                                        }`}
                                                        key={i}
                                                        onClick={() => selectedRunners(i, runner.position)}
                                                    >
                                                        <p style={{}} className="buttontext">
                                                            {positions === 1 ? '' : i + 1}
                                                        </p>
                                                        {runnersList && runnersList[i] && runnersList[i].includes(runner.position) ? (
                                                            <IconCheck />
                                                        ) : (
                                                            <IconPlus />
                                                        )}
                                                    </ButtonCheck>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </Stack>
                                    <Stack sx={{ fontSize: '12px', display: 'flex', lineHeight: '14px', color: '#fff', marginTop: '5px' }}>
                                        <p style={{ display: 'flex', gap: '5px', margin: '0px' }}>
                                            <span style={{ fontSize: '12px', color: '#fff', fontWeight: '500' }}>WIN</span>
                                            <span style={{ fontSize: '12px', color: '#fff', fontWeight: '500' }}>ODDS</span>
                                            <span style={{ fontSize: '12px', color: '#fff', fontWeight: '500' }}>
                                                {runner.odds[selectedPoolCode.toUpperCase()] || runner.odds['WIN']}
                                            </span>
                                        </p>
                                    </Stack>
                                </>
                            )}
                        </HorseRiderButton>
                    </RaceCardDetails>
                </ul>
                  )}
            </HorseRacingMain>
        </>
    );
};

export default Runner;
