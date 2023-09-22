import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Popover, Transition } from '@headlessui/react'
import logo from '../../assets/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { Divider, Indicator, Menu, UnstyledButton } from '@mantine/core'

import { Bars, Xmark } from '@styled-icons/fa-solid'
import { Person, Cart, ArrowEnter, SignOut, Pen, Star } from '@styled-icons/fluentui-system-regular'
import { Admin } from "@styled-icons/remix-line/Admin"

import { useDispatch, useSelector } from 'react-redux'
import { ChevronDown } from '@styled-icons/entypo'
import { AuthModal } from '../AuthModal'
import { logOut } from '../../features/slices/authSlice'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const tabs = [{
    name: 'Inicio',
    link: '/'
}, {
    name: 'Categorías',
    link: '/categories'
}, {
    name: 'Diseñá el tuyo',
    link: '/custom',
}, {
    name: 'Nosotros',
    link: '/about',
}, {
    name: 'Neon Art',
    link: '/neonart'
}];

const callsToAction = [
    { name: 'Ver todo', href: '/categories' },
]


const Navbar = () => {
    const navigate = useNavigate()
    const cartTotalQuantity = useSelector((state) => state.cart.cartTotalQuantity);
    const [authModalOpened, setAuthModalOpened] = useState(false);
    const [categories, setCategories] = useState([])

    const auth = useSelector((state) => state.auth);
    const types = useSelector((state) => state.category.types)
    const logedUser = useSelector(state => state.auth.userInfo)

    useEffect(() => {
        if (types.length > 0) {
            const type = types.find((type) => type.name === 'Neones de diseño')
            setCategories(type.categories)
        }
    }, [types])

    const dispatch = useDispatch()

    const location = useLocation()
    const splittedPath = location.pathname.split('/');
    const currentPath = `/${splittedPath[1]}`;

    const logOutAndGoToHome = () => {
        dispatch(logOut());
        navigate('/')
    }

    const userButton = auth.userToken ?
        <Menu
            width={260}
            offset={0}
            position="bottom-end"
            transition='pop-top-right'
        >
            <Menu.Target>
                <button
                    type="button"
                    className="relative bg-transparent h-full hover:bg-gray-100 hover:-mx-1 hover:px-5 px-4"
                >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Cart button</span>
                    <Person className='h-6 w-6' />
                </button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    style={{
                        fontFamily: 'ITC Avant Garde Gothic',
                        fontSize: 16,
                        color: 'black'
                    }}
                    icon={<Person size={16} />}
                    disabled
                >
                    {auth.userInfo.firstName} {auth.userInfo.lastName}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    icon={<Star size={16} />}
                >
                    Productos favoritos
                </Menu.Item>
                <Menu.Item
                    icon={<Pen size={16} />}
                >
                    Editar perfil
                </Menu.Item>
                <Menu.Item
                    onClick={logOutAndGoToHome}
                    icon={<SignOut size={16} />}
                    style={{ color: 'red' }}
                >Cerrar sesión</Menu.Item>
            </Menu.Dropdown>
        </Menu>
        :
        <UnstyledButton className="relative bg-transparent h-full hover:bg-gray-100 hover:-mx-1 hover:px-5 px-4" onClick={() => setAuthModalOpened(true)}>
            <ArrowEnter className="h-6 w-6" />
        </UnstyledButton >

    return (
        <Disclosure as="nav" className="bg-white shadow sticky top-0 z-10 w-full">
            {({ open }) => (
                <>
                    <div className="text-xs w-full bg-black text-center text-white py-1 tracking-tight font-lexend uppercase prelg:text-sm">¡15% de descuento llevando más de 5 productos!</div>
                    <Popover className="relative isolate z-50 mx-auto px-2 prelg:px-6 lg:px-8">
                        <div className="relative flex h-16 justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center prelg:hidden">
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <Xmark className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center prelg:items-stretch prelg:justify-start">
                                <div className="flex flex-shrink-0 items-center" >
                                    <img
                                        className="h-8 w-auto cursor-pointer mr-6"
                                        src={logo}
                                        alt="Logo Neón Infinito"
                                        onClick={() => navigate('/')}
                                    />
                                    <Divider className="hidden prelg:block" px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                                </div>
                                <div className="hidden prelg:ml-6 prelg:flex prelg:space-x-8">
                                    {tabs.map((tab, index) => (
                                        <span
                                            className={classNames(
                                                currentPath === tab.link ? "border-black text-black" : "text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300 hover:text-gray-700",
                                                "cursor-pointer inline-flex items-center border-b-2 px-1 pt-1 text-presm font-bold font-proxima-nova uppercase"
                                            )}
                                            onClick={() => {
                                                tab.link !== '/categories' && navigate(tab.link)
                                            }}
                                            key={index}
                                        >
                                            {tab.link === '/categories' ?
                                                <Popover.Button className="font-proxima-nova uppercase focus:outline-none h-full">
                                                    {tab.name}
                                                    <ChevronDown className="h-5 w-5 ui-open:-rotate-180 transform transition duration-300" aria-hidden="true" />
                                                </Popover.Button>
                                                :
                                                tab.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 prelg:static prelg:inset-auto prelg:ml-6 prelg:pr-0">
                                {
                                    logedUser?.admin ?
                                        <>
                                            <Divider className="hidden prelg:block" px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                                            <button
                                                type="button"
                                                className="relative bg-transparent h-full hover:bg-gray-100 hover:-mx-1 hover:px-5 px-4"
                                                onClick={() => navigate('/admin')}
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Admin</span>
                                                <Admin className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </>
                                        :
                                        ""
                                }
                                <Divider className="hidden prelg:block" px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                                {/* Profile dropdown */}
                                {userButton}
                                <AuthModal opened={authModalOpened} setOpened={setAuthModalOpened} />
                                <Divider className="hidden prelg:block" px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                                <button
                                    type="button"
                                    className="relative bg-transparent h-full hover:bg-gray-100 hover:-mx-1 hover:px-5 px-4"
                                    onClick={() => navigate('/cart')}
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Cart button</span>
                                    <Indicator size={15} label={cartTotalQuantity.toString()} styles={{ indicator: { padding: '0' } }}>
                                        <Cart className="h-6 w-6" aria-hidden="true" />
                                    </Indicator>
                                </button>
                                <Divider className="hidden prelg:block" px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                                {/* <UnstyledButton onClick={() => navigate('/cart')} className={classes.iconContainer}> */}
                                {/* </UnstyledButton> */}
                            </div>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 -translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 -translate-y-1"
                        >
                            <Popover.Panel className="absolute inset-x-0 top-0 -z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5">
                                {({ close }) => (
                                    <>
                                        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-2 px-6 py-6 prelg:grid-cols-3 prelg:gap-x-3 prelg:gap-y-0 prelg:py-10 lg:grid-cols-4 lg:px-8 border-t">
                                            {categories && categories.map((category, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                                                >
                                                    <span
                                                        className="font-semibold text-gray-900 bg-gray-100 cursor-pointer hover:bg-gray-200 py-2 pl-2 w-full rounded"
                                                        onClick={() => {
                                                            navigate(`/categories/${category.type}/${category.id}`)
                                                            close()
                                                        }}>
                                                        {category.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="bg-gray-50">
                                            <div className="mx-auto">
                                                <div className="grid grid-cols-1 divide-y divide-gray-900/5">
                                                    {callsToAction.map((item) => (
                                                        <span
                                                            key={item.name}
                                                            onClick={() => {
                                                                navigate(item.href)
                                                                close()
                                                            }}
                                                            className="cursor-pointer flex items-center p-3 text-sm font-semibold leading-6 text-gray-900 bg-gray-200 hover:bg-gray-300 justify-center"
                                                        >
                                                            {item.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    <Transition
                        enter="transition duration-300 ease-out"
                        enterFrom="transform scale-y-0"
                        enterTo="transform scale-y-100"
                        leave="transition duration-300 ease-out"
                        leaveFrom="transform scale-y-100"
                        leaveTo="transform scale-y-0"
                    >

                        <Disclosure.Panel className="prelg:hidden top-0 absolute bg-white w-full">
                            <div className="space-y-1 pb-4 pt-2">
                                {tabs.map((tab, index) => (
                                    <Disclosure.Button
                                        className={classNames(
                                            tab.link === currentPath ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
                                            "block border-l-4 py-2 pl-3 pr-4 text-base font-medium w-full"
                                        )}
                                        onClick={() => navigate(tab.link)}
                                        key={index}
                                    >
                                        {tab.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure >
    )
}

export default Navbar;