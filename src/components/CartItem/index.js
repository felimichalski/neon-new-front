import { ActionIcon, createStyles, Grid, Image, Text, Title } from "@mantine/core";
import { useDispatch } from "react-redux";
import { addToCart, decreaseCart, removeFromCart } from "../../features/slices/cartSlice";
import { Minus, Plus, Trash2 as Trash } from '@styled-icons/evaicons-solid'
import { Carousel } from "@mantine/carousel";

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "space-around",
    height: '7vw',
    [`@media (max-width: 600px)`]: {
      height: "5rem",
    },
  },

  column: {
    height: '100%',
    padding: 0,
  },

  image: {
    height: '100%',
    aspectRatio: '1 / 1',
    width: 'auto !important',

  },

  text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: "inherit",
    [`@media (max-width: 600px)`]: {
      paddingLeft: "2rem",
    },
  },

  title: {
    fontSize: "1.2rem",
    width: '6rem',
    /* background:"black", */
    [`@media (max-width: 600px)`]: {
      fontSize: "1rem",
      marginRight: "1rem"
    },
  },

  category: {

  },

  quantity: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: "2rem"
  },

  actionIcon: {
    color: 'black',
    display: 'flex',
    alignItems: 'center'
  }
}));

const CartItem = ({ data }) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  return (
    <Grid m={4} className={classes.root}>
      <Grid.Col span={1} className={classes.column}>
        <Carousel>
          {data.images?.map((image) => (
            <Carousel.Slide key={image.id}>
              {/* <Image
                src={`${process.env.REACT_APP_API_URL}/mediafiles/${image.key}`}
                alt="Product Image"
              /> */}
              <Image src={`${process.env.REACT_APP_API_URL}/mediafiles/${image.key}`} className={classes.image} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Grid.Col>
      <Grid.Col className={[classes.column, classes.text]} span={1} offset={1}>
        <Title className={classes.title}>{data.title + " " + data.size?.toUpperCase()}</Title>
        <Text sx={{ color: "#CCCCCC" }} className={classes.category}>{data.category.name || data.category}</Text>
      </Grid.Col>
      <Grid.Col className={[classes.column, classes.quantity]} span={1} offset={0}>
        <ActionIcon size={30} variant="subtle" onClick={() => dispatch(decreaseCart(data))} className={classes.actionIcon}>
          <Minus size={16} />
        </ActionIcon>

        <Text mx={10}>
          {data.quantity}
        </Text>

        <ActionIcon size={30} variant="subtle" onClick={() => dispatch(addToCart(data))} className={classes.actionIcon}>
          <Plus size={16} />
        </ActionIcon>
      </Grid.Col>
      <Grid.Col sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }} span={1} offset={1}>
        <Text>Color: {data.color ? data.color === "BlancoFrio" ? "Blanco frío" : data.color === "BlancoCalido" ? "Blanco cálido" : data.color : "Único"}</Text>
      </Grid.Col>
      <Grid.Col span={1} offset={1}>
        <Text sx={{ textAlign: "center" }}>${data.unit_price}</Text>
      </Grid.Col>
      <Grid.Col span={1} offset={1}>
        <ActionIcon size={30} variant="subtle" onClick={() => dispatch(removeFromCart(data))} className={classes.actionIcon}>
          <Trash size={16} color='red' />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  )
}

export default CartItem