import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

// third-party
import { IconAdjustments, IconX } from '@tabler/icons-react';
import { ProductCards as ProductCardsSkeleton } from 'views/Skeleton/Products/ProductCards';

import { ProductCard } from './subcard/productCard';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { categoryProducts, productFilters } from 'api/ProductApi';
import { NoProducts } from './NoProducts';
import { ProductFilterSkeleton } from 'views/Skeleton/Products/ProductFilter';

// =============================|| LANDING - CARD SECTION ||============================= //

const ProductsDetails = styled(Box)(() => ({
    borderRadius: '0px',
    padding: '15px 10px 20px 10px',
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    '.MuiBreadcrumbs-root': {
        color: '#fff'
    },
    '.MuiTypography-root': {
        color: '#fff'
    }
}));

const Filterview = styled(Stack)(() => ({
    borderBottom: '1px solid rgba(255,255,255,0.25)',
    svg: {
        path: { fill: '#fff' }
    },
    '.Mui-checked': {
        svg: {
            path: { fill: '#fff' }
        }
    },
    '.MuiCheckbox-root': {
        // svg: { stroke: '#fff' }
    },
    '.MuiTypography-root': {
        fontSize: '12px'
    }
}));

const ProductFilter = styled(Stack)(() => ({
    // borderBottom: '1px solid rgba(255,255,255,0.25)',
    marginBottom: '5px',
    '.MuiTypography-root': { fontSize: '12px', textTransform: 'uppercase', },

    svg: {
        path: { fill: '#fff' }
    }
}));

const ProductList = styled(Box)(() => ({
    '.dropdown-field': {
        '.MuiFormControl-root': {
            '.MuiInputLabel-root': {
                color: '#fff'
            },
            '.MuiInputBase-root': {
                color: '#fff',
                '&:before': {
                    borderBottom: '1px solid #fff'
                }
            },
            '.MuiNativeSelect-icon': {
                fill: '#fff'
            }
        }
    },
    '.filter-head': {
        color: '#fff',
        fontSize: '16px',
        lineHeight: '28px',
        borderBottom: '1px solid rgba(255,255,255,0.25)',
        paddingBottom: '10px',
        marginBottom: '10px'
    },
    '.product-list-item': {
        marginBottom: '24px',
        '.textcontent': { minHeight: 'auto !important', marginTop: '10px !important' },
        '.productname': { minHeight: 'auto !important', marginTop: '10px !important' }
    }
}));

const SaleLable = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: '#fff',
    padding: '5px',
    '.newitem': { background: '#000', padding: '5px', fontSize: '12px', fontWeight: '500', color: '#fff' },
    '.offer': { background: '#f85464', padding: '5px', fontSize: '12px', fontWeight: '500', color: '#fff' },
    '.sale': { background: '#ffb001', padding: '5px', fontSize: '12px', fontWeight: '500', color: '#000' }
}));

interface AttributeValue {
    id: number;
    attributeValue: string;
    attributeId: string;
    attributeName: string;
    attributeValueName: string;
}

interface Filter {
    attribute: string;
    values: AttributeValue[];
}

const ProductsList = () => {
    const { searchBy, categoryName } = useParams<{ categoryName: string }>(); // Extract category name from URL
    const [products, setProdcuts] = useState<any[]>([]);
    const [filters, setFilters] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
    const [mobileFilter, setMobileFilter] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        if (categoryName) {
            const getProducts = async () => {
                try {
                    setLoading(true);
                    setIsSuccess(false);

                    const filterObj = selectedFilters || null;
                    const products = await categoryProducts(searchBy, categoryName, filterObj);
                    setProdcuts(products);
                    setLoading(false);
                    setIsSuccess(true);
                } catch (error) {
                    setError('Failed to load products');
                    setIsSuccess(false);
                    setLoading(false);
                } finally {
                }
            };

            getProducts();
        }
    }, [categoryName, searchBy, selectedFilters]);

    useEffect(() => {
        if (categoryName) {
            const getProductFilters = async () => {
                try {
                    const products = await productFilters(searchBy, categoryName);
                    setFilters(products);
                } catch (error) {
                    setError('Failed to load filters');
                } finally {
                    // setLoading(false);
                }
            };

            getProductFilters();
        }
    }, [categoryName, searchBy]);

    const handleFilterChange = (attributeName: string, attributeValue: string, checked: boolean) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (checked) {
                if (!updatedFilters[attributeName]) {
                    updatedFilters[attributeName] = [];
                }
                updatedFilters[attributeName].push(attributeValue);
            } else {
                updatedFilters[attributeName] = updatedFilters[attributeName].filter((value) => value !== attributeValue);
                if (updatedFilters[attributeName].length === 0) {
                    delete updatedFilters[attributeName];
                }
            }
            return updatedFilters;
        });
    };

    const { brands, priceRanges } = filters;
    const filterData = filters?.filters || [];
    const groupedFilters = filterData?.reduce<{ [key: string]: AttributeValue[] }>((acc, filter) => {
        filter.values.forEach((value) => {
            if (!acc[value.attributeName]) {
                acc[value.attributeName] = [];
            }
            const exists = acc[value.attributeName]?.some((attribute: any) => attribute.attributeValueName === value.attributeValueName);
            if (!exists) acc[value.attributeName].push(value);
        });
        return acc;
    }, {});

    console.log(products?.length, 'productsproducts');

    console.log(loading, 'loading');
    console.log(isSuccess, 'isSuccess');
    return (
        <Container sx={{ padding: '0px' }}>
            <ProductsDetails>
                <Grid container>
                    <Grid item xs={12} sx={{ padding: '0px' }}>
                        <Box sx={{ padding: '0px' }}>
                            {/* <Breadcrumbs  sx={{}} aria-label="breadcrumb">
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    href="/"
                                    sx={{
                                        [theme.breakpoints.down('sm')]: {
                                            fontSize: '12px'
                                        }
                                    }}
                                >
                                    Home
                                </Link>
                                <Typography
                                    color="text.primary"
                                    sx={{
                                        [theme.breakpoints.down('sm')]: {
                                            fontSize: '12px'
                                        }
                                    }}
                                >
                                    {categoryName}
                                </Typography>
                            </Breadcrumbs> */}
                        </Box>
                    </Grid>
                </Grid>
            </ProductsDetails>


            {loading && (
                <>
                    <Stack sx={{ display: { xs: 'none', md: ' block', marginBottom: '24px' } }}>
                        <Container sx={{ display: 'flex', flexDirection: 'row', padding: '0px !important' }}>
                            <Grid item md={2} sm={2} xs={12} sx={{ width: '20%' }}>
                                <ProductFilterSkeleton />
                            </Grid>
                            <Grid
                                item
                                md={10}
                                sm={10}
                                xs={12}
                                sx={{ display: { marginBottom: '24px', paddingRight: '24px', width: '80%' } }}
                            >
                                <ProductCardsSkeleton />
                                <ProductCardsSkeleton />
                            </Grid>
                        </Container>
                    </Stack>
                    <Stack sx={{ display: { xs: 'block', md: ' none', marginBottom: '24px' } }}>
                        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Grid item md={2} sm={2} xs={12} sx={{ width: '100%' }}>
                                <ProductFilterSkeleton />
                            </Grid>
                            <Grid item md={10} sm={10} xs={12} sx={{ display: { width: '100%' } }}>
                                <ProductCardsSkeleton />
                                <ProductCardsSkeleton />
                            </Grid>
                        </Container>
                    </Stack>
                </>
            )}


            {isSuccess && (

                <ProductList>

                    <Grid container>
                        <Grid
                            item
                            md={2}
                            sm={2}
                            xs={12}
                            sx={{ display: { xs: 'none', md: 'block', marginBottom: '24px', paddingRight: '24px' } }}
                        >
                            <Stack sx={{ borderBottom: '1px solid rgba(255,255,255,0.25)' }}>
                                <Typography className="filter-head">Filter:</Typography>
                                <Filterview>
                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            fontWeight: '600',
                                            fontSize: '16px !important',
                                            paddingTop: '10px',
                                            paddingBottom: '10px',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        Brands
                                    </Typography>
                                    <Stack
                                        sx={{
                                            width: '100%',
                                            flexDirection: 'column',
                                            maxHeight: '180px',
                                            overflowY: 'auto',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {brands &&
                                            brands.map((b) => (
                                                <ProductFilter>
                                                    <FormControlLabel
                                                        sx={{ color: '#fff', fontSize: '2px', fontWeight: '400', }}
                                                        control={
                                                            <Checkbox sx={{ paddingBottom: '0px', paddingTop: '0px' }}
                                                                checked={selectedFilters['Brands']?.includes(b.brandName) || false}
                                                                onChange={(e) =>
                                                                    handleFilterChange('Brands', b.brandName, e.target.checked)
                                                                }
                                                            />
                                                        }
                                                        key={b.id}
                                                        label={b.brandName}
                                                    />
                                                </ProductFilter>
                                            ))}
                                    </Stack>
                                </Filterview>
                            </Stack>

                            <Stack sx={{ borderBottom: '1px solid rgba(255,255,255,0.25)' }}>
                                {Object.keys(groupedFilters)?.map((attributeName) => (
                                    <Stack
                                        sx={{ borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '10px' }}
                                        key={attributeName}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#fff',
                                                fontWeight: '600',
                                                fontSize: '16px !important',
                                                paddingTop: '10px',
                                                paddingBottom: '10px',
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            {attributeName} :
                                        </Typography>

                                        <Stack
                                            sx={{
                                                width: '100%',
                                                flexDirection: 'column',
                                                maxHeight: '180px',
                                                overflowY: 'auto',
                                                marginBottom: '20px'
                                            }}
                                        >
                                            {groupedFilters[attributeName].map((value) => (
                                                <ProductFilter>
                                                    <FormControlLabel
                                                        key={value.id}
                                                        sx={{ color: '#fff', fontSize: '10px', fontWeight: '600' }}
                                                        control={
                                                            <Checkbox sx={{ paddingBottom: '0px', paddingTop: '0px' }}
                                                                checked={
                                                                    selectedFilters[attributeName]?.includes(value.attributeValueName) || false
                                                                }
                                                                onChange={(e) =>
                                                                    handleFilterChange(
                                                                        attributeName,
                                                                        value.attributeValueName,
                                                                        e.target.checked
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={`${value.attributeValueName}`}
                                                    />
                                                </ProductFilter>
                                            ))}
                                        </Stack>

                                    </Stack>
                                ))}
                            </Stack>

                        </Grid>
                        <Grid item md={10} sm={12} xs={12} sx={{ position: 'relative' }}>
                            <Grid item justifyContent={'space-between'} sx={{ display: { xs: 'none', md: ' block', position: 'absolute', top: '-60px', right: '10px' } }}>
                                <Box sx={{ minWidth: 100, display: 'none' }} className="dropdown-field">
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Sort by:
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={10}
                                            inputProps={{
                                                name: 'sort',
                                                id: 'uncontrolled-native'
                                            }}
                                        >
                                            <option value={10}>Featured</option>
                                            <option value={20}>Alphabetically, A-Z</option>
                                            <option value={30}>Alphabetically, Z-A</option>
                                            <option value={40}>Price, low to high</option>
                                            <option value={50}>Price, high to low</option>
                                            <option value={60}>Date, old to new</option>
                                            <option value={70}>Date, new to old</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid container spacing={0}>
                                <Stack sx={{ display: { xs: 'block', md: 'none' } }}>
                                    <Button
                                        sx={{
                                            position: 'absolute',
                                            right: 15,
                                            top: -43,
                                            display: 'flex',
                                            gap: '10px',
                                            // paddingLeft: '15px',
                                            background: '#f89b35'
                                        }}
                                        onClick={() => setMobileFilter(true)}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#000',
                                                fontSize: '14px',
                                                [theme.breakpoints.down('sm')]: {
                                                    fontSize: '13px'
                                                }
                                            }}
                                        >
                                            filter
                                        </Typography>{' '}
                                        <IconAdjustments color="#000" size={'16px'} />
                                    </Button>
                                    {mobileFilter && (
                                        <Stack
                                            sx={{
                                                borderBottom: '1px solid rgba(255,255,255,0.25)',
                                                background: '#000',
                                                padding: '20px',
                                                width: '100%',
                                                position: 'fixed',
                                                right: 0,
                                                top: 120,
                                                zIndex: 9999,
                                                height: '100%',
                                                transition: 'transform 0.20s ease, 0.20s ease',
                                                transform: 'translate(0)'
                                            }}
                                        >
                                            <Button
                                                sx={{ position: 'absolute', right: 0, top: 0, display: 'flex', gap: '10px' }}
                                                onClick={() => setMobileFilter(false)}
                                            >
                                                <IconX color="#fff" />
                                            </Button>
                                            <Typography className="filter-head" sx={{ fontSize: '16px !important' }}>
                                                Filter:
                                            </Typography>
                                            <Filterview>
                                                <Typography
                                                    sx={{
                                                        color: '#fff',
                                                        fontSize: '16px !important',
                                                        paddingTop: '10px',
                                                        paddingBottom: '0px',
                                                        textTransform: 'capitalize'
                                                    }}
                                                >
                                                    Brands
                                                </Typography>
                                                <Stack sx={{ flexWrap: 'wrap', width: '100%', flexDirection: 'row' }}>
                                                    {brands &&
                                                        brands.map((b) => (
                                                            <ProductFilter>
                                                                <FormControlLabel
                                                                    sx={{ color: '#fff', fontSize: '2px', fontWeight: '400' }}
                                                                    control={
                                                                        <Checkbox
                                                                            checked={
                                                                                selectedFilters['Brands']?.includes(b.brandName) || false
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleFilterChange('Brands', b.brandName, e.target.checked)
                                                                            }
                                                                        />
                                                                    }
                                                                    key={b.id}
                                                                    label={b.brandName}
                                                                />
                                                            </ProductFilter>
                                                        ))}
                                                </Stack>
                                            </Filterview>
                                            <Stack sx={{ borderBottom: '1px solid rgba(255,255,255,0.25)' }}>
                                                {Object.keys(groupedFilters)?.map((attributeName) => (
                                                    <ProductFilter
                                                        sx={{
                                                            borderBottom: '1px solid rgba(255,255,255,0.25)',
                                                            flexDirection: 'column',
                                                            paddingBottom: '10px'
                                                        }}
                                                        key={attributeName}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color: '#fff',
                                                                width: '100%',
                                                                fontSize: '16px !important',
                                                                paddingTop: '10px',
                                                                paddingBottom: '0px',
                                                                textTransform: 'capitalize'
                                                            }}
                                                        >
                                                            {attributeName} :
                                                        </Typography>
                                                        <Stack sx={{ flexWrap: 'wrap', width: '100%', flexDirection: 'row' }}>
                                                            {groupedFilters[attributeName].map((value) => (
                                                                <FormControlLabel
                                                                    key={value.id}
                                                                    sx={{ color: '#fff', fontSize: '10px', fontWeight: '600' }}
                                                                    control={
                                                                        <Checkbox
                                                                            checked={
                                                                                selectedFilters[attributeName]?.includes(
                                                                                    value.attributeValueName
                                                                                ) || false
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleFilterChange(
                                                                                    attributeName,
                                                                                    value.attributeValueName,
                                                                                    e.target.checked
                                                                                )
                                                                            }
                                                                        />
                                                                    }
                                                                    label={`${value.attributeValueName}`}
                                                                />
                                                            ))}
                                                        </Stack>
                                                    </ProductFilter>
                                                ))}
                                            </Stack>

                                            <Grid container>
                                                <Grid item xs={2} justifyContent={'space-between'}>
                                                    <Box sx={{ minWidth: 100 }} className="dropdown-field">
                                                        <FormControl fullWidth>
                                                            <InputLabel
                                                                sx={{
                                                                    fontSize: '20px !important',
                                                                    paddingTop: '20px',
                                                                    position: 'inherit'
                                                                }}
                                                                variant="standard"
                                                                htmlFor="uncontrolled-native"
                                                            >
                                                                Sort by:
                                                            </InputLabel>
                                                            <NativeSelect
                                                                sx={{ marginTop: '0px !important' }}
                                                                defaultValue={10}
                                                                inputProps={{
                                                                    name: 'sort',
                                                                    id: 'uncontrolled-native'
                                                                }}
                                                            >
                                                                <option value={10}>Featured</option>
                                                                <option value={20}>Alphabetically, A-Z</option>
                                                                <option value={30}>Alphabetically, Z-A</option>
                                                                <option value={40}>Price, low to high</option>
                                                                <option value={50}>Price, high to low</option>
                                                                <option value={60}>Date, old to new</option>
                                                                <option value={70}>Date, new to old</option>
                                                            </NativeSelect>
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Stack>
                                    )}
                                </Stack>

                                {!loading && isSuccess && products?.length === 0 && (

                                    <NoProducts />

                                )}
                                {products?.map((prod, i) => (
                                    <Grid key={i} item className="product-list-item" md={3} sm={4} xs={6}>
                                        <ProductCard {...prod} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </ProductList>
            )}
        </Container>
    );
};

export default ProductsList;
