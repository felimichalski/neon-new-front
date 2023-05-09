import AdminBar from "../components/AdminBar"
import { useEffect, useState, useRef } from 'react';
import { useDocumentTitle } from '@mantine/hooks';
import { useForm } from "@mantine/form";
import { Box, Container, createStyles, MultiSelect, TextInput, InputBase, Flex, Image, Button, NumberInput } from '@mantine/core'
import { motion } from 'framer-motion';

const useStyles = createStyles(theme => ({
    flexContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "80%",
        height: "70%",
        margin: "auto",
        background: "none",
        boxShadow: "box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);-webkit-box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);-moz-box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);",
        marginTop: "5rem",
    },
    imageBox:{
        width:"50%",
        height:"80%",
        background: "black"
    },
    form:{
        display:"flex",
        alignItems:""
    },
    inputs:{
        marginTop:"1rem",
        marginBottom: "1rem"
    },
}))

const Admin = () => {
    useDocumentTitle("Neon Infinito - Panel de administrador")
    
    const {classes} = useStyles()
   /*  const initialProduct = {
            image: "",
            category:"",
            description:"",
            isFeatured: true,
            title:"",
            unit_price:0
    } */
    /* const [product, setProduct] = useState(initialProduct) */

 
    const form = useForm({
        initialValues:{
            image: "",
            category:"",
            description:"",
            isFeatured: true,
            title:"",
            unit_price:0
        }
        
    })

    /* const handleChange = (e)=>{
        setProduct({ ...product, [e.target.name]: e.target.value })
    } */
    /* console.log(product) */
    

    return(
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
            <Container fluid sx={{height:"100vh", width:"100%"}}>
                <AdminBar/>
                    <Flex className={classes.flexContainer}>
                        <Box className={classes.imageBox}>
                            <Image alt="ref image" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"}/>
                        </Box>
                        <form onSubmit={form.onSubmit(values => console.log(values))}>
                            <TextInput className={classes.inputs}
                                onChange={(e)=>form.setFieldValue("title", e.currentTarget.value)}
                                placeholder="Nombre del producto"
                                {...form.getInputProps("title")}
                            />

                            <TextInput className={classes.inputs}
                            onChange={(e)=>form.setFieldValue("description", e.currentTarget.value)}
                               placeholder="Descripción del producto"
                                {...form.getInputProps("description")}
                            />

                            <MultiSelect className={classes.inputs}
                            onChange={(e)=>form.setFieldValue("category", e.currentTarget.value)}
                                data={['deporte', 'arte']}
                                placeholder="Categoría del producto"
                                {...form.getInputProps("category")}
                            />

                            <TextInput className={classes.inputs}
                            onChange={(e)=>form.setFieldValue("image", e.currentTarget.value)}
                                placeholder="Link de la imagen"
                                {...form.getInputProps("image")}
                            />

                            <NumberInput className={classes.inputs}
                            onChange={(e)=>form.setFieldValue("unit_price", e.currentTarget.value)}
                                placeholder="Precio del producto"
                                {...form.getInputProps("unit_price")}
                            />

                            <InputBase className={classes.inputs}
                                onChange={(e)=>form.setFieldValue("isFeatured", e.currentTarget.value)}
                                component="select"
                                data={['si', 'no']}
                                placeholder="¿El producto se mostrará?"
                                {...form.getInputProps("isFeatured")}
                            >
                                <option value={true}>Sí</option>
                                <option value={false}>No</option>
                            </InputBase>
                            <Button type="submit">Subir</Button>
                        </form>
                    </Flex>    
            </Container>
        </motion.div>
    )
}
export default Admin