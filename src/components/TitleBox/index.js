import { Carousel } from '@mantine/carousel';
import { BackgroundImage, createStyles, Title, Box, Button, TextInput } from '@mantine/core'
import { getPublics } from '../../features/actions/publicActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Edit2Outline } from "@styled-icons/evaicons-outline/Edit2Outline"
import { Tick } from "@styled-icons/typicons/Tick"
import { Cross } from "@styled-icons/entypo/Cross"
import { useForm } from '@mantine/form';
import { updatePublic } from '../../features/actions/publicActions';

import background3 from '../../assets/1.webp'
import background1 from '../../assets/bgHome.webp'
import background2 from '../../assets/bgHome2.jpeg'
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

const useStyles = createStyles((theme, { hoverEffects }) => ({
    root: {
        height: '70vh',
        width: '100%',
        position: 'relative',
        display: 'flex !important',
        justifyContent: 'center',
        alignItems: 'center',
        [`@media (max-width: 600px)`]: {
            height: "15rem",
        },
    },

    overlay: {
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.7) 100%)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1
    },

    title: {
        color: theme.white,
        [`@media (max-width: 600px)`]: {
            fontSize: "1.5rem"
        },
    },

    titleBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: "white",
        position: "absolute",
        top: "50%",
        left: "50%",
        margin: "auto",
        transform: "translate(-50%, -50%)",
        zIndex: 5,

        [`@media (max-width: 600px)`]: {
            textAlign: "center",

        }
    },

    editButton: {
        background: "none",
        transition: "transform 0.2s",
        padding: "0",
        margin: "0 0.5rem",
        [`&:hover`]: {
            transform: !hoverEffects && "scale(1.1)",
            background: !hoverEffects && "none"
        }
    },

    form: {
        display: "flex",
        flexDirection: "row"
    }
}))

const TitleBox = ({ hoverEffects, updateText, setUpdateText }) => {

    const [firstPublic, setFirstPublic] = useState('');
    const publics = useSelector(state => state.public.items)
    const logedUser = useSelector(state => state.auth.userInfo)
    const dispatch = useDispatch()
    const { classes } = useStyles({ hoverEffects });
    const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))
    const form = useForm({
        initialValues: {
            content: "",
            name: "Home Title"
        },
        validate: {
            content: (value) => (value === "" ? 'Debes escribir algo para cambiar este texto' : null),
        }
    })

    useEffect(() => {
        if(publics.length > 0) {
            const homeTitle = publics.find(title => title.name === "HomeTitle")
            setFirstPublic(homeTitle.content)
        }
    }, [publics]);

    const handleEdit = (e) => {
        if (e.currentTarget.name === "edit") {
            setUpdateText("HomeTitle")
        } else if (e.currentTarget.name === "ok") {
            dispatch(getPublics)
        } else {
            dispatch(getPublics)
            setUpdateText("")
        }
    }

    return (
        <Box sx={{ position: "relative", zIndex: 2 }}>
            <Box className={classes.titleBox}>
                {updateText !== "HomeTitle" ?
                    <Title className={classes.title}>{firstPublic}</Title> :
                    <form className={classes.form} onSubmit={form.onSubmit(values => dispatch(updatePublic(values)))}>
                        <TextInput
                            placeholder={firstPublic}
                            className={classes.titleInput}
                            {...form.getInputProps("content")}
                        />
                        <Button type="submit" name="ok" onClick={(e) => handleEdit(e)} className={classes.editButton}><Tick size={27} /></Button>
                        <Button name="back" onClick={(e) => handleEdit(e)} className={classes.editButton}><Cross size={27} /></Button>
                    </form>}

                {logedUser?.admin && updateText !== "HomeTitle" ?
                    <Button name="edit" onClick={(e) => handleEdit(e)} className={classes.editButton}><Edit2Outline size={27} /></Button> :
                    ""}

                {/* {updateText==="title"?
                <Box>
                    <Button name="ok" onClick={(e)=>handleEdit(e)} className={classes.editButton}><Tick size={27}/></Button>
                    <Button name="back" onClick={(e)=>handleEdit(e)} className={classes.editButton}><Cross size={27}/></Button>
                </Box>:
                ""
                } */}
            </Box>
            <Carousel
                slideSize='100%'
                loop
                withControls={false}
                withIndicators={true}
                draggable={false}
                styles={{
                    indicator: {
                        borderRadius: '50%',
                        width: 12,
                        height: 12,
                        margin: '0 5px',
                        border: '3px solid white',
                        opacity: 1,
                        backgroundColor: 'white !important',

                        '&[data-active]': {
                            backgroundColor: 'black !important',
                        }
                    },
                }}
                plugins={[autoplay.current]}
            >

                <Carousel.Slide>
                    <BackgroundImage className={classes.root} src={background1}>
                        <div className={classes.overlay} />
                    </BackgroundImage>
                </Carousel.Slide>
                <Carousel.Slide>
                    <BackgroundImage className={classes.root} src={background2}>
                        <div className={classes.overlay} />
                    </BackgroundImage>
                </Carousel.Slide>
                <Carousel.Slide>
                    <BackgroundImage className={classes.root} src={background3}>
                        <div className={classes.overlay} />
                    </BackgroundImage>
                </Carousel.Slide>
            </Carousel>
        </Box>
    )
}

export default TitleBox