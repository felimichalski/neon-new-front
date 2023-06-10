import { Box, Button, Container, createStyles, Divider, Grid, List, Text, Title } from '@mantine/core'
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import CartItem from '../components/CartItem';

import { motion } from 'framer-motion';
import { useDocumentTitle } from '@mantine/hooks';

const useStyles = createStyles((theme, { top }) => ({
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
        [`@media (max-width: 600px)`]: {
            display:"none",
          },
    },
    flex:{
        height:"100vh",
        width:"100%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-around",
        [`@media (min-width: 600px)`]: {
            display:"none",
          },
    },
    flexCart:{
        width:"90%",
        height:"27rem",
        /* border:"1px solid grey" */
        [`@media (max-width: 600px)`]: {
            width:"100%",
          },
    },
    flexButtons:{
        marginTop:"2rem",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        background:"#EEEEEE",
        width:"80%",
        padding:"1rem",
        borderRadius:"1rem"
    },
    flexList:{
        height:"100%",
        overflowY:"scroll",
        overflowX:"hidden",
        padding:"0 1rem",
        backgroundColor:"#F9F9F9",
        /* border:"1px solid " */
        [`@media (max-width: 600px)`]: {
            width:"100%",
          },
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
        borderRadius: 7,
        boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.5)',
    },

    payContainer: {
        backgroundColor: theme.colors.gray[2],
        borderRadius: 7,
        position: 'sticky',
        top,
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 10px',
    },

    payButton: {
        width: '100%'
    }
}));

const Cart = () => {

    useDocumentTitle('Neon infinito - Carrito')

    const payContainerRef = useRef();
    const [top, setTop] = useState(0)

    const { classes } = useStyles({ top });
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const data = useSelector((state) => state.cart);

    useEffect(() => {
        if (data.status === 'success') {
            setItems(data.cartItems)
        }
    }, [data]);

    useEffect(() => {
        if (payContainerRef.current.offsetTop) setTop(payContainerRef.current.offsetTop)
    }, [payContainerRef])

    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
            <Container fluid className={classes.root}>
                {/* RESPONSIVE */}
                <Box className={classes.flex}>
                    <Box className={classes.flexCart}>
                    <Box className={classes.titleBar}>
                            <Title className={classes.title}>Mi Carrito</Title>
                            <Text className={classes.quantity}>{data.cartTotalQuantity} producto/s</Text>
                        </Box>
                        <List className={classes.flexList} listStyleType='none' styles={{
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
                    </Box>
                    <Box className={classes.flexButtons}>
                    <Title mb={40}>TOTAL: ${data.cartTotalAmount}</Title>
                        <Button onClick={() => navigate('/categories')} className={classes.payButton} color='gray' mb={10}>Seguir comprando</Button>
                        <Button onClick={() => navigate('/checkout')} className={classes.payButton}>Finalizar compra</Button>
                    </Box>
                </Box>
                {/* NO RESPONSIVE */}
                <Grid m={30} className={classes.grid} ref={payContainerRef}>
                    <Grid.Col span={7} className={[classes.productsList, classes.column]}>
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
                    <Grid.Col span={4} offset={1} className={[classes.payContainer, classes.column]}>
                        <Title mb={40}>TOTAL: ${data.cartTotalAmount}</Title>
                        <Button onClick={() => navigate('/categories')} className={classes.payButton} color='gray' mb={10}>Seguir comprando</Button>
                        <Button onClick={() => navigate('/checkout')} className={classes.payButton}>Finalizar compra</Button>
                    </Grid.Col>
                </Grid>
            </Container>
        </motion.div>
    )
}

export default Cart