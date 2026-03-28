import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import {styled,  Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { BorderColor, BorderRight, Padding } from '@mui/icons-material';
import { fill } from 'lodash-es';


const CheckBoxSelect = styled(Stack)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    position: 'relative',
    color: '#fff',
    backgroundColor: alpha(theme.palette.secondary.main, 0.55),
    //border: '1px solid #1c2335',
    flexDirection: 'row',
    transition: 'all 0.3s',
    borderRadius: '10px 10px 0px 0px',
    marginTop:' 0px',
    justifyContent:'space-between',
    padding:'8px 15px',
    'svg path':{
    fill:'#fff',
    }


}));

const HorsePlace = styled(Stack)(({ theme }) => ({
    'li':{
        listStyle:'none',
        margin:'7px 0', 
        padding:'6px 24px 0px 15px', 
        display:'flex', 
        flexDirection:'column', 
        wordWrap:'break-word',
        Border: 1,
        borderColor: alpha(theme.palette.secondary.main, 0.55),


    },

    '.selected::after': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.95),
        content: '" "',
        height: '3px',
        position: 'relative',
        top: '7px',
    },
    '.selected .pool_name': {
        color: alpha(theme.palette.secondary.main, 1),
        fontWeight: '900 !important',
        fontSize: '13px',

    }


}));

type RunnerHeader = {
    poolsActive: any;
    selectedPool: string;
    changeSelectedPool: Function;
    changeSelectedLeg: Function;
    selectedRaceNumber: number;
    selectedLeg: number;
    onClickBox: Function;
    onClickAll: Function;
    positions: number;
    boxOption: boolean;
    legs: number;
    betType: string;
};

const RunnerHeader: React.FC<RunnerHeader> = ({
    poolsActive,
    selectedPool,
    changeSelectedPool,
    selectedLeg,
    changeSelectedLeg,
    selectedRaceNumber,
    positions,
    onClickBox,
    onClickAll,
    boxOption,
    legs,
    betType
}) => {
    const [numberOfPositions, setNumberOfPositions] = useState(1);
    const theme = useTheme();
    useEffect(() => {
        let pos = 1;
        if (!boxOption) pos = positions;
        setNumberOfPositions(pos);
    }, [positions, boxOption]);

    const onBoxClick = (e: { target: any }) => {
        onClickBox(e.target.checked);
    };

    const clickAllOption = (position: number, e: { target: any }) => {
        onClickAll(position, e.target.checked);
    };

    return (
        <>
            {betType === 'tote' && (
                <Grid>
                    <ul style={{maxWidth:'620px', display:'flex', flexDirection:'row', minHeight:'60px', paddingLeft:'10px', overflowX:'auto', paddingBottom:'10px', margin:'0px'}}>
                        {Object.keys(poolsActive)
                            .filter((index) => poolsActive[index].type !== 'fixed')
                            .map((index: any, pool: any) => {
                                return (
                                    <HorsePlace className='3456' key={index} sx={{display:'flex', flexDirection:'initial', cursor:'pointer'}}>
                                        <li style={{ borderRight:`1px solid ${alpha(theme.palette.secondary.main, 0.95)}`, }}
                                            key={index}
                                            onClick={() => changeSelectedPool(poolsActive[index].code.toLowerCase())}
                                            className={`${selectedPool === poolsActive[index].code.toLowerCase() ? 'selected' : ''}`}
                                        >
                                            <span className="clickspan" style={{display:'flex', flexDirection:'column'}}>
                                                <span className="pool_name" style={{fontWeight:'600', fontSize:'13px'}}>{poolsActive[index].name}</span>
                                                <span className="pool_place" style={{fontWeight:'500', fontSize:'12px', whiteSpace:'nowrap'}}>{poolsActive[index].shortDesc}</span>
                                            </span>
                                        </li>
                                    </HorsePlace>
                                );
                            })}
                    </ul>
                </Grid>
            )}
            <Grid>
                {betType === 'tote' && legs > 1 && (
                    <Stack>
                        <ul>
                            {[...Array(legs)].map((x, i) => (
                                <li
                                    onClick={() => changeSelectedLeg(i + 1)}
                                    key={i}
                                    className={`${selectedLeg == i + 1 ? 'selected' : ''}`}
                                >
                                    <span>R{i + 1}</span>
                                </li>
                            ))}
                        </ul>
                    </Stack>
                )}
                {betType === 'tote' && (
                    <CheckBoxSelect>
                        <Stack sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            {positions !== 1 &&<> <Checkbox id="checkboxBox" name="checkboxBox" onChange={(event) => onBoxClick(event)} /><Stack>BOX</Stack> </> }
                        </Stack>
                        <Stack sx={{display:'flex', flexDirection:'row'}}>
                            <Stack className="checkboxselect" sx={{display:'flex', flexDirection:'row', gap:'20px',alignItems:'center' }}>
                                {[...Array(numberOfPositions)].map((x, i) => (
                                    <>
                                    <Stack sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}>
 
                                    <Checkbox
                                    sx={{padding:'0px', color:'#fff'}}
                                        id={`checkbox_${i}`}
                                        name={`checkbox_${i}`}
                                        onChange={(event) => clickAllOption(i, event)}
                                        key={i}
                                    />
                                   <Stack>All</Stack> 
                                   </Stack>
                                   </>
                                ))}
                            </Stack>
                        </Stack>
                    </CheckBoxSelect>
                )}
                {betType === 'fixed' && (
                    <CheckBoxSelect>
                        <Stack sx={{width:'55px'}}>S. No.</Stack>
                        <Stack sx={{width:'calc(100% - 247px)!important'}}>Horse Details</Stack>
                        <Stack sx={{width:'192px'}}>
                            <Stack className="fixedbetheader" sx={{ display:'flex', gap:'15px', width:'160px', flexDirection:'row', justifyContent:'flex-end'}}>
                                <span>WIN</span>
                                <span>PLC</span>
                            </Stack>
                        </Stack>
                    </CheckBoxSelect>
                )}
            </Grid>
        </>
    );
};

export default RunnerHeader;
