import React, { useEffect, useState } from 'react';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { CloseIconSvg } from 'assets/svg';
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
    zIndex: '99999',
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
    
   '.amounttext':{
    fontSize: '14px',
    border: '0px',
    gap: '4px',
    height: '33px',
    padding: '0px 18px',
    color: '#ffffff',
    borderRadius: '6px',
    width: '30%',
    textAlign: 'center',
    justifyContent: 'center',
    margin: '0 10px 15px 0',
    backgroundColor: alpha(theme.palette.secondary.main, 0.35),
    fontWeight:'600',
    cursor:' pointer',
    '&.active':{
        backgroundColor: '#FFCD05',
        color: '#212121',
        fontWeight:'600',
    }
   }
    
}));

const BetPopupPlaceFotter = styled(Grid)(({ theme }) => ({
    
    padding: '20px 40px 35px 40px',
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
    '.yesbtn':{
      backgroundColor: alpha(theme.palette.secondary.main, 1),
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      height: '38px',
      fontSize: '14px',
      padding: '0px 24px',
      borderRadius: '6px',
      border:'0px',
      fontWeight:'600',
      width:'100%',
      justifyContent:'center',
    }
    
}));

const BetPopup = styled(Grid)(({ theme }) => ({
    
    background: 'hsla(0, 0%, 5%, 0.8)',
    height: '100%',
    left:' 0',
    position: 'fixed',
    top:' 0',
    width: '100%',
    zIndex: '9999',
   
    
}));

interface ChildProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    parentHandlerFunction: Function;
    parentCloseHandlerFunction: Function;
    unitBet: number;
}

const BetAmount = (props: ChildProps) => {
    const theme = useTheme();
    const [amount, setAmount] = useState(10);
    const [isError, setIsError] = useState(false);
    const { register, setValue } = useForm();

    const handleChange = (e: { target: any }) => {
        const remainder = e.target.value % props.unitBet;
        if (remainder === 0) setValue('custom_amount', e.target.value);
        else setIsError(false);
    };

    const handleAmount = () => {
        const remainder = amount % props.unitBet;
        console.log(amount + '==' + props.unitBet);
        props.parentHandlerFunction(amount);
        // if (remainder === 0) props.parentHandlerFunction(amount);
        // else setIsError(false);
    };
    useEffect(() => {
        setValue('custom_amount', 10);
    }, []);

    useEffect(() => {
        setValue('custom_amount', amount);
    }, [amount]);
    return (
        <><BetPopup className='2345'></BetPopup><BetPopupPlace>
            <div></div>
            <Grid>
                <button
                    className="closebtn"
                    type="button"
                    onClick={() => props.parentCloseHandlerFunction()}
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <CloseIconSvg />
                </button>
                <BetPopupPlaceView>
                    <h4 style={{ margin: '0px 0px 8px 0px', fontSize: '20px', padding: '0px', display: 'flex', justifyContent: 'center', lineHeight: '36px' }}>Bet Amount</h4>
                    <Stack sx={{ display: 'inline' }}>
                        <button className={`amounttext ${amount === 10 ? 'active' : ''}`} id="" onClick={() => setAmount(10)}>
                            <span>&#8369;</span> 10
                        </button>
                        <button className={`amounttext ${amount === 20 ? 'active' : ''}`} id="" onClick={() => setAmount(20)}>
                            <span>&#8369;</span> 20
                        </button>
                        <button className={`amounttext ${amount === 50 ? 'active' : ''}`} id="" onClick={() => setAmount(50)}>
                            <span>&#8369;</span> 50
                        </button>
                        <button className={`amounttext ${amount === 100 ? 'active' : ''}`} id="" onClick={() => setAmount(100)}>
                            <span>&#8369;</span> 100
                        </button>
                        <button className={`amounttext ${amount === 200 ? 'active' : ''}`} id="" onClick={() => setAmount(200)}>
                            <span>&#8369;</span> 200
                        </button>
                        <button className={`amounttext ${amount === 500 ? 'active' : ''}`} id="" onClick={() => setAmount(500)}>
                            <span>&#8369;</span> 500
                        </button>
                        <button className={`amounttext ${amount === 1000 ? 'active' : ''}`} id="" onClick={() => setAmount(1000)}>
                            <span>&#8369;</span> 1000
                        </button>
                        <button className={`amounttext ${amount === 2000 ? 'active' : ''}`} id="" onClick={() => setAmount(2000)}>
                            <span>&#8369;</span> 2000
                        </button>
                        <button className={`amounttext ${amount === 5000 ? 'active' : ''}`} id="" onClick={() => setAmount(5000)}>
                            <span>&#8369;</span> 5000
                        </button>
                    </Stack>
                    <Stack sx={{ color: '#fff' }}>
                        <Typography sx={{ marginBottom: '3px', }}>Custom Amount</Typography>
                        {/* <Input
        className="mobilenumber"
        id="custom_amount"
        name="custom_amount"
        onChange={handleChange}
        {...register('custom_amount')}
        placeholder="Custom Amount"
    /> */}
                        <Input
                            sx={{
                                backgroundColor: alpha(theme.palette.secondary.main, 0.55), padding: '6px 12px 6px 12px', fontSize: '14px', fontWeight: '600', borderRadius: '5px', color: '#fff !important',
                                '::before ': {
                                    borderBottom: '0px',
                                },
                                '::placeholder':{
                                    color: '#ff0000 !important',
                                },
                                'MuiInput-input':{
                                    color: '#ff0000 !important',
                                },
                            }}
                            className="mobilenumber"
                            id="custom_amount"
                            placeholder="Custom Amount"
                            {...register('custom_amount', {
                                onChange: (event) => {
                                    handleChange(event);
                                    // Additional logic here if needed
                                }
                            })} />
                    </Stack>
                </BetPopupPlaceView>
                <BetPopupPlaceFotter>
                    <div>
                        {!isError && (
                            <button className="yesbtn" id="age_consent" onClick={() => handleAmount()}>
                                Continue
                            </button>
                        )}
                    </div>
                </BetPopupPlaceFotter>
            </Grid>
        </BetPopupPlace></>
    );
};

export default BetAmount;
