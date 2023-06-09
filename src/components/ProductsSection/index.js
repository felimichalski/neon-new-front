import { createStyles } from '@mantine/core'
import React from 'react'
import Product from '../Product'
import { Box } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    root:{
        display: 'flex', flexWrap: 'wrap', height:"135vh", 
        [`@media (max-width: 600px)`]: {
            height:"auto"
        },
    },
    eachProductBox:{
        width: '33%',
        padding: '1rem',
        [`@media (max-width: 600px)`]: {
            width:"100%",
        },
    },
}))

const ProductsSection = ({ products, page }) => {
    const {classes} = useStyles()
    /* let productContainer = []; */
    /* products.map(prod=>productContainer.push(prod)) */
    console.log(products)
    const productsContainer = products.slice(page===1?0:(page-1)*6,page*6);
    return (
        <Box className={classes.root}>
            {productsContainer.map((product, key) => (
                <Box className={classes.eachProductBox} key={key} /* style={{
                    width: '33%',
                    padding: '1rem',
                    
                }} */>
                    <Product data={product} key={key} hoverEffects={false}/>
                </Box>
            ))}
        </Box>
    )
}

export default ProductsSection