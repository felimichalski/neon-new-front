import { Box, Title, Container, createStyles, MultiSelect, TextInput, InputBase, Flex, Image, Button, NumberInput, Select, LoadingOverlay, Loader, Text, Group, Divider } from '@mantine/core'
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { postProduct } from '../../features/actions/productActions';
import { useEffect, useState } from 'react';
import FileUpload from '../FileUpload';
import { postCategory } from '../../features/actions/categoryActions';

const useStyles = createStyles(theme => ({
    flexContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "90%",
        height: "max-content",
        background: "none",
        boxShadow: "box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);-webkit-box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);-moz-box-shadow: 2px -1px 23px 6px rgba(168,168,168,0.75);",
        padding: "3rem",
    },

    imageBox: {
        display: "flex",
        alignItems: "center",
        width: "30%",
        height: "50%",
        background: "none"
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

    mantineText: {
        display: 'inline-block',
        margin: ".5rem 0 4px 0",
        fontSize: '14px',
        fontWeight: 500,
        color: 'black',
        wordBreak: 'break-word',
        cursor: 'default',
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
    },

    sizes: {
        display: 'flex',
        margin: '2rem 0'
    },

    sizeBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '10px',
        margin: '0 .5rem'
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

    /* const createProduct = async (values) => {
        setUploading(true)
        const formData = new FormData();
        for (const category of values.categories) {
            formData.append("categories", category);
        }
        formData.append("name", values.name);
        await dispatch(postCategory(formData));
        setUploading(false)
    } */

    useEffect(() => {
        fetchData()
    }, [])
    /* console.log(categories) */
    return (
        <Container fluid sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "2rem" }}>
            <Flex className={classes.flexContainer}>
                <form className={classes.form} onSubmit={form.onSubmit(values=>dispatch(postCategory(values)))}>
                    <TextInput className={classes.inputs}
                        onChange={(e) => form.setFieldValue("name", e.currentTarget.value)}
                        label="Nombre de la categoría"
                        {...form.getInputProps("name")}
                    />

                    <Button sx={{margin: "0.5rem 0", marginTop: "3rem", width: "50%"}} type="submit" disabled={uploading}>{(uploading) ? <Loader size='xs' /> : 'Cargar'}</Button>
                </form>
            </Flex>
            <Flex className={classes.flexContainer} sx={{margin:"3rem"}}>
                {categories?categories.map(e=><Box>{e.label}</Box>):""}
            </Flex>
        </Container>
    )

}
export default CreateCategory