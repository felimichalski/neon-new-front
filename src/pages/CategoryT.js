import { Fragment, useCallback, useEffect, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { Xmark, ChevronDown, Plus } from '@styled-icons/fa-solid'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Product from '../components/Product/new'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Category = () => {

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [filters, setFilters] = useState([]);
    const [products, setProducts] = useState([])
    const { type, category } = useParams();
    const types = useSelector((state) => state.category.types);

    const loadProducts = useCallback(async () => {
        let endpoint = '';
        if(category) {
            endpoint = `/filter/${type}/${category}`
        } else if(type) {
            endpoint = `/filter/${type}`
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/products${endpoint}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        });

        const data = await response.json()
        setProducts(data)
    }, [type, category])

    useEffect(() => {
        const getBreadcrumbs = async () => {
            if (!type) {
                setBreadcrumbs(["Todos los productos"])
            } else if (!category) {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/types/${type}`, {
                    mode: 'cors',
                });

                const { name } = await response.json()
                setBreadcrumbs([name]);
            } else {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/${category}`, {
                    mode: 'cors',
                });

                const { name, type } = await response.json()
                setBreadcrumbs([type.name, name]);
            }
        }
        getBreadcrumbs();
        loadProducts();
    }, [type, category, loadProducts]);

    useEffect(() => {
        if(types.length > 0) {
            const categories = types.find((type) => type.id === 1).categories
            const collections = types.find((type) => type.id === 2).categories
            setFilters([
                {
                    id: 'type',
                    name: 'Tipo',
                    options: types.map((type) => ({ value: type.id, label: type.name })),
                },
                {
                    id: 'category',
                    name: 'Categoría',
                    options: categories.map((category) => ({ value: category.id, label: category.name })),
                },
                {
                    id: 'collection',
                    name: 'Colección',
                    options: collections.map((collection) => ({ value: collection.id, label: collection.name })),
                }
            ])
        }
    }, [types])

    const resolveChecked = (section, option) => {
        if (section.id === 'type' && option.value === parseInt(type)) return true
        if (section.id === 'category' && option.value === parseInt(category)) return true
        if (section.id === 'collection' && option.value === parseInt(category)) return true
    }

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Close menu</span>
                                            <Xmark className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4">
                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.name} className="border-t border-gray-200 pb-4 pt-4">
                                                {({ open }) => (
                                                    <fieldset>
                                                        <legend className="w-full px-2">
                                                            <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                                                <span className="text-sm font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex h-7 items-center">
                                                                    <ChevronDown
                                                                        className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            </Disclosure.Button>
                                                        </legend>
                                                        <Disclosure.Panel className="px-4 pb-2 pt-4">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`${section.id}-${optionIdx}-mobile`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            checked={false}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                                                        />
                                                                        <label
                                                                            htmlFor={`${section.id}-${optionIdx}-mobile`}
                                                                            className="ml-3 text-sm text-gray-500 select-none"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </fieldset>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <div className="border-b border-gray-200">
                    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ol className="flex items-center space-x-4 py-4">
                            {breadcrumbs && breadcrumbs.map((breadcrumb, index) => (
                                <li key={index}>
                                    <div className="flex items-center">
                                        <a href={breadcrumb.href} className="mr-4 text-sm font-medium text-gray-900">
                                            {breadcrumb}
                                        </a>
                                        {(index !== breadcrumbs.length - 1) &&
                                            <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                                                <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                                            </svg>
                                        }
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>

                <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                    <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                        <aside>
                            <h2 className="sr-only">Filters</h2>

                            <button
                                type="button"
                                className="inline-flex items-center lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="text-sm font-medium text-gray-700">Filters</span>
                                <Plus className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            </button>

                            <div className="hidden lg:block">
                                <form className="space-y-10 divide-y divide-gray-200">
                                    {filters.map((section, sectionIdx) => (
                                        <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
                                            <fieldset>
                                                <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                                                <div className="space-y-3 pt-6">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                id={`${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                defaultValue={option.value}
                                                                type="checkbox"
                                                                checked={resolveChecked(section, option)}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                                            />
                                                            <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600 select-none">
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </fieldset>
                                        </div>
                                    ))}
                                </form>
                            </div>
                        </aside>

                        <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                            <h2 id="product-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                                {products.map((product, index) => (
                                    <Product product={product} key={index}/>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Category;