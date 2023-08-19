import { Payment, Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderSteps from '../components/OrderSteps';
import { LoadingOverlay } from '@mantine/core';
import WaitingModal from '../components/WaitingModal';

const PaymentPage = ({ info, filled }) => {

    const [waitingModalOpen, setWaitingModalOpen] = useState(false)
    const navigate = useNavigate()
    const [initialization, setInitialization] = useState(undefined)
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        const fetchPaymentInfo = async () => {
            if (!filled) navigate('/checkout')
            await initMercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY, { locale: 'es-AR' });
            const response = await fetch(`${process.env.REACT_APP_API_URL}/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                preferenceId: id,
                redirectMode: 'modal'
            })
        }

        fetchPaymentInfo();
    }, [cart, navigate, info, filled]);

    const handleReady = () => {
        const loadingOverlay = document.querySelector("#loading-overlay")
        if (loadingOverlay) loadingOverlay.style.display = 'none'
    }

    const handleSubmit = () => {
        // setWaitingModalOpen(true)
    }

    return (
        <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            animate={{ filter: 'blur(0)', opacity: 1 }}
            exit={{ filter: 'blur(10px)', opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
                width: '100%',
                height: '100%',
                background: 'url(your-image.jpg) center/cover no-repeat',
            }} className="bg-white">
            <OrderSteps pageStep={2} />
            <LoadingOverlay
                id='loading-overlay'
                visible={true}
                overlayOpacity={1}
                style={{
                    height: '100vh',
                    position: 'relative'
                }}
            />
            <div className='mx-auto w-1/2 flex ijustify-center'>
            {initialization &&
                <Wallet
                    initialization={initialization}
                    customization={{
                        paymentMethods: {
                            creditCard: "all",
                            // debitCard: "all",
                            mercadoPago: "all",
                        },
                        visual: {
                            hideFormTitle: true,
                        }
                    }}
                    onReady={handleReady}
                    onSubmit={handleSubmit}
                />
            }
            </div>
            <WaitingModal open={waitingModalOpen} setOpen={setWaitingModalOpen}/>
        </motion.div>
    );
}

export default PaymentPage;