import { ChevronRight } from '@styled-icons/evaicons-solid'

const steps = [
    { name: 'Carrito' },
    { name: 'Información de compra' },
    { name: 'Confirmación' },
]

const OrderSteps = ({ pageStep }) => {
    return (
        <header className="relative bg-white text-sm font-medium text-gray-700">
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="relative flex justify-end sm:justify-center">
                    <nav aria-label="Progress" className="hidden sm:block">
                        <ol className="flex space-x-4">
                            {steps.map((step, stepIdx) => (
                                <li key={step.name} className="flex items-center">
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