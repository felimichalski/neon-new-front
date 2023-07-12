import { Box, Title, Container, createStyles,TextInput, Flex, Button, Loader, UnstyledButton} from '@mantine/core'
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { postProduct } from '../../features/actions/productActions';
import { useEffect, useState } from 'react';
import FileUpload from '../FileUpload';
import { postCategory } from '../../features/actions/categoryActions';
import { Trash3Fill } from '@styled-icons/bootstrap';
import { toast } from "react-toastify";

const useStyles = createStyles(theme => ({
    flexContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        height: "max-content",
        background: "none",
        boxShadow: "box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.3);-webkit-box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.4);-moz-box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);",
        padding: "3rem",
    },

    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
    },

    inputs: {
        margin: "0.5rem 0",
        width: "100%"
    },

    smallInput: {
        width: "35%"
    },
    categoryContainer:{
        margin:"5rem",
        width:"110%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        borderTop:"1px solid #DDDDDD",
        borderBottom:"1px solid #DDDDDD"
    },
    eachCategory:{
        width:"100%",
        height:"4.5rem",
        paddingLeft:"7rem",
        display:"flex",
        alignItems:"center",
        border:"1px solid #DDDDDD",
        /* borderBottom:"1px solid #DDDDDD", */
    },
    categoryTitle:{
        fontSize:"1.2rem",
        width:"50%",
        fontWeight:"400",
        letterSpacing:"0.1rem",
        alignItems:"center"
    },
    iconBox:{
        width:"50%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
}))


const CreateCategory = () => {
    const { classes } = useStyles()
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [uploading, setUploading] = useState(false)
    const form = useForm({
        initialValues: {
            name:"",
            color:"none",
            type:1
        },
        validate: {
            name: (value) => (value === "" ? 'La categoría debe tener nombre' : null),
        }
    })

    const fetchData = async () => {
        try {
            const categoriesResponse = await fetch(`${process.env.REACT_APP_API_URL}/categories/thin`, {
                method: "GET",
            });
            let categories = await categoriesResponse.json();
            setCategories(categories);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCategory = async (categoryId) => {
        /* setLoading(true) */
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/${categoryId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'DELETE'
        });
        
        if (response.status !== 200) {
            toast.error("El producto no pudo ser eliminado", {
              position: "bottom-right",
            });
        }

        toast.success("Producto Eliminado", {
            position: "bottom-right",
        });

        /* reloadProducts();
        setOpened(false)
        setLoading(false) */
    }

    useEffect(() => {
        fetchData()
    }, [])
    /* console.log(categories) */
    return (
        <Container fluid sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "2rem", width:"100%", padding:"0" }}>
            <Title sx={{marginBottom:"4rem"}}>CARGAR</Title>
            <Flex className={classes.flexContainer}>
                <form className={classes.form} onSubmit={form.onSubmit(values=>dispatch(postCategory(values)))}>
                    <TextInput className={classes.inputs}
                        onChange={(e) => form.setFieldValue("name", e.currentTarget.value)}
                        /* placeholder='Nombre de la nueva categoría' */
                        label="Nombre de la categoría"
                        {...form.getInputProps("name")}
                    />

                    <Button sx={{margin: "0.5rem 0", marginTop: "3rem", width: "50%"}} type="submit" disabled={uploading}>{(uploading) ? <Loader size='xs' /> : 'Cargar'}</Button>
                </form>
            </Flex>
            <Title sx={{marginTop:"5rem"}}>ELIMINAR</Title>
            <Box className={classes.categoryContainer} sx={{margin:"3rem"}}>
                {categories?categories.map(e=><Box className={classes.eachCategory}><Title className={classes.categoryTitle}>{e.label?e.label.toUpperCase():""}</Title><UnstyledButton className={classes.iconBox} onClick={()=>deleteCategory(e.value)}><Trash3Fill size={25} color="red"/></UnstyledButton></Box>):""}
            </Box>
        </Container>
    )

}
export default CreateCategory