import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Box, Title, createStyles, Card, Image, Text, Divider, Button } from "@mantine/core"
import { useDispatch } from "react-redux"
import { addToCart } from '../../features/slices/cartSlice'
import { AddShoppingCart } from '@styled-icons/material'

const useStyles = createStyles((theme,) => ({
   container:{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      height:"90vh",
      background: "rgb(255,190,188)",
      background: "linear-gradient(180deg, rgba(255,190,188,1) 0%, rgba(197,255,245,1) 100%)"
   },
   card: {
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-evenly",
      width:"90%",
      height:"80%",
      padding:0,
      /* boxShadow:"0 0 1.5rem 0.01rem grey" */
   },
   imgContainer: {
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      width:"30%",
      height:"80%",
      background:"white",
      margin:"0",
      padding:"1rem",
      /* boxShadow:"0 0 1rem 0.01rem #FE6561" */
   },
   infoContainer: {
      padding:"1rem 1.5rem",
      display:"flex",
      flexDirection:"column",
      width:"30%",
      alignItems:"center",
      justifyContent:"center",
      height:"100%",
      background:"white",
      margin:"0",
      borderRadius:"1rem"
   },
   title: {
      marginTop:"0.5rem"
   },
   button: {
      width:"100%",
      backgroundColor: 'black',
      fontFamily: 'ITC Avant Garde Gothic',
      fontWeight: 400,
      letterSpacing:"0.1rem",
      '&:hover': {
          backgroundColor: theme.colors.gray[8]
      }
  },
}))

const ProductDetail = ()=>{
   const { classes } = useStyles();
   const {id} = useParams()
   const [product, setProduct] = useState()
   const dispatch = useDispatch()
   console.log(id)

   const loadProduct = useCallback(async () => {
   if (id) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
          headers: {
              'Content-Type': 'application/json'
          },
          mode: 'cors',
      });

      const data = await response.json()
      setProduct(data)
  } else {
      setProduct(null)
  }
}, [id])

   useEffect(() => {
      loadProduct();
   }, [id, loadProduct])
   console.log(product)
   // COMPONENTE 
   if(product){
      return(
         <Box className={classes.container}>
            <Box className={classes.card}>
               <Box className={classes.imgContainer}>
                  <Image
                    src={product.image}
                    alt="Product Image"
                    />
               </Box>
               <Box className={classes.infoContainer}>
                  <Box sx={{height:"10%"}}>
                     <Title className={classes.title}>{product.title}</Title>
                     <Divider sx={{marginTop:"0.1rem"}} color="#DDDDDD" size="sm"/>
                  </Box>
                  <Box sx={{height:"80%", display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"flex-start"}}>
                  <Title size="h5" sx={{marginTop:"3rem"}}>descripción:</Title>
                     <Text sx={{marginTop:"2rem", textAlign:"justify"}}>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque commodi sapiente provident cum tempora eius harum ad omnis est? Minima.
                     </Text>
                  </Box>
                  <Box sx={{height:"10%", width:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                  <Divider sx={{width:"100%", marginBottom:"0.3rem"}} color="#DDDDDD" size="sm" width="10rem"/>
                     <Title size="h2" sx={{marginBottom:"1rem"}}>
                        {product.unit_price} ARS$
                     </Title>
                  </Box>
                  <Button className={classes.button} onClick={() => dispatch(addToCart(product))}>Añadir al carrito<AddShoppingCart size={20} /> </Button>
               </Box>
            </Box>
         </Box>
      )  
   } else {
      return(
         <Box className={classes.container}>
           No hay detalles de este producto
         </Box>
      )   
   }
 
}
export default ProductDetail