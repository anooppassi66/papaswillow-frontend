import { ReactNode, Ref, forwardRef, useState, useCallback, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { styled, Theme } from '@mui/material/styles';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popper from '@mui/material/Popper';
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import Transitions from 'ui-component/extended/Transitions';
import { IconSearch, IconX } from '@tabler/icons-react';
import { ThemeMode } from 'types/config';

import Typography from '@mui/material/Typography';
import { SearchProductCard } from 'views/pages/products/subcard/SearchProductCard';
import Stack from '@mui/material/Stack';
import useScriptRef from 'hooks/useScriptRef';
import { useLocation } from 'react-router-dom';
import axios from 'utils/axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    tags: string[];
}

interface SearchResponse {
    status: number;
    message: string;
    data: Product[];
    tagInfo: string[];
}

interface HeaderAvatarProps extends AvatarProps {
    children: ReactNode;
}

interface SearchBox {
    theme: Theme;
}

const SearchBox = styled(Box)(({ theme }: SearchBox) => ({
    '.searchproducts': {
        stroke: '#000'
    },

    '.mobilesearch': {
        svg: {
            stroke: '#fff !important'
        }
    }
}));

const LinkButton = styled(Link)(({ theme }) => ({
    padding: '0px'
    // textAlign: 'left',
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // width: '100%',
    // gap: '10px',
    // ':hover': {
    //     backgroundColor: 'rgba(251, 221, 155, 0.5) !important'
    // }
}));

const HeaderAvatar = forwardRef(({ children, ...others }: HeaderAvatarProps, ref: Ref<HTMLDivElement>) => {
    const theme = useTheme();

    return (
        <Avatar
            ref={ref}
            variant="rounded"
            sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'secondary.light',
                color: theme.palette.mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark',
                '&:hover': {
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark',
                    color: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.light'
                }
            }}
            {...others}
        >
            {children}
        </Avatar>
    );
});

interface Props {
    value: string;
    handleChange: Function;
    popupState: any;
}

// const MobileSearch = ({ value, handleChange, popupState }: Props) => {
//     const theme = useTheme();

//     return (
//         <OutlinedInput
//             id="input-search-header"
//             value={value}
//             onChange={handleChange}
//             placeholder="Search"
//             startAdornment={
//                 <InputAdornment position="start">
//                     <IconSearch stroke={1.5} size="22px" color='#000' />
//                 </InputAdornment>
//             }
//             endAdornment={
//                 <InputAdornment position="end">
//                     {/* <HeaderAvatar>
//                         <IconX stroke={1.5} size="20px" />
//                     </HeaderAvatar> */}
//                     <Avatar
//                         variant="rounded"
//                         sx={{
//                             ...theme.typography.commonAvatar,
//                             ...theme.typography.mediumAvatar,
//                             bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'orange.light',
//                             color: '#fff',
//                             '&:hover': {
//                                 bgcolor: 'orange.dark',
//                                 color: 'orange.light'
//                             }
//                         }}
//                         {...bindToggle(popupState)}
//                     >
//                         <IconX stroke={1.5} size="20px" />
//                     </Avatar>
//                 </InputAdornment>
//             }
//             aria-describedby="search-helper-text"
//             inputProps={{ 'aria-label': 'search', sx: { bgcolor: 'transparent', } }}
//             sx={{ width: '100%', ml: 0.5, px: 1, bgcolor: 'background.paper', height: '45px', fontSize: '12px' }}
//         />
//     );
// };

const SearchSection = () => {
    const [value, setValue] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [noDataFound, setNoDataFound] = useState(false);
    const [showResults, setShowResults] = useState(true);
    const scriptedRef = useScriptRef();
    const location = useLocation(); // React Router's hook to get the current location
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen); // Toggle visibility
    };

    const fetchSearchResults = async (query: string) => {
        try {
            const response = await axios.get<SearchResponse>(`/api/v1/feproduct/search?query=${query}`);
            if (response.data.status === 200) {
                const fetchedProducts = response.data.data.slice(0, 5); // Limit to 5 products
                setProducts(fetchedProducts);
                setTags(response.data.tagInfo);
                setNoDataFound(fetchedProducts.length === 0);
                setShowResults(true);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            setNoDataFound(true);
        }
    };

    const debouncedSearch = useCallback(
        debounce((nextValue: string) => {
            // if (nextValue.length >= 4) {
            fetchSearchResults(nextValue);
            // } else {
            //     setProducts([]);
            //     setTags([]);
            //     setNoDataFound(false);
            // }
        }, 500),
        []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setValue(searchValue);
        debouncedSearch(searchValue);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (scriptedRef.current && !scriptedRef.current.contains(event.target as Node)) {
            setShowResults(false);
        }
    };

    useEffect(() => {
        // debugger;
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // debugger;
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setShowResults(false); // Close search results whenever the route changes
        setValue('');
    }, [location]);

    return (
        <>
            <Box
                ref={scriptedRef}
                sx={{
                    position: 'relative',
                    m: '0 20px',
                    [theme.breakpoints.down('sm')]: {
                        m: '0 5px'
                    }
                }}
            >
                <SearchBox sx={{ display: { xs: 'none', md: 'block', color: '#000' } }}>
                    <OutlinedInput
                        id="input-search-header"
                        value={value}
                        onChange={handleChange}
                        placeholder="Search for Products and more"
                        startAdornment={
                            <InputAdornment
                                position="start"
                                sx={{
                                    background: '#f89b35',
                                    borderRadius: 0,
                                    width: '40px',
                                    maxHeight: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <IconSearch className="searchproducts" stroke={2.5} size="18px" />
                            </InputAdornment>
                        }
                        aria-describedby="search-helper-text"
                        inputProps={{ 'aria-label': 'search', sx: { bgcolor: 'transparent', pl: 0.5 } }}
                        sx={{
                            width: { md: 250, lg: 534 },
                            ml: 2,
                            px: 0,
                            height: 40,
                            background: '#fff',
                            fontSize: '14px',
                            fontWeight: 500,
                            '&::placeholder': {
                                color: '#ff0000',
                                fontWeight: 400,
                                fontSize: '12px'
                            }
                        }}
                    />
                </SearchBox>
                <SearchBox sx={{ display: { xs: 'block', md: 'none', color: '#fff' } }}>
                    <Stack className="mobilesearch" onClick={toggleOpen}>
                        <IconSearch stroke={2.5} size="24px" color="#fff" />
                    </Stack>

                    {isOpen && (
                        <Stack
                            sx={{
                                position: 'fixed',
                                width: '100%',
                                left: '0px',
                                top: '20px',
                                background: '#000',
                                padding: '10px 20px',
                                zIndex: '999',
                                transform: 'translate3d(1px, 28px, 0px)'
                            }}
                        >
                            <OutlinedInput
                                id="input-search-header"
                                value={value}
                                onChange={handleChange}
                                placeholder="Search"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconSearch stroke={1.5} size="22px" color="#000" />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                // ...theme.typography.commonAvatar,
                                                // ...theme.typography.mediumAvatar,
                                                // bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'orange.light',
                                                color: '#fff',
                                                '&:hover': {
                                                    bgcolor: 'orange.dark',
                                                    color: 'orange.light'
                                                }
                                            }}
                                        >
                                            <IconX stroke={1.5} size="20px" color="#fff" onClick={toggleOpen} />
                                        </Avatar>
                                    </InputAdornment>
                                }
                                aria-describedby="search-helper-text"
                                inputProps={{ 'aria-label': 'search', sx: { bgcolor: 'transparent' } }}
                                sx={{ width: '100%', ml: 0.5, px: 1, bgcolor: 'background.paper', height: '45px', fontSize: '12px' }}
                            />

                            <Box sx={{ display: { xs: ' block', md: 'none', color: '#000' } }}>
                                {showResults && noDataFound && (
                                    <Box
                                        sx={{
                                            mt: '5px',
                                            ml: '16px',
                                            backgroundColor: '#fff',
                                            position: 'absolute',
                                            left: '0px',
                                            padding: '10px',
                                            // width: { md: 250, lg: 534 },
                                            borderRadius: '4px',
                                            width: 'calc(100% - 30px)',
                                            zIndex: '1200'
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '12px' }}>No data found</Typography>
                                    </Box>
                                )}
                                {showResults && (
                                    <Box
                                        sx={{
                                            mt: '5px',
                                            ml: '16px',
                                            position: 'absolute',
                                            left: '0px',
                                            padding: '0px',
                                            // width: { md: 250, lg: 534 },
                                            width: 'calc(100% - 30px)',
                                            borderRadius: '4px',
                                            zIndex: '1200'
                                        }}
                                    >
                                        {tags.length > 0 && (
                                            <Box
                                                sx={{
                                                    backgroundColor: '#fff',
                                                    // width: { md: 250, lg: 534 },
                                                    width: '100%',
                                                    padding: '10px 10px 0px 10px'
                                                }}
                                            >
                                                <Typography sx={{ fontSize: '13px', fontWeight: '700' }}>Tags</Typography>

                                                <Box sx={{ backgroundColor: '#fff', mt: '10px' }}>
                                                    {tags.map((tag, index) => (
                                                        <Box
                                                            key={index}
                                                            sx={{
                                                                display: 'inline-block',
                                                                mr: 1,
                                                                padding: '3px 8px',
                                                                bgcolor: '#f89b35',
                                                                borderRadius: '4px',
                                                                color: '#000',
                                                                fontSize: '10px'
                                                            }}
                                                        >
                                                            <Button
                                                                sx={{
                                                                    padding: '0px',
                                                                    color: '#000',
                                                                    fontSize: '12px',
                                                                    fontWeight: '500',
                                                                    minWidth: 'auto'
                                                                }}
                                                                component={LinkButton}
                                                                to={`/products/tags/${tag}`}
                                                            >
                                                                {tag}
                                                            </Button>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                        )}

                                        {products.length > 0 && (
                                            <Box
                                                sx={{
                                                    backgroundColor: '#fff',
                                                    //  width: { md: 250, lg: 534 },
                                                    width: '100%',
                                                    padding: '10px'
                                                }}
                                            >
                                                <Typography sx={{ fontSize: '13px', fontWeight: '700' }}>Products</Typography>
                                                <Stack sx={{ gap: '5px', mt: '10px' }}>
                                                    {products.map((product) => (
                                                        <SearchProductCard item={product} />
                                                    ))}
                                                </Stack>
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        </Stack>
                    )}
                </SearchBox>

                <Box sx={{ display: { xs: 'none', md: 'block', color: '#000' } }}>
                    {showResults && noDataFound && (
                        <Box
                            sx={{
                                mt: '5px',
                                ml: '16px',
                                backgroundColor: '#fff',
                                position: 'absolute',
                                left: '0px',
                                padding: '10px',
                                width: { md: 250, lg: 534 },
                                borderRadius: '4px'
                            }}
                        >
                            <Typography sx={{ fontSize: '12px' }}>No data found</Typography>
                        </Box>
                    )}
                    {showResults && (
                        <Box
                            sx={{
                                mt: '5px',
                                ml: '16px',
                                position: 'absolute',
                                left: '0px',
                                padding: '0px',
                                width: { md: 250, lg: 534 },
                                borderRadius: '4px'
                            }}
                        >
                            {tags.length > 0 && (
                                <Box sx={{ backgroundColor: '#fff', width: { md: 250, lg: 534 }, padding: '10px 10px 0px 10px' }}>
                                    <Typography sx={{ fontSize: '13px', fontWeight: '700' }}>Tags</Typography>

                                    <Box sx={{ backgroundColor: '#fff', mt: '10px' }}>
                                        {tags.map((tag, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: 'inline-block',
                                                    mr: 1,
                                                    padding: '3px 8px',
                                                    bgcolor: '#f89b35',
                                                    borderRadius: '4px',
                                                    color: '#000',
                                                    fontSize: '10px'
                                                }}
                                            >
                                                <Button
                                                    sx={{
                                                        padding: '0px',
                                                        color: '#000',
                                                        fontSize: '12px',
                                                        fontWeight: '500',
                                                        minWidth: 'auto'
                                                    }}
                                                    component={LinkButton}
                                                    to={`/products/tags/${tag}`}
                                                >
                                                    {tag}
                                                </Button>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {products.length > 0 && (
                                <Box sx={{ backgroundColor: '#fff', width: { md: 250, lg: 534 }, padding: '10px' }}>
                                    <Typography sx={{ fontSize: '13px', fontWeight: '700' }}>Products</Typography>
                                    <Stack sx={{ gap: '5px', mt: '10px' }}>
                                        {products.map((product) => (
                                            <SearchProductCard item={product} />
                                        ))}
                                    </Stack>
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'none' } }}>
                {/* <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <>
                            <Box sx={{}}>
                                <HeaderAvatar sx={{ background: 'none' }} {...bindToggle(popupState)}>
                                    <IconSearch stroke={2.5} size="25.2px" color='#fff' />
                                </HeaderAvatar>
                            </Box>
                            <Popper
                                {...bindPopper(popupState)}
                                transition
                                sx={{ zIndex: 1100, width: '99%', top: '-55px !important', px: { xs: 1.25, sm: 1.5 } }}
                            >
                                {({ TransitionProps }) => (
                                    <>
                                        <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                                            <Card sx={{ bgcolor: 'background.default', border: 0, boxShadow: 'none' }}>
                                                <Box sx={{ p: 1 }}>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item xs>
                                                            <MobileSearch value={value} handleChange={handleChange} popupState={popupState} />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Card>
                                        </Transitions>
                                    </>
                                )}
                            </Popper>
                        </>
                    )}
                </PopupState> */}
                {/* <Box sx={{ display: { xs: ' none', md: 'none', color: '#000', } }}>

                    {showResults && noDataFound && (
                        <Box
                            sx={{
                                mt: '5px',
                                ml: '16px',
                                backgroundColor: '#fff',
                                position: 'absolute',
                                left: '0px',
                                padding: '10px',
                                // width: { md: 250, lg: 534 },
                                borderRadius: '4px',
                                width: 'calc(100% - 30px)',
                                zIndex: '1200',
                            }}
                        >
                            <Typography sx={{ fontSize: '12px' }}>No data found</Typography>
                        </Box>
                    )}
                    {showResults && (
                        <Box
                            sx={{
                                mt: '5px',
                                ml: '16px',
                                position: 'absolute',
                                left: '0px',
                                padding: '0px',
                                // width: { md: 250, lg: 534 },
                                width: 'calc(100% - 30px)',
                                borderRadius: '4px',
                                zIndex: '1200',
                            }}
                        >
                            {tags.length > 0 && (
                                <Box sx={{
                                    backgroundColor: '#fff',
                                    // width: { md: 250, lg: 534 }, 
                                    width: '100%',
                                    padding: '10px 10px 0px 10px'
                                }}>
                                    <Typography sx={{ fontSize: '13px', fontWeight: '700' }}>Tags</Typography>

                                    <Box sx={{ backgroundColor: '#fff', mt: '10px' }}>
                                        {tags.map((tag, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: 'inline-block',
                                                    mr: 1,
                                                    padding: '3px 8px',
                                                    bgcolor: '#f89b35',
                                                    borderRadius: '4px',
                                                    color: '#000',
                                                    fontSize: '10px'
                                                }}
                                            >
                                                <Button sx={{ padding: '0px', color: '#000', fontSize: '12px', fontWeight: '500', minWidth: 'auto', }} component={LinkButton} to={`/products/tags/${tag}`}>
                                                    {tag}
                                                </Button>


                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {products.length > 0 && (
                                <Box sx={{
                                    backgroundColor: '#fff',
                                    //  width: { md: 250, lg: 534 },
                                    width: '100%',
                                    padding: '10px'
                                }}>
                                    <Typography sx={{ fontSize: '13px', fontWeight: '700' }}>Products</Typography>
                                    <Stack sx={{ gap: '5px', mt: '10px' }}>
                                        {products.map((product) => (
                                            <SearchProductCard item={product} />

                                        ))}
                                    </Stack>
                                </Box>
                            )}
                        </Box>
                    )}
                </Box> */}
            </Box>
        </>
    );
};

// Custom debounce function
function debounce(func: (...args: any[]) => void, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export default SearchSection;
