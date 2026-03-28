import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ReviewForm from './UserReviewForm';
import ReviewComponent from './ReviewComponent';
import axios from 'utils/axios';
import { useParams } from 'react-router-dom';

// Styled components
const ProductReviewStyle = styled(Box)(() => ({
    marginBottom: '60px',
    textAlign: 'center',
    '.product-review-head': {
        fontSize: '30px',
        lineHeight: '36px',
        borderBottom: '1px solid rgb(233, 233, 235)',
        paddingBottom: '15px',
        marginBottom: '30px',
        color: '#fff'
    }
}));

// Review data interface
interface Review {
    id: string;
    reviewer: string;
    avatar: string;
    rating: number;
    createdAt: string;
    description: string;
}

export const ProductReview = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { name: productName } = useParams<{ name: string }>();

    useEffect(() => {
        // Fetch reviews from API
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/v1/productreviews/${productName}`);
                setReviews(response.data.data); // Assuming the response data is an array of reviews
            } catch (err) {
                setError('Failed to fetch reviews. Please try again later.');
                console.error('Error fetching reviews:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    return (
        <Grid container>
            <Grid item md={12} sm={12} xs={12}>
                <ProductReviewStyle>
                    <Typography className="product-review-head">Customer Reviews</Typography>
                    {loading ? (
                        <Typography variant="h6" color="textSecondary">
                            Loading reviews...
                        </Typography>
                    ) : error ? (
                        <Typography variant="h6" color="error">
                            {error}
                        </Typography>
                    ) : (
                        <Box>
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <ReviewComponent
                                        key={review.id}
                                        name={review.reviewer}
                                        avatar={review.avatar}
                                        rating={review.rating}
                                        date={review.createdAt}
                                        review={review.description}
                                    />
                                ))
                            ) : (
                                <Typography variant="h6" color="textSecondary">
                                    No reviews available
                                </Typography>
                            )}
                        </Box>
                    )}
                    <Box>
                        <ReviewForm />
                    </Box>
                </ProductReviewStyle>
            </Grid>
        </Grid>
    );
};
