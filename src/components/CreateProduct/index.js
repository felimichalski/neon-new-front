import { Box, Title, Container, createStyles, MultiSelect, TextInput, InputBase, Flex, Image, Button, NumberInput } from '@mantine/core'
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { postProduct } from '../../features/actions/productActions';

const useStyles = createStyles(theme => ({
    flexContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "80%",
        height: "28rem",
        margin: "auto",
        background: "none",
        boxShadow: "box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);-webkit-box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);-moz-box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);",
        marginTop: "3rem",
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
        justifyContent:"center"
    },
    inputs:{
        marginTop:"0.5rem",
        marginBottom: "0.5rem"
    },
}))


const CreateProduct = ()=>{
    const {classes} = useStyles()
    const dispatch = useDispatch()
    const form = useForm({
        initialValues:{
            image: "",
            category:[],
            description:"",
            isFeatured: true,
            title:"",
            unit_price:0
        },
        validate: {
            unit_price: (value) => (value === 0? 'El producto debe tener precio' : null),
            title: (value) => (value === "" ? 'El producto debe tener título' : null),
            category: (value) => (value.length === 0 ? 'El producto debe tener categoría' : null),
            description: (value) => (value === "" ? 'El producto debe tener descripción' : null),
          }
    })

    return(
            <Container fluid sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", marginTop:"2rem"}}>
                    <Title order={1} size="h1">Crear Producto</Title>
                    <Flex className={classes.flexContainer}>
                        <Box className={classes.imageBox}>
                            <Image alt="ref image" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"}/>
                        </Box>
                        <form className={classes.form} onSubmit={form.onSubmit(values => dispatch(postProduct(values)))}>
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
                            <Button sx={{margin:"0.5rem 0"}} type="submit">Subir</Button>
                        </form>
                    </Flex>    
            </Container>
    )

}
export default CreateProduct
                    