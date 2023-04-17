import React from 'react'
import Product from '../Product'
import { Box } from '@mantine/core'

const ProductsSection = ({ products }) => {
    return (
        <Box style={{display: 'flex', flexWrap: 'wrap'}}>
            {products.map((product, key) => (
                <Box style={{
                    width: '33%',
                    padding: '1rem'
                }}>
                    <Product data={product} key={key} hoverEffects={false}/>
                </Box>
            ))}
        </Box>
    )
}

export default ProductsSection