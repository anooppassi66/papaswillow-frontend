import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const ProductWeightText = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: '400',
    marginTop: '4px',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
        fontWeight: '500'
    }
}));

const ProductSizeText = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: '400',
    marginTop: '4px',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
        fontWeight: '500'
    }
}));

const Variant = ({ variants }) => {
    const vari = variants.map((v) => ({
        ...v, // spread the original properties
        attributeContent: JSON.parse(v.attributeContent) // create a new attributeContent property with parsed data
    }));

    return (
        <>
            {vari.map((v) => (
                <React.Fragment key={v.id}>
                    {v.attributeContent.map((attr) => (
                        <ProductWeightText key={attr.id}>
                            {attr.attributeName}: {attr.attributeValueName}
                        </ProductWeightText>
                    ))}
                </React.Fragment>
            ))}
        </>
    );
};

export default Variant;
