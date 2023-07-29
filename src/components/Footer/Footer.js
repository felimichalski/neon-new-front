import { Box, createStyles, Divider, Grid, Image, List, Text, Title, ThemeIcon, TextInput, Button } from "@mantine/core"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { Phone, GeoAlt, Envelope, ChevronRight } from '@styled-icons/bootstrap'

import logo from '../../assets/logo.png'

import Icon from './Icon'

const useStyles = createStyles((theme) => ({
    column: {
        display: 'flex',
        justifyContent: 'flex-start',
        [`@media (maxWidth: 600px)`]: {
            display:"none",
          },
    },
    column2:{
        display: 'flex',
    },

    footerTitle: {
        color: theme.white,
        textTransform: 'uppercase',
        fontFamily: 'Lexend',
        marginBottom: '1rem',
        textAlign: 'center'
    },

    tabLink: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontFamily: 'Proxima Nova',
        fontWeight: 400,
        color: theme.colors.gray[7],

        '&:hover': {
            color: theme.colors.gray[6]
        }
    },
    /* list:{
        display:"none"
    }, */
    newsletterInput: {
        fontSize: '16px'
    },

    newsletterButton: {
        padding: 0,
        borderTopRightRadius: '3px',
        borderBottomRightRadius: '3px',
        height: '100%',
        backgroundColor: theme.white,
        color: theme.black,

        '&:hover': {
            backgroundColor: theme.colors.gray[4],
        }
    },

    newsletterText: {
        color: theme.colors.gray[7],
        fontFamily: 'Proxima Nova'
    },

    infoItem: {
        fontFamily: 'Proxima Nova',
        color: theme.colors.gray[7],
        [`@media (maxWidth: 600px)`]: {fontSize:"0.7rem", margin:"0.5rem"}
    },

    copyright: {
        textAlign: 'center',
        width: '100%',
    },

    copyrightText: {
        color: theme.white,
        fontFamily: 'Gotham',
        fontWeight: 700,
        fontSize: 14,
    }, 
    responsiveItem:{
        transform:"scale(0.5)"
    }
}))

function Footer() {

    const tabs = [{
        name: 'Galería',
        link: '/galery'
      },{
        name: 'Categorías',
        link: '/categories'
      }, {
        name: 'Personalizados',
        link: '/custom',
      }, {
        name: 'Contactanos',
        link: '/contact',
      }];

    const { classes } = useStyles();

    const [icons, setIcons] = useState([])
    const data = useSelector(state => state.social);

    useEffect(() => {
        if(data.status === 'success') {
            setIcons(data.items)
        }
    }, [data])

    return (
        <footer style={{backgroundColor: 'black', [`@media (maxWidth: 600px)`]: {display:"flex", alignItems:"center", justifyContent:"center"}}}>
            <Grid m={5} sx={{padding:"1rem 0 0 1rem", }}>
                <Grid.Col span={2} px={40} className={classes.column}>
                    <Image src={logo} style={{margin: 'auto 0', marginRight:"1rem"}}/>
                    <Divider orientation="vertical" ml={20}/>
                </Grid.Col>
                {/* <Grid.Col span={3} className={classes.column} style={{flexDirection: 'column'}}>
                    <Title className={classes.footerTitle}>
                        Newsletter
                    </Title>
                    <TextInput
                    placeholder="Tu mail"
                    rightSection={<Button className={classes.newsletterButton} radius="none"><ChevronRight color="black" size={16}/></Button>}
                    className={classes.newsletterInput}
                    radius='3px'
                    rightSectionWidth='auto'
                    size="xs"
                    />
                    <Text className={classes.newsletterText}>Suscribite a nuestro newsletter para no perderte ninguna oferta</Text>
                </Grid.Col> */}
                <Grid.Col span={6} className={classes.column} style={{flexDirection: 'column', display:"flex", justifyContent:"center",alignItems:"center", [`@media (maxWidth: 600px)`]: {display:"none"}}}>
                    {/* <Title className={classes.footerTitle}>
                        Links
                    </Title> */}
                    <List listStyleType='none' mx='auto' className={classes.list} sx={{display:"flex",flexDirection:"row", alignItems:"center", justifyContent:"space-between",[`@media (maxWidth: 600px)`]: {display:"none"}}}>
                        {tabs.map((tab, key) => (
                            <List.Item key={key} sx={{margin:"0 1rem", fontSize:"1.1rem"}}>
                                <Link className={classes.tabLink} to={tab.link} >{tab.name}</Link>
                            </List.Item>
                        ))}
                    </List>
                </Grid.Col>
                <Divider orientation="vertical" ml={20} sx={{[`@media (maxWidth: 600px)`]: {display:"none",},}}/>
                <Grid.Col span={3} className={classes.column} style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    
                    <List listStyleType='none' center spacing='sm'>
                        <List.Item icon={
                        <ThemeIcon color="green" size={24} radius="xl">
                            <Phone size={16} />
                        </ThemeIcon>
                        } className={classes.infoItem}>
                            +54 11 2345-6789
                        </List.Item>
                        <List.Item icon={
                        <ThemeIcon color="blue" size={24} radius="xl">
                            <GeoAlt size={16} />
                        </ThemeIcon>
                        } className={classes.infoItem}>
                            Buenos Aires, Argentina
                        </List.Item>
                        <List.Item icon={
                        <ThemeIcon color="red" size={24} radius="xl">
                            <Envelope size={16} />
                        </ThemeIcon>
                        } className={classes.infoItem}>
                            text@text.com
                        </List.Item>
                    </List>
                </Grid.Col>
            </Grid>

            {/* RESPONSIVE */}
            <Box sx={{display:"none",[`@media (maxWidth: 600px)`]: {display:"flex", flexDirection:"row",alignItems: 'center',justifyContent:"center", width:"100%", padding:"0 1rem"} }}>
                    <List listStyleType='none' center spacing='sm' sx={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                        <List.Item icon={
                        <ThemeIcon color="green" size={18} radius="xl">
                            <Phone size={10} />
                        </ThemeIcon>
                        } className={classes.infoItem}>
                            +54 11 2345-6789
                        </List.Item>
                        <List.Item icon={
                        <ThemeIcon color="blue" size={18} radius="xl">
                            <GeoAlt size={10} />
                        </ThemeIcon>
                        } className={classes.infoItem}>
                            Buenos Aires, Argentina
                        </List.Item>
                        <List.Item icon={
                        <ThemeIcon color="red" size={18} radius="xl">
                            <Envelope size={10} />
                        </ThemeIcon>
                        } className={classes.infoItem}>
                            text@text.com
                        </List.Item>
                    </List>
            </Box>
            <Divider
            mx={20}
            my={30}
            labelPosition='center'
            label={
                <>
                    {icons?.length > 0 &&
                        icons.map((icon, key) => (
                            <Icon data={icon} key={key}/>
                        ))
                    }
                </>
            }
            />
            <Box className={classes.copyright}>
                <Text pb={20} className={classes.copyrightText}>&copy; 2022 Copyright - Neon Infinito</Text>
            </Box>
        </footer>
    )
}

export default Footer