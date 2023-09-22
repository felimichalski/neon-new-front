import { useEffect, useState, Fragment } from 'react'
import { RadioGroup, Tab } from '@headlessui/react'
// import { Disclosure } from '@headlessui/react'
// import { Heart } from '@styled-icons/evil'
// import { Minus, Plus } from '@styled-icons/evaicons-solid'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/slices/cartSlice'
import { Switch } from '@headlessui/react'
import SizesModal from '../components/SizesModal'

import { QuestionCircleFill, CheckCircleFill } from '@styled-icons/bootstrap'


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

const controls = [
  { key: 'Slim', info: ['Regulador de intensidad de luz', '5 efectos de intermitencia', 'Regulador de velocidad de los efectos'], price: 5300 },
  { key: 'Control remoto', info: ['Regulador de intensidad de luz', '8 efectos de intermitencia', 'Regulador de velocidad de los efectos', 'Encendido/Apagado'], price: 7900 },
  { key: 'App', info: ['Control mediante tu celular', 'Regulador de intensidad', 'Programar horario de encendido y apagado', 'Función audioritmica', 'Compatible con Alexa y Google Home'], price: 14300 }
]

const ProductDetail = () => {
  const [product, setProduct] = useState(undefined)
  const [withControl, setWithControl] = useState(false)
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedControl, setSelectedControl] = useState(controls[0])
  const [sizesModalOpen, setSizesModalOpen] = useState(false)
  const { id } = useParams()
  const [size, setSize] = useState('small')
  const [price, setPrice] = useState(0)

  const dispatch = useDispatch();

  const parseProductForCart = () => {
    const { id, title, description, images } = product
    let sizeName;
    switch (size) {
      case 'small':
        sizeName = 'Pequeño'
        break;
      case 'medium':
        sizeName = 'Mediano'
        break;
      case 'large':
        sizeName = 'Grande'
        break;
      default:
        break;
    }
    return {
      id,
      title,
      description,
      unit_price: (withControl) ? price + selectedControl.price : price,
      size: sizeName,
      control: (withControl) ? resolveControl(selectedControl.key) : 'Sin control',
      color: product.color ? selectedColor.name : "Color único",
      image: images[0].key
    }
  }

  const resolveControl = (name) => {
    switch(name) {
      case 'Slim':
        return 'Control Slim'
      case 'Control remoto':
       return 'Control remoto'        
      case 'App':
        return 'Control por app'
      default:
        return
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

  return (
    <>
      {product &&
        <div className="mx-auto max-w-2xl px-4 md:py-10 sm:px-6 py-16 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product.images.map((image, index) => (
                    <Tab
                      key={image.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none"
                      onClick={() => setSelectedImage(index)}
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.name}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img src={`${process.env.REACT_APP_API_URL}/mediafiles/${product.images[index].key}`} alt="" className="h-full w-full object-cover object-center" />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-indigo-500' : 'ring-transparent',
                              'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {product.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/mediafiles/${product.images[selectedImage].key}`}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <div className="flex justify-between">
                <h1 className="text-2xl font-medium text-gray-900">{product.title}</h1>
                <p className="text-2xl font-medium text-gray-900">${parsePrice((withControl) ? price + selectedControl.price : price)}</p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Tamaño</h3>
                  <button className="text-sm font-bold text-indigo-600" onClick={() => setSizesModalOpen(true)}>Ver tabla de tamaños</button>
                  <SizesModal product={product} open={sizesModalOpen} setOpen={setSizesModalOpen} />
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
                              checked || size === 'small' ? 'border-green-500 border-2' : 'border-transparent',
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
                              checked || size === 'medium' ? 'border-green-500 border-2' : 'border-transparent',
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
                              checked || size === 'large' ? 'border-green-500 border-2' : 'border-transparent',
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

              <div className="mt-10">
                <dt className="flex text-sm text-gray-600">
                  <h3 className="text-sm font-medium text-gray-900 mb-5">Control</h3>
                  <span className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500 cursor-pointer" onClick={() => setSizesModalOpen(true)}>
                    <QuestionCircleFill className="h-5 w-5" aria-hidden="true" />
                  </span>
                </dt>
                <Switch
                  checked={withControl}
                  onChange={setWithControl}
                  className={classNames(
                    withControl ? 'bg-green-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className={classNames(
                      withControl ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  >
                    <span
                      className={classNames(
                        withControl ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={classNames(
                        withControl ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                  </span>
                </Switch>
                {withControl &&
                  <ul className="grid grid-cols-1 gap-x-3 gap-y-8 lg:grid-cols-3 mt-6">
                    {controls.map((control, index) => (
                      <li key={index} className="cursor-pointer overflow-hidden rounded-xl border border-gray-200" onClick={() => setSelectedControl(control)}>
                        <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                          <div className="text-sm font-medium leading-6 text-gray-900">{control.key}</div>
                          {control === selectedControl ? <CheckCircleFill className="h-5 w-5 text-green-600" aria-hidden="true" /> : null}
                        </div>
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 flex flex-col justify-between">
                          {control.info.map((info, index) => (
                            <div className="flex justify-between gap-x-4 py-3" key={index}>
                              <dt className="text-gray-700 text-xs">{info}</dt>
                            </div>
                          ))}
                          <div className="flex justify-between gap-x-4 py-3">
                            <dt className="text-gray-500">Precio</dt>
                            <dd className="flex items-start gap-x-2">
                              <div className="font-medium text-gray-900">
                                ${parsePrice(control.price)}
                              </div>
                            </dd>
                          </div>
                        </dl>
                      </li>
                    ))}
                  </ul>
                  // <RadioGroup value={control} onChange={setControl} className="mt-4">
                  //   <RadioGroup.Label className="sr-only">Choose a control</RadioGroup.Label>
                  //   <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  //     {controls.map((control, index) => (
                  //       <RadioGroup.Option
                  //         key={control.key}
                  //         value={control.key}
                  //         className={() =>
                  //           classNames(
                  //             'cursor-pointer bg-white text-gray-900 shadow-sm',
                  //             'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                  //           )
                  //         }
                  //       >
                  //         {({ checked }) => (
                  //           <>
                  //             <RadioGroup.Label as="span" className="text-center">{control.key}</RadioGroup.Label>
                  //             <span
                  //               className={classNames(
                  //                 checked || size === 'small' ? 'border-indigo-500 border-2' : 'border-transparent',
                  //                 'pointer-events-none absolute -inset-px rounded-md'
                  //               )}
                  //               aria-hidden="true"
                  //             />
                  //           </>
                  //         )}
                  //       </RadioGroup.Option>
                  //     ))}
                  //   </div>
                  // </RadioGroup>
                }
              </div>


              <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
                {product.color && 
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
                }


                <div className="mt-10 flex">
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-blue-500 px-8 py-3 text-base font-medium text-white hover:bg-blue-600 focus:outline-none sm:w-full"
                    onClick={() => dispatch(addToCart(parseProductForCart()))}
                  >
                    Agregar al carrito
                  </button>
                  {/* <button
                      type="button"
                      className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                      <Heart className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                      <span className="sr-only">Add to favorites</span>
                    </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default ProductDetail;