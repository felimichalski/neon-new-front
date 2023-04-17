import { Carousel } from "@mantine/carousel";
import { Box, Container, createStyles, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { featuredFetch } from "../../features/actions/featuredActions";
import Product from "../Product";

const useStyles = createStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        width: '90%',
    },

    titleBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 0 1rem 0',
    },

    title: {
        fontFamily: 'ITC Avant Garde Gothic',
        fontWeight: 400,
        fontSize: 22,
        textTransform: 'capitalize',
    },

    cardContainer: {
        backgroundColor: '#F0F0F0',
        width: '100%',
        // padding: '0 2rem',
        borderRadius: 10
    },

    cardSlide: {
        // display: 'flex',
        // justifyContent: 'center',
        padding: '3rem 1rem',
    }
}));

const FeaturedProducts = () => {
    const { classes } = useStyles();

    const data = useSelector(state => state.featured)
    const dispatch = useDispatch();
    const [products, setProducts] = useState(undefined)

    useEffect(() => {
        dispatch(featuredFetch());
    }, [dispatch])

    useEffect(() => {
        if(data.status === 'success') {
            setProducts(data.items);
        }
    }, [data])

    return (
        <Container fluid className={classes.root}>
            <Box className={classes.titleBar}>
                <Title className={classes.title}>Nuestros destacados</Title>
                <Text style={{
                    fontWeight: 600,
                }}>Ver más</Text>
            </Box>
            <Box className={classes.cardContainer}>
                <Carousel
                    align='start'
                    loop='true'
                    slideSize={`${100 / 5}%`}
                    slidesToScroll={1}
                    draggable={false}
                    styles={{
                        viewport: {
                            padding: '0 8px'
                        }
                    }}
                >
                    {products && products.map((product, key) => (
                        <Carousel.Slide key={key} className={classes.cardSlide}>
                            <Product data={product} hoverEffects={true}/>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </Box>
        </Container>
    )
}

export default FeaturedProducts