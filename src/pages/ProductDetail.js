import { useEffect, useState } from "react"
import { Grid, Image, createStyles } from "@mantine/core"
import { useParams } from "react-router-dom"
import FeaturedProducts from "../components/FeaturedProducts"

const useStyles = createStyles((theme) => ({
    column: {
        margin: 0,
        padding: 0,
    },

    prodImage: {
        aspectRatio: '1 / 1',
        width: '100% !important',
    },
}));

const ProductDetail = () => {
    const { classes } = useStyles();
    const { id } = useParams()
    const [product, setProduct] = useState()
    useEffect(() => {
        const loadProduct = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
            });

            const data = await response.json()
            setProduct(data)
        }
        loadProduct();
    }, [id])
    return (
        <>
            <Grid mr={1} mb={100} style={{
                // height: '100vh'
            }}>
                {product &&
                    <Grid.Col span={6} className={classes.column}>
                        <Image className={classes.prodImage} src={`${process.env.REACT_APP_API_URL}/mediafiles/${product.images[0].key}`} />
                    </Grid.Col>
                }
            </Grid>
            <FeaturedProducts />
        </>
    )
}
export default ProductDetail