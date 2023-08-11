import { Fragment, useEffect, useState } from 'react'
import { Popover, RadioGroup, Transition } from '@headlessui/react'
import { ChevronUp } from '@styled-icons/boxicons-regular'
import { motion } from 'framer-motion';
import OrderSteps from '../components/OrderSteps'
import { useSelector } from 'react-redux';
import { CheckCircleFill } from '@styled-icons/bootstrap'
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';

const deliveryMethods = [
    { id: 1, title: 'Retiro por sucursal', turnaround: '2–4 días hábiles', price: 'GRATIS' },
    { id: 2, title: 'Entrega', turnaround: '5-10 días hábiles', price: 'CALCULAR' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const parsePrice = (price, discount) => {
    let discountValue = discount?.value ?? 0
    const numStr = (price - discountValue).toString();
    const parsedPrice = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parsedPrice;
}

const Checkout = ({ paymentInfo, setPaymentInfo }) => {
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])
    const [initialization, setInitialization] = useState(undefined)
    const products = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.cartTotalAmount);
    const discount = useSelector((state) => state.cart.discount);

    const navigate = useNavigate()

    const { firstName, lastName, email, address, phone } = paymentInfo;

    const form = useForm({
        initialValues: {
            firstName,
            lastName,
            email,
            address,
            phone,
            deliveryMethod: deliveryMethods[0].title
        },
        validate: {
            firstName: (val) => val.length > 0 ? null : 'Campo requerido',
            lastName: (val) => val.length > 0 ? null : 'Campo requerido',
            email: (val) => (val.length > 0 ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) ? null : 'Mail inválido' : 'Campo requerido'),
            address: (val) => val.length > 0 ? null : 'Campo requerido',
            phone: (val) => val.length > 0 ? null : 'Campo requerido',
        },
    });

    const handleSubmit = (values) => {
        setPaymentInfo(values)
    }

    useEffect(() => {
        const fetchPaymentInfo = async () => {
            await initMercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY, { locale: 'es-AR' });
            const response = await fetch(`${process.env.REACT_APP_API_URL}/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: products
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
        fetchPaymentInfo()
    }, [navigate, products])

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
            }}>
            <div className="bg-white">
                <OrderSteps pageStep={1} className="pb-5 lg:mb-0 bg-gray-100 lg:bg-transparent" />
                {/* Background color split screen for large screens */}
                <div className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
                <div className="fixed right-0 top-0 hidden h-full w-1/2 bg-gray-100 lg:block" aria-hidden="true" />

                <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
                    <h1 className="sr-only">Order information</h1>

                    <section
                        aria-labelledby="summary-heading"
                        className="bg-gray-100 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:bg-gray-100 lg:row-start-1 lg:px-0 lg:pb-16"
                    >
                        <div className="mx-auto max-w-lg lg:max-w-none">
                            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                Resumen del pedido
                            </h2>

                            <ul className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
                                {products.map((product, index) => (
                                    <li key={index} className="flex items-start space-x-4 py-6">
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/mediafiles/${product.image}`}
                                            alt={`${product.title}`}
                                            className="h-20 w-20 flex-none rounded-md object-cover object-center"
                                        />
                                        <div className="flex-auto space-y-1">
                                            <h3>{product.title}</h3>
                                            <p className="text-gray-500">{product.color} - {product.withControl ? 'Con control' : 'Sin control'}</p>
                                            <p className="text-gray-500">{product.size}</p>
                                        </div>
                                        <p className="flex-none text-base font-medium">{product.price}</p>
                                    </li>
                                ))}
                            </ul>

                            <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">Subtotal</dt>
                                    <dd>${parsePrice(totalAmount)}</dd>
                                </div>

                                {discount &&
                                    <div className="flex items-center justify-between">
                                        <dt className="text-gray-600">Descuento
                                            <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                                                {discount.code}
                                            </span>
                                        </dt>
                                        <dd>-${parsePrice(discount.value)}</dd>
                                    </div>
                                }

                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">Envío</dt>
                                    <dd>$100</dd>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                    <dt className="text-base">Total</dt>
                                    <dd className="text-base">$361.80</dd>
                                </div>
                            </dl>

                            <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
                                <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                                    <div className="mx-auto max-w-lg">
                                        <Popover.Button className="flex w-full items-center py-6 font-medium">
                                            <span className="mr-auto text-base">Total</span>
                                            <span className="mr-2 text-base">$361.80</span>
                                            <ChevronUp className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>

                                <Transition.Root as={Fragment}>
                                    <div>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="transition-opacity ease-linear duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition-opacity ease-linear duration-300"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                                        </Transition.Child>

                                        <Transition.Child
                                            as={Fragment}
                                            enter="transition ease-in-out duration-300 transform"
                                            enterFrom="translate-y-full"
                                            enterTo="translate-y-0"
                                            leave="transition ease-in-out duration-300 transform"
                                            leaveFrom="translate-y-0"
                                            leaveTo="translate-y-full"
                                        >
                                            <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                                                <dl className="mx-auto max-w-lg space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <dt className="text-gray-600">Subtotal</dt>
                                                        <dd>$320.00</dd>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <dt className="text-gray-600">Shipping</dt>
                                                        <dd>$15.00</dd>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <dt className="text-gray-600">Taxes</dt>
                                                        <dd>$26.80</dd>
                                                    </div>
                                                </dl>
                                            </Popover.Panel>
                                        </Transition.Child>
                                    </div>
                                </Transition.Root>
                            </Popover>
                        </div>
                    </section>

                    <form className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16" onSubmit={form.onSubmit(handleSubmit)}>
                        <div className="mx-auto max-w-lg lg:max-w-none">
                            <section aria-labelledby="contact-info-heading">
                            </section>

                            <section aria-labelledby="shipping-heading" className="mt-10">
                                <h2 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                                    Información de compra
                                </h2>

                                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-4">
                                    <div className='sm:col-span-2'>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                            Nombre
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className={classNames(
                                                    form.errors.firstName ? "border-red-500" : "border-gray-300",
                                                    "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                )}
                                                onChange={(e) => form.setFieldValue("firstName", e.currentTarget.value)}
                                                {...form.getInputProps("firstName")}
                                            />
                                        </div>
                                        {form.errors.firstName &&
                                            <span
                                                style={{
                                                    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
                                                    webkitTapHighlightColor: 'transparent',
                                                    fontSize: '14px',
                                                    lineHeight: '1.55',
                                                    textDecoration: 'none',
                                                    marginTop: '5px',
                                                    wordBreak: 'break-word',
                                                    color: '#fa5252'
                                                }}
                                            >
                                                {form.errors.firstName}
                                            </span>
                                        }
                                    </div>

                                    <div className='sm:col-span-2'>
                                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                            Apellido
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="region"
                                                name="region"
                                                autoComplete="address-level1"
                                                className={classNames(
                                                    form.errors.lastName ? "border-red-500" : "border-gray-300",
                                                    "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                )}
                                                onChange={(e) => form.setFieldValue("lastName", e.currentTarget.value)}
                                                {...form.getInputProps("lastName")}
                                            />
                                        </div>
                                        {form.errors.lastName &&
                                            <span
                                                style={{
                                                    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
                                                    webkitTapHighlightColor: 'transparent',
                                                    fontSize: '14px',
                                                    lineHeight: '1.55',
                                                    textDecoration: 'none',
                                                    marginTop: '5px',
                                                    wordBreak: 'break-word',
                                                    color: '#fa5252'
                                                }}
                                            >
                                                {form.errors.lastName}
                                            </span>
                                        }
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                            Correo electrónico
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="email-address"
                                                name="email-address"
                                                autoComplete="email"
                                                className={classNames(
                                                    form.errors.email ? "border-red-500" : "border-gray-300",
                                                    "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                )}
                                                onChange={(e) => form.setFieldValue("email", e.currentTarget.value)}
                                                {...form.getInputProps("email")}
                                            />
                                        </div>
                                        {form.errors.email &&
                                            <span
                                                style={{
                                                    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
                                                    webkitTapHighlightColor: 'transparent',
                                                    fontSize: '14px',
                                                    lineHeight: '1.55',
                                                    textDecoration: 'none',
                                                    marginTop: '5px',
                                                    wordBreak: 'break-word',
                                                    color: '#fa5252'
                                                }}
                                            >
                                                {form.errors.email}
                                            </span>
                                        }
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                            Teléfono
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                className={classNames(
                                                    form.errors.phone ? "border-red-500" : "border-gray-300",
                                                    "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                )}
                                                onChange={(e) => form.setFieldValue("phone", e.currentTarget.value)}
                                                {...form.getInputProps("phone")}
                                            />
                                        </div>
                                        {form.errors.phone &&
                                            <span
                                                style={{
                                                    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
                                                    webkitTapHighlightColor: 'transparent',
                                                    fontSize: '14px',
                                                    lineHeight: '1.55',
                                                    textDecoration: 'none',
                                                    marginTop: '5px',
                                                    wordBreak: 'break-word',
                                                    color: '#fa5252'
                                                }}
                                            >
                                                {form.errors.phone}
                                            </span>
                                        }
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Dirección
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                autoComplete="street-address"
                                                className={classNames(
                                                    form.errors.address ? "border-red-500" : "border-gray-300",
                                                    "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                )}
                                                onChange={(e) => {
                                                    if (e.currentTarget.value === '') setSelectedDeliveryMethod(deliveryMethods[0])
                                                    form.setFieldValue("address", e.currentTarget.value)
                                                }}
                                                {...form.getInputProps("address")}
                                            />
                                        </div>
                                        {form.errors.address &&
                                            <span
                                                style={{
                                                    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
                                                    webkitTapHighlightColor: 'transparent',
                                                    fontSize: '14px',
                                                    lineHeight: '1.55',
                                                    textDecoration: 'none',
                                                    marginTop: '5px',
                                                    wordBreak: 'break-word',
                                                    color: '#fa5252'
                                                }}
                                            >
                                                {form.errors.address}
                                            </span>
                                        }
                                    </div>
                                    <div className="sm:col-span-4">
                                        <RadioGroup value={selectedDeliveryMethod} onChange={(method) => {
                                            setSelectedDeliveryMethod(method)
                                            form.setFieldValue("deliveryMethod", method.title)
                                        }}
                                        >
                                            <RadioGroup.Label className="text-lg font-medium text-gray-900">Envío</RadioGroup.Label>

                                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                                {deliveryMethods.map((deliveryMethod) => (
                                                    <RadioGroup.Option
                                                        key={deliveryMethod.id}
                                                        value={deliveryMethod}
                                                        className={({ checked }) =>
                                                            classNames(
                                                                checked ? 'ring-2 ring-indigo-500' : 'border-gray-300',
                                                                deliveryMethod.title === 'Entrega' && form.values.address === '' ? 'opacity-40' : 'cursor-pointer',
                                                                'relative flex rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                                                            )
                                                        }
                                                        disabled={deliveryMethod.title === 'Entrega' && form.values.address === '' && true}
                                                    >
                                                        {({ checked }) => (

                                                            <>
                                                                <span className="flex flex-1">
                                                                    <span className="flex flex-col">
                                                                        <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                                                            {deliveryMethod.title}
                                                                        </RadioGroup.Label>
                                                                        <RadioGroup.Description
                                                                            as="span"
                                                                            className="mt-1 flex items-center text-sm text-gray-500"
                                                                        >
                                                                            {deliveryMethod.turnaround}
                                                                        </RadioGroup.Description>
                                                                        <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                                                                            {deliveryMethod.price}
                                                                        </RadioGroup.Description>
                                                                    </span>
                                                                </span>
                                                                {checked ? <CheckCircleFill className="h-5 w-5 text-indigo-600" aria-hidden="true" /> : null}
                                                                <span
                                                                    className={classNames(
                                                                        'pointer-events-none absolute -inset-px rounded-lg'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            </>
                                                        )}
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </section>

                            <div className="mt-10 sm:flex sm:items-center sm:justify-center">
                                {initialization &&
                                    <Wallet
                                        initialization={initialization}
                                    />
                                }
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </motion.div>

    )
}

export default Checkout;