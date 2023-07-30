import { Button, Card, createStyles, Image, Text, Title } from "@mantine/core"
import { AddShoppingCart } from '@styled-icons/material'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../features/slices/cartSlice'
import { Link } from 'react-router-dom'
import { Carousel } from '@mantine/carousel'

const useStyles = createStyles((theme, { hoverEffects }, getStylesRef) => ({
    root: {
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 7,
        transition: 'all .1s linear',
        boxShadow: '0 8px 42px rgb(0 0 0 / 20%)',
        height: '100%',

        [`&:hover`]: {
            transform: hoverEffects && 'scale(1.02)',
            boxShadow: hoverEffects && '0 8px 42px rgb(0 0 0 / 20%)',
        },
        [`@media (max-width: 600px)`]: {
            width: "15rem"
        },
    },

    imageSection: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },

    textSection: {
        // alignSelf: 'flex-start',
        padding: '1rem !important',
        textAlign: 'center',
    },

    priceSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '.5rem !important',
        justifySelf: 'flex-end'
    },

    category: {
        color: theme.colors.gray[5],
        fontSize: 12,
        fontFamily: 'ITC Avant Garde Gothic Cn',
        fontWeight: 400,
        textTransform: 'uppercase'
    },

    title: {
        fontSize: 20,
        fontFamily: 'ITC Avant Garde Gothic',
        fontWeight: 400,
        marginBottom: '.5rem',
        textDecoration: "none",
        color: "black"
    },

    button: {
        fontFamily: 'ITC Avant Garde Gothic',
        fontWeight: 400,
        backgroundColor: 'black !important',

        '&:hover': {
            backgroundColor: `${theme.colors.gray[8]} !important`
        }
    },

    link: {
        textDecoration: "none",
        color: 'black',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },    
}));

const Product = ({ data, hoverEffects }) => {
    const { classes } = useStyles({ hoverEffects });
    const dispatch = useDispatch();
    
    return (
        <Card radius={0} className={classes.root}>
            <Card.Section className={classes.imageSection}>
                {data.images.length > 1 ?
                    <Carousel
                    loop
                    draggable={false}
                    styles={{
                        control: {
                            background: 'none',
                            border: 'none',
                            color: 'white'
                        }
                    }}
                    >
                        {data.images.map((image, key) => (
                            <Carousel.Slide key={key}>
                                <Link className={classes.link} to={`/product/${data.id}`}>
                                    <Image src={`${process.env.REACT_APP_API_URL}/mediafiles/${image.key}`} />
                                </Link>
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                : data.images.length > 0 &&
                    <Link className={classes.link} to={`/product/${data.id}`}>
                        <Image src={`${process.env.REACT_APP_API_URL}/mediafiles/${data.images[0].key}`}/>
                    </Link>
                }
            </Card.Section>
            <Link className={classes.link} to={`/product/${data.id}`}>
                <Card.Section radius={0} className={classes.textSection}>
                    <Title className={classes.title}>{data.title}</Title>
                    {/* <Text className={classes.category}>{data.categories}</Text> */}
                </Card.Section>
            </Link>

            <Card.Section radius={0} className={classes.priceSection} component="a">
                <Text>${data.unit_price}</Text>
                <Button className={classes.button} onClick={() => dispatch(addToCart(data))}><AddShoppingCart size={20} /></Button>
            </Card.Section>
        </Card>


    )
}

export default Product