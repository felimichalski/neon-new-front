import { useEffect, useState, useCallback, } from "react"
import { useParams } from "react-router-dom"
import { Box, Title, createStyles, Card, Image, Text, Divider, Button, Select, UnstyledButton } from "@mantine/core"
import { useDispatch } from "react-redux"
import { addToCart } from '../../features/slices/cartSlice'
import { AddShoppingCart } from '@styled-icons/material'

const useStyles = createStyles((theme,) => ({
   container:{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
  /*     height:"45rem", */
      background: "#DDDDDD",
   },
   card: {
      display:"flex",
      flexDirection:"row",
      alignItems:"flex-start",
      justifyContent:"center",
      width:"100%",
      height:"100%",
      padding:0,
   },
   imgContainer: {
      display:"flex",
      alignItems:"flex-start",
      justifyContent:"center",
      width:"50%",
      height:"60rem",
      background:"#AAAAAA",
      margin:"0",
      /* boxShadow:"0 0 1rem 0.01rem #FE6561" */
   },
   infoContainer: {
      padding:"1rem 1.5rem",
      display:"flex",
      flexDirection:"column",
      width:"40%",
      alignItems:"center",
      justifyContent:"space-around",
      height:"60rem",
      background:"white",
      margin:"0",
   },
   title: {
      marginTop:"0.5rem",
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
  inputContainer:{
   height:"45%",
   width:"100%",
   display:"flex",
   flexDirection:"column",
   justifyContent:"flex-start",
   alignItems:"center",
   backgorund:"black"
  },
  colors:{
   marginTop:"2.5rem",
   display:"grid",
   gridTemplateColumns:"auto auto auto auto auto",
   height:"10rem",
   width:"100%",

  },
  colorBox:{
   display:"flex",
   alignItems:"center",
  },
  colorButtonContainer:{
   display:"flex",
   alignItems:"center",
   justifyContent:"center",
   background:"white",
   height:"1.8rem",
   width:"1.8rem",
   border:"1px solid #DDDDDD",
   borderRadius:"5px"
  },
  buttonActive:{
   display:"flex",
   alignItems:"center",
   justifyContent:"center",
   background:"white",
   height:"1.8rem",
   width:"1.8rem",
   border:"1px solid #228BE6",
   borderRadius:"5px"
  },
  colorButton:{
   height:"1rem",
   width:"1rem",
   border:"1px solid #808080"
  },
  BlancoFrio:{
   background:"#DFFFFF"
  },
  BlancoCalido:{
   background:"#FFF7EE"
  },
  Rojo:{
   background:"#E41D16"
  },
  Rosa:{
   background:"#EB06A1"
  },
  Amarillo:{
   background:"#F2F04E"
  },
  Naranja:{
   background:"#FE950C"
  },
  Verde:{
   background:"#1CE276"
  },
  Azul:{
   background:"#0303F3"
  },
  Celeste:{
   background:"#1AEAFB"
  },
  Violeta:{
   background:"#D600E9"
  }
}))

const PDContainer = ()=>{
   const { classes, cx } = useStyles();
   const {id} = useParams()
   const [product, setProduct] = useState()
   const [colorPicked, setColorPicked] = useState("")
   const dispatch = useDispatch()
   
   const colors = ['BlancoFrio', "BlancoCalido", 'Rojo', "Amarillo", "Naranja", 'Rosa', "Verde", "Azul", "Celeste", "Violeta"]


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
                  <Box sx={{height:"10%", width:"100%", }}>
                     <Title className={classes.title}>{product.title}</Title>
                     <Divider className={classes.divider} sx={{marginTop:"0.1rem"}} color="#DDDDDD" size="sm"/>
                  </Box>
                  
                  <Box sx={{height:"25%", display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"flex-start"}}>
                  {/* <Title size="h5" sx={{marginTop:"3rem"}}>descripción:</Title> */}
                     <Text sx={{marginTop:"1rem", textAlign:"justify"}}>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque commodi sapiente provident cum tempora eius harum ad omnis est? Minima.
                     </Text>
                  </Box>
                  <Box /* sx={{height:"45%"}} */ className={classes.inputContainer}>
                     <Select sx={{width:"100%"}}
                        label="Tamaño:"
                        placeholder="Elige uno"
                        data={JSON.parse(product.size)}
                     />
                     <Box className={classes.colors}>
                        {colors.map((col,index)=> <Box key={index} className={classes.colorBox}>
                                          <UnstyledButton onClick={()=>setColorPicked(col)} className={colorPicked===col?classes.buttonActive:classes.colorButtonContainer}>
                                             <Box className={cx(classes[col], classes.colorButton)}></Box>
                                          </UnstyledButton>
                                          <Title weight={400} color="#AAAAAA" size="0.7rem" sx={{marginLeft:"0.4rem"}}>{col}</Title>
                                          </Box>
                                          )}
                     </Box>
                  </Box>
                  <Box sx={{height:"20%", width:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                  <Divider sx={{width:"100%", marginBottom:"0.3rem"}} color="#DDDDDD" size="sm" width="10rem"/>
                     <Title size="h2" sx={{marginBottom:"1rem"}}>
                        {product.unit_price} ARS$
                     </Title>
                     <Button className={classes.button} onClick={() => dispatch(addToCart(product))}>Añadir al carrito<AddShoppingCart size={20} /> </Button>
                  </Box>
                  
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
export default PDContainer