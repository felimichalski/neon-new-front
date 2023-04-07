import { ActionIcon, createStyles, Grid, Image, Text, Title } from "@mantine/core";
import { useDispatch } from "react-redux";
import { addToCart, decreaseCart, removeFromCart } from "../../features/slices/cartSlice";
import { Minus, Plus, Trash2 as Trash } from '@styled-icons/evaicons-solid'

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '7vw'
  },

  column: {
    height: '100%',
    padding: 0,
  },

  image: {
    height: '100%',
    aspectRatio: '1 / 1',
    width: 'auto !important'
  },

  text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  title: {
    fontSize: 12,
    width: 'max-content'
  },

  category: {

  },

  quantity: {
    display: 'flex',
    alignItems: 'center',
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
    <Grid m={1} className={classes.root}>
      <Grid.Col span={1} className={classes.column}>
        <Image src={data.image} className={classes.image}/>
      </Grid.Col>
      <Grid.Col className={[classes.column, classes.text]} span={2} offset={1}>
        <Title className={classes.title}>{data.title}</Title>
        <Text className={classes.category}>{data.category.name}</Text>
      </Grid.Col>
      <Grid.Col className={[classes.column, classes.quantity]} span={3} offset={1}>
        <ActionIcon size={30} variant="subtle" onClick={() => dispatch(decreaseCart(data))} className={classes.actionIcon}>
          <Minus size={16} />
        </ActionIcon>

        <Text mx={10}>
          {data.quantity}
        </Text>

        <ActionIcon size={30} variant="subtle" onClick={() => dispatch(addToCart(data))} className={classes.actionIcon}>
          <Plus size={16}/>
        </ActionIcon>
      </Grid.Col>
      <Grid.Col span={1} offset={1}>
        <Text>${data.unit_price}</Text>
      </Grid.Col>
      <Grid.Col span={1} offset={1}>
        <ActionIcon size={30} variant="subtle" onClick={() => dispatch(removeFromCart(data))} className={classes.actionIcon}>
          <Trash size={16} color='red'/>
        </ActionIcon>
      </Grid.Col>
    </Grid>
  )
}

export default CartItem