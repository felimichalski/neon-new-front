import { Button, Card, createStyles, Image, Text, Title } from "@mantine/core"
import { AddShoppingCart } from '@styled-icons/material'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../features/slices/cartSlice'

const useStyles = createStyles((theme) => ({
    root: {
        width: '90%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 7,
        transition: 'all .1s linear',

        [`&:hover`]: {
            transform: 'scale(1.02)',
            boxShadow: '0 8px 42px rgb(0 0 0 / 20%)' 
        }
    },

    section: {
        // marginBottom: '1rem',
    },
    
    imageSection: {
        overflow: 'hidden',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    
    textSection: {
        // alignSelf: 'flex-start',
        padding: '1rem !important',
        textAlign: 'center',
    },

    priceSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '.5rem !important'
    },

    category: {
        color: theme.colors.gray[5],
        fontSize: 12,
        fontFamily: 'ITC Avant Garde Gothic Cn',
        fontWeight: 400,
        textTransform: 'uppercase'
    },

    title: {
        fontSize: 20,
        fontFamily: 'ITC Avant Garde Gothic',
        fontWeight: 400,
        marginBottom: '.5rem',
    },

    button: {
        backgroundColor: 'black',
        fontFamily: 'ITC Avant Garde Gothic',
        fontWeight: 400,
        '&:hover': {
            backgroundColor: theme.colors.gray[8]
        }
    }
}));

const Item = ({ data }) => {

    const { classes } = useStyles({ categoryColor: data.category.color });

    const dispatch = useDispatch();

    return (
        <Card radius={0} className={classes.root}>
            <Card.Section className={[classes.section, classes.imageSection]}>
                <Image src={data.image} className={classes.image}/>
            </Card.Section>
            <Card.Section radius={0} className={[classes.section, classes.textSection]}>
                <Title className={classes.title}>{data.title}</Title>
                <Text className={classes.category}>{data.category.name}</Text>
            </Card.Section>
            <Card.Section radius={0} className={[classes.section, classes.priceSection]}>
                <Text>${data.unit_price}</Text>
                <Button className={classes.button} onClick={() => dispatch(addToCart(data))}><AddShoppingCart size={20} /></Button>
            </Card.Section>
        </Card>
    )
}

export default Item