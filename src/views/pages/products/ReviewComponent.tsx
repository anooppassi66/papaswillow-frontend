import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { formatDate } from 'utils/util';

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: '100%',
    margin: '20px auto',
    background: '#565656',
    color: '#fff',
    padding: theme.spacing(3),
    '.MuiCardHeader-root': {
        padding: '0px',
        '.MuiCardHeader-title': {
            textAlign: 'left',
            color: '#fff'
        },
        '.MuiCardHeader-subheader': {
            textAlign: 'left',
            color: '#fff'
        }
    },
    '.MuiCardContent-root': {
        textAlign: 'left',
        padding: '12px 0px 0px 0px!important'
    }
}));

const StyledRating = styled(Rating)(({ theme }) => ({
    marginTop: theme.spacing(1)
}));

interface ReviewProps {
    name: string;
    avatar: string;
    rating: number;
    date: string;
    review: string;
}

const ReviewComponent: React.FC<ReviewProps> = ({ name, avatar, rating, date, review }) => {
    return (
        <StyledCard>
            <CardHeader avatar={<Avatar src={avatar} />} title={name} subheader={formatDate(date)} />
            <CardContent>
                <StyledRating value={rating} readOnly />
                <Typography variant="body1" component="p">
                    {review}
                </Typography>
            </CardContent>
        </StyledCard>
    );
};

export default ReviewComponent;
