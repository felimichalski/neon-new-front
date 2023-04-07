import { Container, LoadingOverlay } from '@mantine/core'

import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
import { customization } from '../utils/paymentConf';

import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@mantine/hooks';

const Checkout = () => {

    useDocumentTitle('Neon infinito - Checkout')
    const ref = useRef();
    const [initialization, setInitialization] = useState(undefined)
    const {auth, cart} = useSelector(state => state);
    const navigate = useNavigate()
    const [isDataReady, setIsDataReady] = useState(false);

    useEffect(() => {
        initMercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY, { locale: 'es-AR' });
    }, []);

    useEffect(() => {
        const fetchPaymentInfo = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.userToken}`,
                },
                body: JSON.stringify({
                    items: cart.cartItems
                })
            })

            if (response.status !== 201) {
                return navigate('/cart')
            }

            const { id } = await response.json()

            setInitialization({
                amount: cart.cartTotalAmount,
                preferenceId: id
            })
            setIsDataReady(true);
        }

        if (auth.status === 'success' && cart.status === 'success') {
            fetchPaymentInfo();
        }
    }, [auth, cart, navigate]);

    useEffect(() => {
        console.log('cambio')
    })

    return (
        <Container style={{
            minHeight: '80vh',
            position: 'relative'
        }}>
            <LoadingOverlay visible={true} ref={ref} style={{
                height: '100%',

            }}/>
            {isDataReady && 
            <Payment
                initialization={initialization}
                customization={customization}
                onReady={() => {
                    ref.current.remove()
                }}
                style={{
                    width: '80vw',
                    maxWidth: '40rem',        
                }}
            />
            }
        </Container>
    )
}

export default Checkout