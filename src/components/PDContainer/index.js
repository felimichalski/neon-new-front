import { useEffect, useState, useCallback, } from "react"
import { useParams } from "react-router-dom"
import { Box, Title, createStyles, Card, Image, Text, Divider, Button, Select, UnstyledButton, InputBase } from "@mantine/core"
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
      [`@media (max-width: 600px)`]: {
         flexDirection:"column",
       },
   },
   imgContainer: {
      display:"flex",
      alignItems:"flex-start",
      justifyContent:"center",
      width:"50%",
      height:"60rem",
      background:"#AAAAAA",
      margin:"0",
      [`@media (max-width: 600px)`]: {
         width:"100%",
         height:"auto"
       },
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
      [`@media (max-width: 600px)`]: {
         width:"100%",
         height:"auto"
       },
   },
   title: {
      marginTop:"0.5rem",
      [`@media (max-width: 600px)`]: {
         fontSize:"3rem"
       },
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
   backgorund:"black",
   [`@media (max-width: 600px)`]: {
      padding:"3rem 0"
    },
  },
  uniqueColor:{
   display:"flex",
   alignItems:"center",
   justifyContent:"center",
   margin:"5rem"
  },
  colors:{
   marginTop:"2.5rem",
   display:"grid",
   gridTemplateColumns:"auto auto auto auto auto",
   height:"10rem",
   width:"100%",
   [`@media (max-width: 600px)`]: {
      gridTemplateColumns:"auto auto",
      alignItems:"center",
      fontSize:"3rem"
    },
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

   const [colorPicked, setColorPicked] = useState("")
   const [sizePicked, setSizePicked] = useState("")
   const [colorIsValidated, setColorIsValidated] = useState(true)
   const [sizeIsValidated, setSizeIsValidated] = useState(true)
   const dispatch = useDispatch()
   const colors = ['BlancoFrio', "BlancoCalido", 'Rojo', "Amarillo", "Naranja", 'Rosa', "Verde", "Azul", "Celeste", "Violeta"]

   const handleCart = (e)=>{
      if(!sizePicked){
         setSizeIsValidated(false)
         return
      }else if(!colorPicked && product.color===true){
         setSizeIsValidated(true)
         setColorIsValidated(false)
         return
      }
      setSizeIsValidated(true)
      setColorIsValidated(true)
      dispatch(addToCart(cartProduct))
   }
   
         // const sizesArray = product?JSON.parse(product.size):""
   const cartProduct = {
      category: product?product.category:"",
      color: colorPicked,
      description:product?product.description:"",
      id:product?product.id:"",
      image: product?product.image:"",
      isFeatured:product?product.isFeatured:false,
      size:sizePicked,
      title:product?product.title:"",
      unit_price:product?product.unit_price:0,
   }
   // COMPONENTE 
   if(product){
      return(
         <Box className={classes.container}>
            <Box className={classes.card}>
               <Box className={classes.imgContainer}>
                  <Image
                    src={`${process.env.REACT_APP_API_URL}/mediafiles/${product.image}`}
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
                     <Text sx={{marginTop:"1rem", textAlign:"justify", [`@media (max-width: 600px)`]: {marginTop:"2rem", fontSize:"1.2rem"},}}>
                     {product.description}
                     </Text>
                  </Box>
                  <Box /* sx={{height:"45%"}} */ className={classes.inputContainer}>


                  <InputBase sx={{width:"100%"}}
                          onChange={(e)=>setSizePicked(e.currentTarget.value)}
                          component="select"
                          data={product.size}
                          placeholder="Elige uno"
                          label="Tamaño:"
                      >
                           <option hidden="hidden"></option>
                          {/* {sizesArray.map((size, index)=><option onClick={()=>setSizePicked(size)} value={size} key={index}>{size}</option>)} */}
                  </InputBase>
                  
                     <Box className={product.color?classes.colors:classes.uniqueColor}>
                        {product.color?colors.map((col,index)=> <Box key={index} className={classes.colorBox}>
                                          <UnstyledButton onClick={()=>setColorPicked(col)} className={colorPicked===col?classes.buttonActive:classes.colorButtonContainer}>
                                             <Box className={cx(classes[col], classes.colorButton)}></Box>
                                          </UnstyledButton>
                                          <Title weight={400} color="#AAAAAA" size="0.7rem" sx={{marginLeft:"0.4rem", [`@media (max-width: 600px)`]: {fontSize:"1rem"},}}>{col}</Title>
                                          </Box>
                                          ):
                                          <Title size="h2" sx={{fontWeight:"300"}}>Color único</Title>}
                     </Box>
                  </Box>
                  <Box sx={{height:"20%", width:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                  <Divider sx={{width:"100%", marginBottom:"0.3rem"}} color="#DDDDDD" size="sm" width="10rem"/>
                     <Title size="h2" sx={{marginBottom:"1rem"}}>
                        {product.unit_price} ARS$
                     </Title>
                     <Button className={classes.button} onClick={(e) => handleCart(e)}>Añadir al carrito<AddShoppingCart size={20} /> </Button>
                     <Text color="red" sx={{display:sizeIsValidated?"none":"-moz-initial"}}>Debes elegir un tamaño para comprar</Text>
                     <Text color="red" sx={{display:colorIsValidated?"none":"-moz-initial"}}>Debes elegir un color para comprar</Text>
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