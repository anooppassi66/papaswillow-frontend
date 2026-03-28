import React, { useEffect, useState } from 'react';
import { CloseIconSvg, KycVerifiedIconSvg } from 'assets/svg';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {styled,  Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { BorderColor, BorderStyle } from '@mui/icons-material';
const BetPopupPlace = styled(Grid)(({ theme }) => ({
    backgroundColor:  theme.palette.dark[800],
    //backgroundColor: alpha(theme.palette.secondary.main, 1), // Adjust this color as needed
    borderRadius: '30px',
    left: '50%',
    position: 'fixed',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    zIndex: '200',
    '.closebtn':{
        backgroundColor: 'transparent',
        border: '0',
        appearance: 'none',
        color: '#4a6285',
        fontSize: '40px',
        cursor: 'pointer',
        right: '18px',
        top: '18px',
        height: '20px',
        lineHeight: '20px',
        position: 'absolute',
        width: '20px',
    },
    
}));
const BetPopupPlaceView = styled(Grid)(({ theme }) => ({
    
    padding: '30px 40px 25px 40px',
    display: 'flex',
    flexDirection: 'column',
    
}));

interface ChildProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    parentCloseHandlerFunction: Function;
}

const BetSuccess = (props: ChildProps) => {
    const [amount, setAmount] = useState(10);
    const [isError, setIsError] = useState(false);
    const { register, setValue } = useForm();

    return (
        <BetPopupPlace>
            <div></div>
            <BetPopupPlaceView>
                <button
                    className="closebtn"
                    type="button"
                    onClick={() => props.parentCloseHandlerFunction()}
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <CloseIconSvg />
                </button>
                <div>
                    <KycVerifiedIconSvg />
                    <h4>Bet placed successfully</h4>
                </div>
            </BetPopupPlaceView>
        </BetPopupPlace>
    );
};

export default BetSuccess;
