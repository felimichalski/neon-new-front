import { Anchor, Box, Container, createStyles, Divider, Group, Image, Tabs, Text, UnstyledButton } from '@mantine/core'
import { Link } from 'react-router-dom'

// import { SearchAlt } from '@styled-icons/boxicons-regular'
import { Person } from '@styled-icons/fluentui-system-regular'
import { Search } from '@styled-icons/fluentui-system-regular'
import { Cart } from '@styled-icons/fluentui-system-regular'
import { LineHorizontal3 } from '@styled-icons/fluentui-system-regular'

import logo from '../../assets/logo.png'
import removeAccents from '../../utils/removeAccents'

const useStyles = createStyles((theme, _params, getRef) => ({
    navbar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        borderBottom: '1px solid rgb(229 229 229 / 1)',
        position: 'fixed',
        top: 0,
        zIndex: 10000
    },

    offer: {
        backgroundColor: theme.black,
        padding: '4px 0',
        color: theme.white,
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
    },

    divider: {
        backgroundColor: 'rgb(229 229 229 / 1)'
    },

    tabs: {
        height: '100%',
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        }
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
        borderTop: '3px solid rgba(229 229 229 / 0) !important',
        borderBottom: '3px solid rgba(229 229 229 / 0) !important',
        margin: '1px 0',

        '&[data-active]': {
            color: 'black !important',
        },

        '&:hover': {
            backgroundColor: 'transparent',
            borderBottom: '3px solid black !important',
        },
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
            display: 'flex',
        },
        
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        }
    },
    
    sidebarButton: {
        display: 'none',
        
        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
        }
    }
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
    name: 'Personalizados',
    link: '/custom',
}, {
    name: 'Contactanos',
    link: '/contact',
}];

const Navbar = () => {
    const { classes } = useStyles()

    const items = tabs?.map((tab, key) => (
        <Box key={key}>
            <Link to={tab.link} className={classes.tabLink}>
                <Tabs.Tab value={removeAccents(tab.name.toLowerCase())} className={classes.tab}>
                    <Text style={{ display: 'flex', alignItems: 'center' }}>{tab.name}</Text>
                </Tabs.Tab>
            </Link>
        </Box>
    ));

    return (
        <Container fluid className={classes.navbar}>
            <Box className={classes.offer}>
                <Text align='center' className={classes.offerText}>¡15% de descuento llevando más de 5 productos!</Text>
            </Box>
            <Box className={classes.main}>
                <Group>
                    <Anchor component={Link} to="/" style={{ padding: '10px 0' }}>
                        <Image src={logo} height={40} />
                    </Anchor>
                    <Divider mx={20} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    <Tabs classNames={{
                        root: classes.tabs,
                        tabsList: classes.tabsList
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
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    <UnstyledButton className={classes.iconContainer}>
                        <Person size={20} />
                    </UnstyledButton>
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    <UnstyledButton className={classes.iconContainer}>
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
                    <UnstyledButton className={classes.iconContainer}>
                        <Person size={20} />
                    </UnstyledButton>
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    <UnstyledButton className={classes.iconContainer}>
                        <Cart size={20} />
                    </UnstyledButton>
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                    <UnstyledButton className={classes.iconContainer}>
                        <LineHorizontal3 size={20} />
                    </UnstyledButton>
                    <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                </Group>
                <Group className={classes.sidebarButton}>
                    <UnstyledButton className={classes.iconContainer}>
                        <LineHorizontal3 size={20} />
                    </UnstyledButton>
                </Group>
            </Box>
        </Container>
    )
}

export default Navbar