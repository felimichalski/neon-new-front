import {
    LoadingOverlay,
    Modal,
} from '@mantine/core';
import { Payment, initMercadoPago } from '@mercadopago/sdk-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function PaymentModal({ opened, setOpened, info }) {

    const navigate = useNavigate()
    const ref = useRef();
    const [initialization, setInitialization] = useState(undefined)
    const [isDataReady, setIsDataReady] = useState(false);
    const { auth, cart } = useSelector(state => state);

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

        if (auth.status === 'success' && cart.status === 'success' && opened === true) {
            fetchPaymentInfo();
        }
    }, [auth, cart, navigate, opened]);

    const savePaymentInfo = async (info) => {
        // TODO implement this method to save user info before confirm or reject the payment,
        // then with the endpoints change the status "pending" for which correspond.
    }

    return (
        <Modal
            radius="md"
            p="xl"
            opened={opened}
            onClose={() => setOpened(false)}
            centered
            zIndex={10000000}
            transitionDuration={200}
            exitTransitionDuration={200}
        >
            <LoadingOverlay
                visible={true}
                ref={ref}
                overlayOpacity={1}
                style={{
                    height: '100%',
                }}
            />
            {isDataReady && 
                <Payment
                    initialization={initialization}
                    customization={{
                        paymentMethods: {
                            ticket: "all",
                            creditCard: "all",
                            debitCard: "all",
                            mercadoPago: "all",
                        },
                    }}
                    onReady={() => {
                        ref.current.remove()
                    }}
                    onSubmit={() => {
                        setOpened(false)
                        savePaymentInfo(info)
                    }}
                />
            }
        </Modal>
    );
}