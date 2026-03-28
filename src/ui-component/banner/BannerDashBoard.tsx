import { Link } from 'react-router-dom';
import { useSelector } from 'store';

// material-ui

import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';

// third-party
import { Carousel } from 'react-responsive-carousel';

// assets
import { IconChevronRight, IconChevronLeft, IconLink } from '@tabler/icons-react';
import SliderLight55 from 'assets/images/landing/pre-apps/newbnner5home.png';
import SliderDark55 from 'assets/images/landing/pre-apps/newbnner5home.png';

// types
import { ThemeMode } from 'types/config';
import { useEffect, useState } from 'react';
import { StoreVideo } from './storeVideo';
import { SkeletonFullView } from 'views/Skeleton/Products/SkeletonFullView';
import useBannerByPosition from 'hooks/useBanners';
import useBannerByFindPosition from 'hooks/useFindBanners';

// styles
const Images = styled('img')(({ theme }) => ({
    width: '100%',
    height: '415px',
    marginBottom: 0,
    backgroundSize: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
        height: '160px',
        backgroundSize: '100%',
        objectFit: 'cover'
    }
}));

const BannerSlider = styled('div')(({ theme }) => ({
    display: 'flex'
}));

function SampleNextArrow(props: any) {
    const theme = useTheme();
    const { onClickHandler } = props;

    return (
        <IconButton
            onClick={onClickHandler}
            sx={{
                //position: 'absolute',
                zIndex: 2,
                top: 'calc(50% - 50px)',
                cursor: 'pointer',
                borderRadius: '0px',
                // bgcolor: `${theme.palette.background.paper} !important`,
                bgcolor: '#d4e8e126',
                width: { xs: '32px !important', xl: '32px !important' },
                height: { xs: '100px !important', xl: '100px !important' },
                boxShadow: '0px 24px 38px rgba(9, 15, 37, 0.07)',
                '&.hover': {
                    bgcolor: '#d4e8e1'
                },
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    transform: 'scale(9)'
                },
                svg: {
                    height: { md: 20, lg: 40, xl: '40px' },
                    width: { md: 20, lg: 40, xl: '40px' }
                },
                right: { xs: '10px', md: '10px', lg: '10px', xl: '10px' }
            }}
            aria-label="button"
        >
            <IconChevronRight fontSize={25} color={theme.palette.grey[900]} />
        </IconButton>
    );
}

function SamplePrevArrow(props: any) {
    const theme = useTheme();
    const { onClickHandler } = props;

    return (
        <IconButton
            onClick={onClickHandler}
            sx={{
                position: 'absolute',
                zIndex: 2,
                top: 'calc(50% - 50px)',
                cursor: 'pointer',
                borderRadius: '0px',
                // bgcolor: `${theme.palette.background.paper} !important`,
                bgcolor: '#d4e8e126',
                width: { xs: '32px !important', xl: '32px !important' },
                height: { xs: '100px !important', xl: '100px !important' },
                boxShadow: '0px 24px 38px rgba(9, 15, 37, 0.07)',
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    transform: 'scale(9)'
                },
                svg: {
                    height: { md: 20, lg: 40, xl: '40px' },
                    width: { md: 20, lg: 40, xl: '40px' }
                },
                left: { xs: '10px', md: '10px', lg: '10px', xl: '10px' }
            }}
            aria-label="button"
        >
            <IconChevronLeft fontSize={25} color={theme.palette.grey[900]} />
        </IconButton>
    );
}

interface ItemProps {
    title: string;
    caption?: string;
    image: string;
    link: string;
}

const Items = ({ title, caption, image, link }: ItemProps) => {
    return (
        <>
            <Images
                src={image}
                alt="dashboard"
                sx={{
                    width: { xs: '100%', xl: 743 },
                    objectFit: 'cover',
                    direction: 'initial',
                    borderRadius: '0px',
                    backgroundPosition: 'bottom'
                }}
            />
            {/* <Stack spacing={1} sx={{ pt: 1 }}>
                <Stack
                    direction="row"
                    
                    alignItems="center"
                    justifyContent="center"
                    component={Link}
                    to={link}
                    target="_blank"
                    sx={{ textDecoration: 'none' }}
                >
                    <Typography variant="h3" sx={{ fontWeight: 500 }}>
                        {title}
                    </Typography>
                    <IconButton size="small" sx={{ color: 'text.primary' }}>
                        <IconLink aria-label="link button" size={18} />
                    </IconButton>
                </Stack>
                <Typography variant="subtitle2" color="text.primary" sx={{ fontSize: { xs: '1rem', xl: '1.125rem' } }}>
                    {caption}
                </Typography>
            </Stack> */}
        </>
    );
};

const BannerDashBoard = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(20050);
    const [showStore, setShowStore] = useState(false);
    const { isLoading } = useSelector((state) => state.store.banners);
    const sliderBanners = useBannerByPosition('slider');

    const banner1 = useBannerByFindPosition('ads1');
    const ads1 = banner1?.bannerImages || '';
    const link1 = banner1?.bannerLink || '';

    const banner2 = useBannerByFindPosition('ads2');
    const ads2 = banner2?.bannerImages || '';
    const link2 = banner2?.bannerLink || '';
    useEffect(() => {
        // Simulate an API call or data fetching
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
        // const downMD = useMediaQuery(theme.breakpoints.down('md'));
    }, []);
    useEffect(() => {
        if (timeLeft <= 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft((time) => time - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const formatTime = (time: any) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Box sx={{ mr: '5px', background: '#ffcd05', padding: '2px 5px', color: '#212121', fontWeight: '600' }}>{hours}h</Box>
                    <Box sx={{ mr: '5px', background: '#ffcd05', padding: '2px 5px', color: '#212121', fontWeight: '600' }}>
                        {minutes < 10 ? '0' : ''}
                        {minutes}m
                    </Box>
                    <Box sx={{ background: '#ffcd05', padding: '2px 5px', color: '#212121', fontWeight: '600' }}>
                        {seconds < 10 ? '0' : ''}
                        {seconds}s
                    </Box>
                </Box>
            </>
        );
        //`${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const toggleStore = () => {
        setShowStore(!showStore);
    };

    return (
        <>
            <Container sx={{ background: '#00000080', padding: '0px !important' }}>
                {showStore && <StoreVideo toggleStore={toggleStore} />}
                <Grid
                    container
                    justifyContent="center"
                    className="343434"
                    sx={{
                        paddingTop: '20px',
                        [theme.breakpoints.down('sm')]: {
                            padding: '10px 15px'
                        },

                        '@media (max-width: 568px)': {
                            flexDirection: 'column-reverse'
                        }
                    }}
                >
                    <Grid item md={12} sm={12} xs={12}>
                        <Box
                            className="preBuildDashBoard-slider"
                            sx={{
                                direction: 'initial',
                                flexDirection: 'row',
                                display: 'flex',
                                gap: '20px',
                                [theme.breakpoints.down('sm')]: {
                                    flexDirection: 'column'
                                },

                                '.slider': {
                                    height: { xs: 'auto' },
                                    '& .slide:not(.selected)': { transformOrigin: 'center !important' }
                                }
                            }}
                        >
                            <Grid md={8} sm={8} xs={12}>
                                {loading ? (
                                    <>
                                        <Box
                                            sx={{
                                                mt: '0px',
                                                // mb: '5px',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                // gap: '20px',
                                                // padding: '20px 30px',
                                                justifyContent: 'space-evenly',
                                                height: '415px',
                                                [theme.breakpoints.down('sm')]: {
                                                    height: '160px'
                                                }
                                            }}
                                            // height={415}
                                        >
                                            <Skeleton
                                                variant="rectangular"
                                                animation="wave"
                                                sx={{
                                                    mt: '0px',
                                                    // mb: '15px',
                                                    width: '100%',
                                                    background: '#3c3c3c',
                                                    animation: 'animation-c7515d 10s ease-in-out 0.95s infinite',
                                                    height: '415px',
                                                    [theme.breakpoints.down('sm')]: {
                                                        height: '160px'
                                                    }
                                                    // borderRadius: '30px'
                                                }}
                                                // height={415}
                                            />
                                        </Box>
                                    </>
                                ) : (
                                    <Carousel
                                        showArrows={false}
                                        showThumbs={false}
                                        showIndicators={true}
                                        centerMode={false}
                                        centerSlidePercentage={50}
                                        infiniteLoop={true}
                                        autoFocus={true}
                                        emulateTouch={true}
                                        swipeable={true}
                                        autoPlay={true}
                                        interval={6000}
                                        renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                            hasPrev && <SamplePrevArrow onClickHandler={onClickHandler} hasPrev={hasPrev} label={label} />
                                        }
                                        renderArrowNext={(onClickHandler, hasNext, label) =>
                                            hasNext && <SampleNextArrow onClickHandler={onClickHandler} hasNext={hasNext} label={label} />
                                        }
                                        onClickItem={(index) => {
                                            // if (index === 0) {
                                            //     toggleStore();
                                            // }
                                        }}
                                    >
                                        {/* <Items
                                            // title="Mail/Message App"
                                            image={theme.palette.mode === ThemeMode.DARK ? SliderLight55 : SliderDark55}
                                            // link="/apps/mail"
                                            title={'HPSL League'}
                                            link={''}
                                        /> */}
                                        {sliderBanners &&
                                            sliderBanners?.map((s) => {
                                                const { bannerLink, bannerName, bannerImages } = s;
                                                return <Items key={s.id} image={bannerImages} title={bannerName} link={bannerLink} />;
                                            })}
                                    </Carousel>
                                )}
                            </Grid>
                            <Grid
                                md={4}
                                sm={4}
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    flexDirection: 'column',
                                    [theme.breakpoints.down('sm')]: {
                                        flexDirection: 'row',
                                        display: 'none'
                                    }
                                }}
                            >
                                <Grid md={12} sm={12} xs={12}>
                                    {isLoading ? (
                                        <SkeletonFullView />
                                    ) : (
                                        <Link to={link1}>
                                            <img className="img-responsive" src={ads1} alt={link1} width="100%" />
                                        </Link>
                                    )}
                                </Grid>

                                <Grid md={12} sm={12} xs={12}>
                                    {isLoading ? (
                                        <SkeletonFullView />
                                    ) : (
                                        <Link to={`/products/category/CLOTHING`}>
                                            <img className="img-responsive" src={ads2} alt={link1} width="100%" />
                                        </Link>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default BannerDashBoard;
