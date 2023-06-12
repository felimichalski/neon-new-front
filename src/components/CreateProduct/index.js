import { Box, Title, Container, createStyles, MultiSelect, TextInput, InputBase, Flex, Image, Button, NumberInput, Select, LoadingOverlay } from '@mantine/core'
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { postProduct } from '../../features/actions/productActions';
import { useEffect, useState } from 'react';
import FileUpload from '../FileUpload';

const useStyles = createStyles(theme => ({
    flexContainer: {
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
        width: "70%",
        /* background:"aqua" */
    },
    inputs: {
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        width: "100%"
    },
}))


const CreateProduct = () => {
    const { classes } = useStyles()
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])
    const form = useForm({
        initialValues: {
            files: null,
            category: null,
            description: "",
            is_featured: false,
            title: "",
            unit_price: 0,
            sizes: [],
            colors: [],
        },
        validate: {
            unit_price: (value) => (value === 0 ? 'El producto debe tener precio' : null),
            title: (value) => (value === "" ? 'El producto debe tener título' : null),
            category: (value) => (value.length === 0 ? 'El producto debe tener categoría' : null),
            description: (value) => (value === "" ? 'El producto debe tener descripción' : null),
            files: (value) => value.name.length < 1 ? 'El producto debe tener imagen' : null
        }
    })

    const fetchData = async () => {
        try {
            const categoriesResponse = await fetch(`${process.env.REACT_APP_API_URL}/categories/thin`, {
                method: "GET",
            });
            let categories = await categoriesResponse.json();
            setCategories(categories);

            const colorsResponse = await fetch(`${process.env.REACT_APP_API_URL}/colors/thin`, {
                method: "GET",
            });
            const colors = await colorsResponse.json();
            setColors(colors);

            const sizesResponse = await fetch(`${process.env.REACT_APP_API_URL}/sizes/thin`, {
                method: "GET",
            });
            const sizes = await sizesResponse.json();
            setSizes(sizes);
        } catch (error) {
            console.log(error);
        }
    };

    const createProduct = (values) => {
        const formData = new FormData();
        for(const color of values.colors) {
            formData.append("colors[]", color);
        }
        for(const size of values.sizes) {
            formData.append("sizes[]", size);
        }
        formData.append("files", values.files);
        formData.append("category", values.category);
        formData.append("description", values.description);
        formData.append("is_featured", values.is_featured);
        formData.append("title", values.title);
        formData.append("unit_price", values.unit_price);
        dispatch(postProduct(formData));
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log(categories)
    }, [categories])

    return (
        <Container fluid sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "2rem" }}>
            <Title order={1} size="h1">Crear Producto</Title>
            <Flex className={classes.flexContainer}>
                <form className={classes.form} onSubmit={form.onSubmit(createProduct)}>
                    <TextInput className={classes.inputs}
                        onChange={(e) => form.setFieldValue("title", e.currentTarget.value)}
                        label="Nombre del producto"
                        {...form.getInputProps("title")}
                    />

                    <TextInput className={classes.inputs}
                        onChange={(e) => form.setFieldValue("description", e.currentTarget.value)}
                        label="Descripción del producto"
                        placeholder="Agregar referencias de tamaños a la descripción"
                        {...form.getInputProps("description")}
                    />

                    {sizes.length > 0 &&
                        <MultiSelect className={classes.inputs}
                            onChange={(e) => form.values.sizes.push(e.currentTarget.value)}
                            label="Tamaños disponibles del producto"
                            data={sizes}
                            {...form.getInputProps("sizes")}
                        />
                    }

                    {colors.length > 0 &&
                        <MultiSelect className={classes.inputs}
                            onChange={(e) => form.values.colors.push(e.currentTarget.value)}
                            label="Colores disponibles del producto"
                            data={colors}
                            {...form.getInputProps("colors")}
                        />
                    }

                    {categories.length > 0 &&
                        <Select className={classes.inputs}
                            onChange={(e) => form.setFieldValue("category", e.currentTarget.value)}
                            label="Categoría del producto"
                            data={categories}
                            {...form.getInputProps("category")}
                        />
                    }

                    <FileUpload
                        name='files'
                        label='Imagen'
                        {...form.getInputProps('files')}
                        onChange={files => {
                            form.setFieldValue("files", files)
                        }}
                        error={form.errors.files}
                        multiple={true}
                        style={{
                            width: '100%'
                        }}
                    />
                    <NumberInput className={classes.inputs}
                        onChange={(e) => form.setFieldValue("unit_price", e.currentTarget.value)}
                        label="Precio del producto"
                        {...form.getInputProps("unit_price")}
                    />

                    <InputBase className={classes.inputs}
                        onChange={(e) => form.setFieldValue("is_featured", e.currentTarget.value)}
                        component="select"
                        data={['si', 'no']}
                        label="¿El producto es destacado?"
                        {...form.getInputProps("is_featured")}
                    >
                        <option value={true}>Sí</option>
                        <option value={false}>No</option>
                    </InputBase>
                    {/* <Box className={classes.imageBox}>
                            <Image alt="ref image" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"}/>
                        </Box> */}
                    <Button sx={{ margin: "0.5rem 0", marginTop: "3rem", width: "50%" }} type="submit">Subir</Button>
                </form>
            </Flex>
        </Container>
    )

}
export default CreateProduct
