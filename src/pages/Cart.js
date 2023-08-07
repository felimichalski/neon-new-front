// import { QuestionMarkCircle } from '@styled-icons/evaicons-solid'
import OrderSteps from '../components/OrderSteps'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem'

const Cart = () => {
    const navigate = useNavigate();

    const products = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.cartTotalAmount);

    const parsePrice = (price) => {
        const numStr = price.toString();
        const parsedPrice = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return parsedPrice;
    }

    return (
        <div className="bg-white">
            <OrderSteps pageStep={0} />
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Carrito</h1>
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16" onSubmit={(e) => e.preventDefault()}>
                    <section aria-labelledby="cart-heading" className="lg:col-span-7 py-5">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {products.map((product, index) => (
                                <li key={index} className="flex py-6 sm:py-10">
                                    <CartItem product={product} />
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Resumen del pedido
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">${parsePrice(totalAmount)}</dd>
                            </div>
                            {/* <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how shipping is calculated</span>
                                        <QuestionMarkCircle className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how tax is calculated</span>
                                        <QuestionMarkCircle className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                            </div> */}
                            <form className="pt-5" onClick={(e) => e.preventDefault()}>
                                <label htmlFor="discount-code-mobile" className="block text-sm font-medium text-gray-700">
                                    Código de descuento
                                </label>
                                <div className="mt-1 flex space-x-4">
                                    <input
                                        type="text"
                                        id="discount-code-mobile"
                                        name="discount-code-mobile"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none"
                                    >
                                        Aplicar
                                    </button>
                                </div>
                            </form>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Total</dt>
                                <dd className="text-base font-medium text-gray-900">${parsePrice(totalAmount)}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full rounded-md border border-transparent bg-blue-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none"
                                onClick={() => navigate('/checkout')}
                            >
                                Confirmar Compra
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default Cart;