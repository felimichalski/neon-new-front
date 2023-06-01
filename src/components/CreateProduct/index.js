import { Box, Title, Container, createStyles, MultiSelect, TextInput, InputBase, Flex, Image, Button, NumberInput, Select } from '@mantine/core'
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { postProduct } from '../../features/actions/productActions';
import { useEffect, useState } from 'react';

const useStyles = createStyles(theme => ({
    flexContainer:{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "80%",
        height: "50rem",
        margin: "auto",
        background: "none",
        boxShadow: "box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);-webkit-box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);-moz-box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);",
        marginTop: "3rem",
        marginBottom: "3rem",
    },
    imageBox:{
        display:"flex",
        alignItems:"center",
        width:"30%",
        height:"50%",
        background: "none"
    },
    form:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        width:"70%",
        /* background:"aqua" */
    },
    inputs:{
        marginTop:"0.5rem",
        marginBottom: "0.5rem",
        width:"100%"
    },
}))


const CreateProduct = ()=>{
    const {classes} = useStyles()
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const form = useForm({
        initialValues:{
            image: "",
            category:[],
            description:"",
            isFeatured: true,
            title:"",
            unit_price:0,
            size:[],
            color:true,
        },
        validate: {
            unit_price: (value) => (value === 0? 'El producto debe tener precio' : null),
            title: (value) => (value === "" ? 'El producto debe tener título' : null),
            category: (value) => (value.length === 0 ? 'El producto debe tener categoría' : null),
            description: (value) => (value === "" ? 'El producto debe tener descripción' : null),
          }
    })

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchCategories()
    }, [])

    return(
            <Container fluid sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", marginTop:"2rem"}}>
                    <Title order={1} size="h1">Crear Producto</Title>
                    <Flex className={classes.flexContainer}>
                        <form className={classes.form} onSubmit={form.onSubmit(values =>{
                            values.color = JSON.stringify(values.color);
                            values.size = JSON.stringify(values.size);
                             dispatch(postProduct(values));
                        }
                        )}>
                            <TextInput className={classes.inputs}
                                onChange={(e)=>form.setFieldValue("title", e.currentTarget.value)}
                                label="Nombre del producto"
                                {...form.getInputProps("title")}
                            />

                            <TextInput className={classes.inputs}
                            onChange={(e)=>form.setFieldValue("description", e.currentTarget.value)}
                            label="Descripción del producto"
                               placeholder="agregar referencias de tamaños a la descripción"
                                {...form.getInputProps("description")}
                            />

                            <MultiSelect className={classes.inputs}
                            onChange={(e)=>form.setFieldValue("size", e.currentTarget.value)}
                            label="Tamaños disponíbles del producto"
                                data={['s', 'm', 'l']}
                                {...form.getInputProps("size")}
                            />

                            
                            <InputBase className={classes.inputs}
                                onChange={(e)=>form.setFieldValue("color", e.currentTarget.value)}
                                component="select"
                                data={['si', 'no']}
                                label="¿El producto tiene distintos colores disponibles?"
                                {...form.getInputProps("color")}
                            >
                                <option value={true}>Sí</option>
                                <option value={false}>No</option>
                            </InputBase>

                            <InputBase className={classes.inputs}
                                onChange={(e)=>form.setFieldValue("category", e.currentTarget.value)}
                                component="select"
                                data={['si', 'no']}
                                label="Categoría del producto"
                                {...form.getInputProps("category")}
                            >
                                {categories.map(cat=><option value={cat.name}>{cat.name}</option>)}
                            </InputBase>

                            <TextInput className={classes.inputs}
                            onChange={(e)=>form.setFieldValue("image", e.currentTarget.value)}
                            label="Link de la imagen"
                                placeholder="Link de la imagen"
                                {...form.getInputProps("image")}
                            />

                            <NumberInput className={classes.inputs}
                            onChange={(e)=>form.setFieldValue("unit_price", e.currentTarget.value)}
                            label="Precio del producto"
                                {...form.getInputProps("unit_price")}
                            />

                            <InputBase className={classes.inputs}
                                onChange={(e)=>form.setFieldValue("isFeatured", e.currentTarget.value)}
                                component="select"
                                data={['si', 'no']}
                                label="¿El producto es destacado?"
                                {...form.getInputProps("isFeatured")}
                            >
                                <option value={true}>Sí</option>
                                <option value={false}>No</option>
                            </InputBase>
                            {/* <Box className={classes.imageBox}>
                            <Image alt="ref image" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"}/>
                        </Box> */}
                            <Button sx={{margin:"0.5rem 0", marginTop:"3rem", width:"50%"}} type="submit">Subir</Button>
                        </form>
                    </Flex>    
            </Container>
    )

}
export default CreateProduct
                    