import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Switch } from '@mantine/core';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/slices/cartSlice'
import SizesTable from '../components/SizesTable';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const colors = [
    { name: 'Blanco', class: 'bg-white', selectedClass: 'ring-gray-200' },
    { name: 'Neutral', class: 'bg-neutral-400', selectedClass: 'ring-neutral-400' },
    { name: 'Rojo', class: 'bg-red-400', selectedClass: 'ring-red-400' },
    { name: 'Naranja', class: 'bg-orange-400', selectedClass: 'ring-orange-400' },
    { name: 'Amarillo', class: 'bg-yellow-400', selectedClass: 'ring-yellow-400' },
    { name: 'Verde', class: 'bg-green-400', selectedClass: 'ring-green-400' },
    { name: 'Azul', class: 'bg-blue-400', selectedClass: 'ring-blue-400' },
    { name: 'Negro', class: 'bg-black', selectedClass: 'ring-black' },
]

const ProductDetail = () => {
    const { id } = useParams()
    const [selectedColor, setSelectedColor] = useState()
    const [size, setSize] = useState('small')
    const [price, setPrice] = useState(0)

    const [product, setProduct] = useState(undefined)

    const dispatch = useDispatch();

    useEffect(() => {
        const loadProduct = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
            });

            const data = await response.json()
            setProduct(data)
            setPrice(data.price.small)
        }
        loadProduct();
    }, [id])


    const parseProductForCart = () => {
        const { id, title, description, images } = product
        return {
            id,
            title,
            description,
            unit_price: price,
            size,
            // color: checked,
            image: images[0].key
        }
    }

    const parsePrice = (price) => {
        const numStr = price.toString();
  
        const parsedPrice = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
        return parsedPrice; 
    }

    const handleSizeChange = (size) => {
        setSize(size)
        if (size === 'small') {
            setPrice(product.price.small)
        } else if (size === 'medium') {
            setPrice(product.price.medium)
        } else {
            setPrice(product.price.large)
        }
    }

    return (
        <>
            {product &&
                <div className="bg-white">
                    <div className="pt-6">
                        {/* Image gallery */}
                        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                            <div className="aspect-h-4 lg:aspect-h-4 sm:overflow-hidden sm:rounded-lg lg:col-span-2">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/mediafiles/${product.images[0].key}`}
                                    alt={product.images[0].alt}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                                <div className="aspect-h-2 overflow-hidden rounded-lg">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/mediafiles/${product.images[0].key}`}
                                        alt={product.images[0].alt}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="aspect-h-2 overflow-hidden rounded-lg">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/mediafiles/${product.images[0].key}`}
                                        alt={product.images[0].alt}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Product info */}
                        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-10">{product.title}</h1>
                                <div>
                                    <h3 className="sr-only">Description</h3>
                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{product.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <h2 className="sr-only">Product information</h2>

                                <form onSubmit={(e) => e.preventDefault()}>

                                    <p className="mb-5 text-2xl font-bold tracking-tight text-gray-900">${parsePrice(price)}</p>

                                    {/* Colors */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                            <div className="flex items-center space-x-3">
                                                {colors.map((color) => (
                                                    <RadioGroup.Option
                                                        key={color.name}
                                                        value={color}
                                                        className={({ checked }) =>
                                                            classNames(
                                                                color.selectedClass,
                                                                checked ? 'ring-2' : '',
                                                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                            )
                                                        }
                                                    >
                                                        <RadioGroup.Label as="span" className="sr-only">
                                                            {color.name}
                                                        </RadioGroup.Label>
                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                color.class,
                                                                'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                            )}
                                                        />
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="mt-10">
                                        <h3 className="text-sm font-medium text-gray-900 mb-5">Control</h3>
                                        <Switch onLabel="Si" offLabel="No" size='lg'/>
                                    </div>

                                    {/* Sizes */}
                                    <div className="mt-10">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900">Tamaño</h3>
                                        </div>

                                        <RadioGroup value={size} onChange={(size) => {
                                            handleSizeChange(size)
                                        }} className="mt-4">
                                            <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                            <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                <RadioGroup.Option
                                                    key={'small'}
                                                    value={'small'}
                                                    className={() =>
                                                        classNames(
                                                            'cursor-pointer bg-white text-gray-900 shadow-sm',
                                                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                        )
                                                    }
                                                >
                                                    {({ checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">S</RadioGroup.Label>
                                                            <span
                                                                className={classNames(
                                                                    checked || size === 'small' ? 'border-indigo-500 border-2' : 'border-transparent',
                                                                    'pointer-events-none absolute -inset-px rounded-md'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                                <RadioGroup.Option
                                                    key={'medium'}
                                                    value={'medium'}
                                                    className={() =>
                                                        classNames(
                                                            'cursor-pointer bg-white text-gray-900 shadow-sm',
                                                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                        )
                                                    }
                                                >
                                                    {({ checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">M</RadioGroup.Label>
                                                            <span
                                                                className={classNames(
                                                                    checked || size === 'medium' ? 'border-indigo-500 border-2' : 'border-transparent',
                                                                    'pointer-events-none absolute -inset-px rounded-md'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                                <RadioGroup.Option
                                                    key={'large'}
                                                    value={'large'}
                                                    className={() =>
                                                        classNames(
                                                            'cursor-pointer bg-white text-gray-900 shadow-sm',
                                                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                        )
                                                    }
                                                >
                                                    {({ checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">L</RadioGroup.Label>
                                                            <span
                                                                className={classNames(
                                                                    checked || size === 'large' ? 'border-indigo-500 border-2' : 'border-transparent',
                                                                    'pointer-events-none absolute -inset-px rounded-md'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <button
                                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-700 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={() => dispatch(addToCart(parseProductForCart()))}
                                    >
                                        Agregar al carrito
                                    </button>
                                </form>
                            </div>

                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                {/* Description and details */}
                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">Tabla de tamaños (Ancho x Alto)</h2>

                                    <div className="mt-4 space-y-6">
                                        <SizesTable product={product}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductDetail;