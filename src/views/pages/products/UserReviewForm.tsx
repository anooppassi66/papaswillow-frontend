import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import axios from 'utils/axios';
import { useParams } from 'react-router-dom';
import { openSnackbar } from 'store/slices/snackbar';
import { dispatch } from 'store';
import useAuth from 'hooks/useAuth';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: '100%',
    margin: '20px auto',
    padding: theme.spacing(3),
    background: '#181921',
    color: '#fff',
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
        padding: '12px 0px',
        '.MuiInputLabel-root': {
            color: '#fff'
        },
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#fff!important'
        },
        '.MuiOutlinedInput-input': {
            color: '#fff'
        },
        '.MuiButton-contained': {
            marginTop: '16px',
            background: '#ffb001',
            color: '#000',
            boxShadow: 'none',
            borderRadius: '0px'
        }
    }
}));

const StyledRating = styled(Rating)(({ theme }) => ({
    marginTop: theme.spacing(1),
    '.MuiRating-icon': {
        color: 'rgba(255,255,255,0.5)'
    },
    '.MuiRating-iconHover': {
        color: '#faaf00'
    },
    '.MuiRating-iconFilled': {
        color: '#faaf00'
    }
}));

// Define TypeScript types for form values
interface FormValues {
    rating: number | null;
    description: string;
}

// Validation schema using Yup
const validationSchema = Yup.object({
    rating: Yup.number().required('Rating is required').nullable().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
    description: Yup.string().required('Review is required').min(10, 'Review must be at least 10 characters')
});

const ReviewForm: React.FC = () => {
    const { name: productName } = useParams<{ name: string }>();
    const { isLoggedIn, forceLogin } = useAuth();

    return (
        <StyledCard>
            {/* <CardHeader
                avatar={<Avatar src="https://via.placeholder.com/150" />}
                title="Your Name"
                subheader={new Date().toLocaleDateString()}
            /> */}
            <CardContent>
                <Formik
                    initialValues={{ rating: null, description: '' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
                        if (!isLoggedIn) {
                            forceLogin(true);
                            return false;
                        }
                        try {
                            const response = await axios.post('/api/v1/productreviews', {
                                rating: values.rating,
                                description: values.description,
                                productName
                            });
                            if (response.data.status === 200) {
                                dispatch(
                                    openSnackbar({
                                        open: true,
                                        message: 'Review Submited',
                                        variant: 'alert',
                                        alert: {
                                            color: 'success'
                                        },
                                        close: false
                                    })
                                );
                            }
                        } catch (error) {
                            console.error('Error submitting review:', error);
                            alert('Failed to submit review. Please try again later.');
                        } finally {
                            setSubmitting(false);
                            resetForm();
                        }
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <Field name="rating">
                                {({ field }: FieldProps<number | null>) => (
                                    <StyledRating value={field.value} onChange={(event, newValue) => setFieldValue('rating', newValue)} />
                                )}
                            </Field>
                            <Field
                                name="description"
                                as={TextField}
                                label="Review"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.description && errors.description}
                                error={touched.description && Boolean(errors.description)}
                            />
                            <Button type="submit" variant="contained" color="primary" disabled={values.rating === null}>
                                Submit Review
                            </Button>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </StyledCard>
    );
};

export default ReviewForm;
