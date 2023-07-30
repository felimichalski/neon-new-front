import { Box, createStyles, Flex, Text, Image } from "@mantine/core"
import { Truck } from "@styled-icons/bootstrap/Truck"
import { Payment } from "@styled-icons/fluentui-system-regular/Payment"

const useStyles = createStyles(() => ({
flexContainer:{
    alignItems:"center",
    justifyContent:"space-around",
    [`@media (max-width: 600px)`]: {
        transform:"scale(0.7)",
        justifyContent:"center"
      },
},
iconContainer:{
    display:"flex",
    width:"25%",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
   /*  background:"grey", */
    fontFamily:'ITC Avant Garde Gothic',
    textAlign:"center",
    [`@media (max-width: 600px)`]: {
        width:"30%",
        margin:"0 2rem"
        
      },
}
}))

const IconsHome = () =>{
    const {classes} = useStyles()

    return(
        <Flex  className={classes.flexContainer}>
            <Box className={classes.iconContainer}>
                <Truck size={100}/>
                <Text>Contamos con envíos a todo el país</Text>
            </Box>
            <Box className={classes.iconContainer}>
                <Payment size={100}/>
                <Text>Pagá utilizando cualquier medio de pago</Text>
                
            </Box>
            <Box className={classes.iconContainer}>
                <Image height={100} width={100} src="https://rankea.com.ar/wp-content/uploads/2019/05/pago-mercado.png" alt="mp"/>
                <Text>Tu compra protegida por MercadoPago</Text>
            </Box>
        </Flex>
    )
}
export default IconsHome