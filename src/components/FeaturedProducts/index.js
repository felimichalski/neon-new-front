import { Carousel } from "@mantine/carousel";
import { Box, Container, createStyles, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { featuredFetch } from "../../features/actions/featuredActions";
import Product from "../Product";
import { Link } from "react-router-dom";

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
        textDecoration:"none !important"
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
    },
}));

const FeaturedProducts = ({ customText }) => {
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
                <Title className={classes.title}>{customText ? customText : 'Nuestros destacados'}</Title>
                <Link sx={{textDecoration:"none !important"}} to="/categories/type/1">
                    <Text sx={{textDecoration:"none !important"}} style={{
                        fontWeight: 600,
                        textDecoration:"none !important",
                        color:"black"
                    }}>Ver más</Text>
                </Link>
            </Box>
            <Box className={classes.cardContainer}>
                <Carousel
                    align='start'
                    loop='true'
                    slideSize={`${100 / 5}%`}
                    slidesToScroll={1}
                    dragFree
                    styles={{
                        viewport: {
                            padding: '0 8px'
                        }
                    }}
                    breakpoints={[
                        { maxWidth: 'md', slideSize: '50%' },
                        { maxWidth: 'sm', slideSize: '60%', slideGap: 0},
                      ]}
                >
                    {products && products.map((product, key) => (
                        <Carousel.Slide key={key} className={classes.cardSlide}>
                            <Product className={classes.productTest} data={product} hoverEffects={true}/>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </Box>
        </Container>
    )
}

export default FeaturedProducts