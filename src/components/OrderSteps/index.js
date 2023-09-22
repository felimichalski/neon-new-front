import { ChevronRight } from '@styled-icons/evaicons-solid'
import { useNavigate } from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const steps = [
    { name: 'Carrito', path: '/cart' },
    { name: 'Información de compra', path: '/checkout' },
    { name: 'Confirmación' },
]

const OrderSteps = ({ pageStep, className }) => {
    const navigate = useNavigate()

    return (
        <header className={classNames("relative text-xs font-medium sm:text-sm text-gray-700 z-10", className)}>
            <div className="mx-auto max-w-7xl px-4 pt-8 px-6 lg:px-8">
                <div className="relative flex justify-end justify-center">
                    <nav aria-label="Progress" className="block">
                        <ol className="flex space-x-4">
                            {steps.map((step, stepIdx) => (
                                <li key={step.name} className={classNames(step.path && 'cursor-pointer', "flex items-center")} onClick={() => step.path && navigate(step.path)}>
                                    {pageStep === stepIdx ? (
                                        <span className="text-indigo-600">
                                            {step.name}
                                        </span>
                                    ) : (
                                        <span href={step.href}>{step.name}</span>
                                    )}

                                    {stepIdx !== steps.length - 1 ? (
                                        <ChevronRight className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" />
                                    ) : null}
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default OrderSteps