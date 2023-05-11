import React from 'react'
import Product from '../Product'
import { Box } from '@mantine/core'
import CreateProduct from '../CreateProduct'

const ProductsSection = ({ products, page }) => {
    console.log(products.length)
    /* let productContainer = []; */
    /* products.map(prod=>productContainer.push(prod)) */
    const productsContainer = products.slice(page===1?0:(page-1)*6,page*6);
    return (
        <Box style={{display: 'flex', flexWrap: 'wrap'}}>
            {productsContainer.map((product, key) => (
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