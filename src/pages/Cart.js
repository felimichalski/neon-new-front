import { Box, Container, createStyles, Divider, Grid, List, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';

import { getTotals } from '../features/slices/cartSlice';

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

    // const payContainerRef = useRef();
    // const [top, setTop] = useState(0)

    const { classes } = useStyles();

    const [items, setItems] = useState([]);

    const data = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotals());
    }, [dispatch]);

    useEffect(() => {
        if (data.status === 'success') {
            setItems(data.cartItems)
        }
    }, [data]);

    // useEffect(() => {
    //     if (payContainerRef.current.offsetTop) setTop(payContainerRef.current.offsetTop)
    // }, [payContainerRef])

    return (
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
                    <h1>TOTAL: ${data.cartTotalAmount}</h1>
                </Grid.Col>
            </Grid>
        </Container>
    )
}

export default Cart