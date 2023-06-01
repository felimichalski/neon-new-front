import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../features/slices/authSlice'

import { Anchor, Box, Container, createStyles, Divider, Group, Image, Menu, Tabs, Text, UnstyledButton } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'

import {Admin} from "@styled-icons/remix-line/Admin"
import { Person, Search, Cart, LineHorizontal3, ArrowEnter, SignOut, Pen, Star } from '@styled-icons/fluentui-system-regular'
import { ChevronDown } from '@styled-icons/entypo'

import logo from '../../assets/logo.png'
import removeAccents from '../../utils/removeAccents'
import { useRef, useState } from 'react'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect } from 'react'
import { AuthModal } from '../AuthModal'
import CategoryList from '../CategoryList'

const useStyles = createStyles((theme, { categoryListOpen, pointerEvents }) => ({
    navbar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        borderBottom: '1px solid rgb(229 229 229 / 1)',
        position: 'sticky',
        top: 0,
        zIndex: 10000,
        
    },

    offer: {
        backgroundColor: theme.black,
        padding: '4px 0',
        color: theme.white,
        zIndex: 10000,
    },

    offerText: {
        fontFamily: 'Lexend',
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: -1,
        textTransform: 'uppercase'
    },

    main: {
        backgroundColor: theme.white,
        padding: '0 45px',
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 10000
    },

    divider: {
        backgroundColor: 'rgb(229 229 229 / 1)'
    },

    tabs: {
        height: '100%',
        [`@media (max-width: 949px)`]: {
            display:"none"
          },
    },

    tabsList: {
        borderBottom: '0 !important',
        height: '100%'
    },

    tab: {
        fontFamily: 'Proxima Nova',
        fontWeight: '700',
        fontSize: '12px',
        border: 'none',
        color: theme.black,
        textTransform: 'uppercase',
        userSelect: 'none',
        backgroundColor: 'transparent',
        height: '100%',
        padding: '0 15px',
        borderRadius: 'none',
        borderTop: '3px solid transparent !important',
        borderBottom: '3px solid transparent !important',
        margin: '1px 0',

        '&[data-active]': {
            color: 'black !important',
        },

        '&:hover': {
            backgroundColor: 'transparent',
            borderBottom: '3px solid black !important',
        },
        [`@media (max-width: 1025px)`]: {
            fontSize:"10px"
          },
          [`@media (max-width: 967px)`]: {
            fontSize:"8px"
          },
          
    },

    tabNoBorder: {
        '&:hover': {
            borderBottom: '3px solid transparent !important',
        }
    },

    tabLabel: {
        display: 'flex',
    },

    tabLink: {
        pointerEvents: 'auto',
        textDecoration: 'none',
        display: 'flex',
        height: '100%'
    },

    iconContainer: {
        padding: `${theme.spacing.sm}px ${theme.spacing.sm * 2}px`,
        position: 'relative',
        height: '100%',
        transition: 'background-color .3s ease-out',

        '&:hover': {
            backgroundColor: 'rgb(229 229 229 / 1)',
            margin: '0 -1px',
            padding: `${theme.spacing.sm}px ${theme.spacing.sm * 2 + 1}px`
        },
    },

    collapsableMD: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        }
    },

    collapsableSM: {
        display: 'none',

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },

        [`@media (max-width: 600px)`]: {
            display:"none",
          },
    },

    sidebarButton: {
        display: 'none',

        [`@media (max-width: 949px)`]: {
            display:"flex",
          },
    },

    categoryList: {
        borderRadius: '0',
        border: 'none',
        marginTop: '-1px',
        minWidth: '100%',
        pointerEvents,
        padding: 0
    },

    categoryOverlay: {
        height: '100vh',
        width: '100%',
        position: 'absolute',
        backgroundColor: theme.black,
        opacity: categoryListOpen ? .7 : 0,
        pointerEvents: 'none',
        top: 0,
        left: 0,
        zIndex: -1,
        transition: 'all .2s ease-in-out',
    },

    categoryChevron: {
        transform: categoryListOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
        transition: 'all .2s ease'
    },
    
}))

const tabs = [{
    name: 'Inicio',
    link: '/'
}, {
    name: 'Galería',
    link: '/galery'
}, {
    name: 'Categorías',
}, {
    name: 'Contactanos',
    link: '/contact',
}, {
    name: 'Sobre nosotros',
    link: '/About',
}];

const Navbar = ({openMenu, setOpenMenu}) => {
    const [categoryListOpen, setCategoryListOpen] = useState(false)
    const [pointerEvents, setPointerEvents] = useState('auto')
    const [loggedIn, setLoggedIn] = useState(undefined)
    const [authModalOpened, setAuthModalOpened] = useState(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [categories, setCategories] = useState({
        type1: [],
        type2: [],
        type3: [],
    });
    


    const navigate = useNavigate()
    const autoplay = useRef(Autoplay({ delay: 7000 }));
    const { classes, cx } = useStyles({ categoryListOpen, pointerEvents })

    const data = useSelector((state) => state.auth);
    const logedUser = useSelector(state=> state.auth.userInfo)
    const dispatch = useDispatch()


    const fetchCategories = async (type, columns) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/type/${type}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            const categoriesPerGroup = Math.ceil(data.length / columns);
            const groupedCategories = [];

            for (let i = 0; i < columns; i++) {
                const startIndex = i * categoriesPerGroup;
                const endIndex = (i + 1) * categoriesPerGroup;
                groupedCategories.push(data.slice(startIndex, endIndex));
            }

            setCategories((prevState) => ({
                ...prevState,
                [`type${type}`]: groupedCategories,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(data.userToken) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [data])

    useEffect(() => {
        fetchCategories(1, 3);
        fetchCategories(2, 1);
        fetchCategories(3, 2);
    }, []);

    const logOutAndGoToHome = () => {
        dispatch(logOut());
        navigate('/')
    }

    const userButton = loggedIn ?
        <Menu
        width={260}
        offset={0}
        position="bottom-end"
        transition='pop-top-right'
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
        >
            <Menu.Target>
                <UnstyledButton className={cx(classes.iconContainer, { [classes.userActive]: userMenuOpened })}>
                    <Person size={20} />
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    style={{
                        fontFamily: 'ITC Avant Garde Gothic',
                        fontSize: 16,
                        color: 'black'
                    }}
                    icon={<Person size={16}/>}
                    disabled
                >
                    {data.userInfo.firstName} {data.userInfo.lastName}
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
        <UnstyledButton className={classes.iconContainer} onClick={() => setAuthModalOpened(true)}>
            <ArrowEnter size={20}/>
        </UnstyledButton >
    
    const items = tabs?.map((tab, key) => (
        <Box key={key}>
            {tab.name === 'Categorías' ?
                <Menu
                    trigger='hover'
                    offset={0}
                    classNames={classes.category}
                    onOpen={() => setCategoryListOpen(true)}
                    onClose={() => {
                        setPointerEvents('none')
                        setTimeout(() => {
                            setPointerEvents('auto')
                        }, 200)
                        setCategoryListOpen(false)
                    }}
                    transition='scale-y'
                    transitionDuration={200}
                >
                    
                    <Menu.Target>
                        <Tabs.Tab value={removeAccents(tab.name.toLowerCase())} className={[classes.tab, classes.tabNoBorder]}>
                            <Text style={{ display: 'flex', alignItems: 'center' }}>{tab.name}</Text><ChevronDown size={16} className={classes.categoryChevron} />
                        </Tabs.Tab>
                    </Menu.Target>
                    
                    <Menu.Dropdown className={classes.categoryList}>
                        <CategoryList categories={categories}/>
                    </Menu.Dropdown>
                    
                </Menu>
                :
                <Link to={tab.link} className={classes.tabLink}>
                    <Tabs.Tab value={removeAccents(tab.name.toLowerCase())} className={classes.tab}>
                        <Text>{tab.name}</Text>
                    </Tabs.Tab>
                </Link>
            }
        </Box>
    ));

    return (
        <Container fluid className={classes.navbar}>
            {/* <Carousel
                className={classes.offer}
                loop
                withControls={false}
                withIndicators={false}
                plugins={[autoplay.current]}
            >
                <Carousel.Slide>
                    <Text align='center' className={classes.offerText}>¡15% de descuento llevando más de 5 productos!</Text>
                </Carousel.Slide>
                <Carousel.Slide>
                    <Text align='center' className={classes.offerText}>¡15% de descuento llevando más de 5 productos!</Text>
                </Carousel.Slide>
                <Carousel.Slide>
                    <Text align='center' className={classes.offerText}>¡15% de descuento llevando más de 5 productos!</Text>
                </Carousel.Slide>
            </Carousel> */}
            <Box className={classes.main}>
                <Group>
                    <Anchor component={Link} to="/" style={{ padding: '10px 0' }}>
                        <Image src={logo} height={40} />
                    </Anchor>
                    <Divider mx={20} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    <Tabs classNames={{
                        root: classes.tabs,
                        tabsList: classes.tabsList,
                        tabLabel: classes.tabLabel
                    }}
                        onTabChange={null}
                    >
                        <Tabs.List>{items}</Tabs.List>
                    </Tabs>
                </Group>
                <Group style={{ gap: 0 }} className={classes.collapsableMD}>
                    
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    <UnstyledButton className={classes.iconContainer}>
                        <Search size={20} />
                    </UnstyledButton>

                    {logedUser?.admin?
                    <Divider sx={{marginRight:"-1.5rem"}} px={10} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />:""
                    }
                    {
                    logedUser?.admin?
                <UnstyledButton onClick={() => navigate('/admin')} className={classes.iconContainer}>
                    <Admin size={20} />
                </UnstyledButton>
                :
                ""    
                }

                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    {userButton}
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    <UnstyledButton onClick={() => navigate('/cart')} className={classes.iconContainer}>
                        <Cart size={20} />
                    </UnstyledButton>
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                </Group>
                <Group style={{ gap: 0 }} className={classes.collapsableSM}>
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    <UnstyledButton className={classes.iconContainer}>
                        <Search size={20} />
                    </UnstyledButton>
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    {userButton}
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    <UnstyledButton onClick={() => navigate('/cart')} className={classes.iconContainer}>
                        <Cart size={20} />
                    </UnstyledButton>
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    <UnstyledButton className={classes.iconContainer}>
                        <LineHorizontal3 size={20} />
                    </UnstyledButton>
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                </Group>
                <Group className={classes.sidebarButton}>
                    <UnstyledButton onClick={()=>{openMenu?setOpenMenu(false):setOpenMenu(true)}}>
                     <LineHorizontal3 size={20} />
                    </UnstyledButton>
                </Group>
            </Box>
            <div className={classes.categoryOverlay} />
            <AuthModal opened={authModalOpened} setOpened={setAuthModalOpened}/>
        </Container>
    )
}

export default Navbar