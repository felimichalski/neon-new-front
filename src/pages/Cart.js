import { Box, Button, Container, createStyles, Divider, Grid, List, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import CartItem from '../components/CartItem';

import { motion } from 'framer-motion';
import { useDocumentTitle } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    grid: {
        minHeight: '80vh',
        width: '90%',
        borderRadius: 7,
        boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.5)',
    },

    column: {
        padding: '1rem',
    },

    titleBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },

    title: {
        fontFamily: 'Proxima Nova',
        fontWeight: 600
    },

    quantity: {
        fontFamily: 'ITC Avant Garde Gothic Cn',
        fontWeight: 500,
        color: theme.colors.gray[5]
    },

    productsList: {
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
    },

    payContainer: {
        backgroundColor: theme.colors.gray[1],
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
    }
}));

const Cart = () => {

    useDocumentTitle('Neon infinito - Carrito')

    // const payContainerRef = useRef();
    // const [top, setTop] = useState(0)

    const { classes } = useStyles();
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const data = useSelector((state) => state.cart);
    const userToken = useSelector((state) => state.auth.userToken);

    useEffect(() => {
        if (data.status === 'success') {
            setItems(data.cartItems)
        }
    }, [data]);

    // useEffect(() => {
    //     if (payContainerRef.current.offsetTop) setTop(payContainerRef.current.offsetTop)
    // }, [payContainerRef])

    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
            <Container fluid className={classes.root}>
                <Grid m={30} className={classes.grid}>
                    <Grid.Col span={8} className={[classes.productsList, classes.column]}>
                        <Box className={classes.titleBar}>
                            <Title className={classes.title}>Mi Carrito</Title>
                            <Text className={classes.quantity}>{data.cartTotalQuantity} productos</Text>
                        </Box>
                        <List listStyleType='none' styles={{
                            itemWrapper: {
                                width: '100%',
                            }
                        }}>
                            {items && items.map((item, key) => (
                                <span key={key}>
                                    <Divider my='xs' />
                                    <List.Item style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <CartItem data={item} />
                                    </List.Item>
                                </span>
                            ))}
                            <Divider my='xs' />
                        </List>
                    </Grid.Col>
                    <Grid.Col span={4} className={[classes.payContainer, classes.column]}>
                        <Title>TOTAL: ${data.cartTotalAmount}</Title>
                        <Button onClick={() => navigate('/catalog')}>Seguir comprando</Button>
                        <Button onClick={() => userToken && navigate('/checkout')}>Finalizar compra</Button>
                    </Grid.Col>
                </Grid>
            </Container>
        </motion.div>
    )
}

export default Cart