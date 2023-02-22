import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { BackgroundImage, createStyles, Title } from '@mantine/core'
import Autoplay from 'embla-carousel-autoplay';

import background1 from '../../assets/1.webp'
import background2 from '../../assets/bgHome.webp'
import background3 from '../../assets/bgHome2.jpeg'

const useStyles = createStyles((theme) => ({
    root: {
        height: '90vh',
        width: '100%',
        position: 'relative',
        cursor: 'grab',
        display: 'flex !important',
        justifyContent: 'center',
        alignItems: 'center'
    },

    overlay: {
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.7) 100%)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1
    },

    title: {
        zIndex: 2,
        color: theme.white
    }
}))

const TitleBox = () => {
    const { classes } = useStyles();
    const autoplay = useRef(Autoplay({ delay: 5000 }));

    return (
        <Carousel
            slideSize='100%'
            loop
            withControls={false}
            withIndicators={true}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            styles={{
                indicator: {
                    borderRadius: '50%',
                    width: 12,
                    height: 12,
                    margin: '0 5px',
                    border: '3px solid white',
                    opacity: 1,

                    '&[data-active]': {
                    backgroundColor: 'black',
                    }
                },
            }}
        >
            <Carousel.Slide>
                <BackgroundImage className={classes.root} src={background1}>
                    <div className={classes.overlay} />
                    <Title className={classes.title}>Title 1</Title>
                </BackgroundImage>
            </Carousel.Slide>
            <Carousel.Slide>
                <BackgroundImage className={classes.root} src={background2}>
                    <div className={classes.overlay} />
                    <Title className={classes.title}>Title 2</Title>
                </BackgroundImage>
            </Carousel.Slide>
            <Carousel.Slide>
                <BackgroundImage className={classes.root} src={background3}>
                    <div className={classes.overlay} />
                    <Title className={classes.title}>Title 3</Title>
                </BackgroundImage>
            </Carousel.Slide>
        </Carousel>
    )
}

export default TitleBox