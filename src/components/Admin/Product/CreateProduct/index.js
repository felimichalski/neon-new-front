import { Box, Container, createStyles, MultiSelect, TextInput, Flex, Button, NumberInput, Select, Loader, Text, Group, Divider } from '@mantine/core'
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { postProduct } from '../../../../features/actions/productActions';
import { useEffect, useState } from 'react';
import FileUpload from '../../../FileUpload';

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


const CreateProduct = () => {
    const { classes } = useStyles()
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [uploading, setUploading] = useState(false)
    const form = useForm({
        initialValues: {
            files: [],
            categories: null,
            description: "",
            is_featured: false,
            title: "",
            small_price: 0,
            medium_price: 0,
            large_price: 0,
            color: null,
            small_width: 0,
            small_height: 0,
            medium_width: 0,
            medium_height: 0,
            large_width: 0,
            large_height: 0,
        },
        validate: {
            small_price: (value) => (value === 0 ? 'Elija el precio' : null),
            medium_price: (value) => (value === 0 ? 'Elija el precio' : null),
            large_price: (value) => (value === 0 ? 'Elija el precio' : null),
            title: (value) => (value === "" ? 'El producto debe tener título' : null),
            categories: (value) => (value == null || value.length === 0 ? 'El producto debe tener categoría' : null),
            description: (value) => (value === "" ? 'El producto debe tener descripción' : null),
            files: (value) => (value.length < 1 ? 'El producto debe tener imagen' : null),
            color: (value) => (value == null ? 'Elija si el producto debe tener o no diferentes colores' : null),
            small_width: (value) => (value === 0 ? 'Elija el tamaño' : null),
            small_height: (value) => (value === 0 ? 'Elija el tamaño' : null),
            medium_width: (value) => (value === 0 ? 'Elija el tamaño' : null),
            medium_height: (value) => (value === 0 ? 'Elija el tamaño' : null),
            large_width: (value) => (value === 0 ? 'Elija el tamaño' : null),
            large_height: (value) => (value === 0 ? 'Elija el tamaño' : null),
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

    const createProduct = async (values) => {
        setUploading(true)
        const formData = new FormData();
        for (const file of values.files) {
            formData.append("files", file);
        }
        for (const category of values.categories) {
            formData.append("categories", category);
        }
        formData.append("color", values.color);
        formData.append("description", values.description);
        formData.append("is_featured", values.is_featured);
        formData.append("title", values.title);
        formData.append("small_price", values.small_price);
        formData.append("medium_price", values.medium_price);
        formData.append("large_price", values.large_price);
        formData.append("small_width", values.small_width);
        formData.append("small_height", values.small_height);
        formData.append("medium_width", values.medium_width);
        formData.append("medium_height", values.medium_height);
        formData.append("large_width", values.large_width);
        formData.append("large_height", values.large_height);
        await dispatch(postProduct(formData));
        setUploading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Container fluid sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "2rem" }}>
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

                    <Select className={classes.inputs}
                        onChange={(e) => form.values.color.push(e.currentTarget.value)}
                        label="¿El producto tiene diferentes colores?"
                        data={[{ value: true, label: "Si" }, { value: false, label: "No" }]}
                        {...form.getInputProps("color")}
                    />

                    {categories.length > 0 &&
                        <MultiSelect className={classes.inputs}
                            onChange={(e) => form.setFieldValue("categories", e.currentTarget.value)}
                            label="Categorías del producto"
                            data={categories}
                            {...form.getInputProps("categories")}
                        />
                    }

                    <Select className={classes.inputs}
                        onChange={(e) => form.setFieldValue("is_featured", e.currentTarget.value)}
                        data={[{ value: true, label: "Si" }, { value: false, label: "No" }]}
                        label="¿El producto es destacado?"
                        {...form.getInputProps("is_featured")}
                    />


                    <Box className={classes.sizes}>
                        <div className={classes.sizeBox}>
                            <Text className={classes.mantineText}>Tamaño Pequeño</Text>
                            <Group position='apart'>
                                <NumberInput className={classes.smallInput}
                                    onChange={(e) => form.setFieldValue("small_width", e.currentTarget.value)}
                                    label="Ancho (cm)"
                                    {...form.getInputProps("small_width")}
                                />

                                <NumberInput className={classes.smallInput}
                                    onChange={(e) => form.setFieldValue("small_height", e.currentTarget.value)}
                                    label="Alto (cm)"
                                    {...form.getInputProps("small_height")}
                                />
                            </Group>
                            <NumberInput className={classes.inputs}
                                onChange={(e) => form.setFieldValue("small_price", e.currentTarget.value)}
                                label="Precio"
                                {...form.getInputProps("small_price")}
                            />
                        </div>
                        <Divider size="xs" orientation="vertical" />
                        <div className={classes.sizeBox}>
                            <Text className={classes.mantineText}>Tamaño Mediano</Text>
                            <Group position='apart'>
                                <NumberInput className={classes.smallInput}
                                    onChange={(e) => form.setFieldValue("medium_width", e.currentTarget.value)}
                                    label="Ancho (cm)"
                                    {...form.getInputProps("medium_width")}
                                />

                                <NumberInput className={classes.smallInput}
                                    onChange={(e) => form.setFieldValue("medium_height", e.currentTarget.value)}
                                    label="Alto (cm)"
                                    {...form.getInputProps("medium_height")}
                                />
                            </Group>
                            <NumberInput className={classes.inputs}
                                onChange={(e) => form.setFieldValue("medium_price", e.currentTarget.value)}
                                label="Precio"
                                {...form.getInputProps("medium_price")}
                            />
                        </div>
                        <Divider size="xs" orientation="vertical" />
                        <div className={classes.sizeBox}>
                            <Text className={classes.mantineText}>Tamaño Grande</Text>
                            <Group position='apart'>
                                <NumberInput className={classes.smallInput}
                                    onChange={(e) => form.setFieldValue("large_width", e.currentTarget.value)}
                                    label="Ancho (cm)"
                                    {...form.getInputProps("large_width")}
                                />

                                <NumberInput className={classes.smallInput}
                                    onChange={(e) => form.setFieldValue("large_height", e.currentTarget.value)}
                                    label="Alto (cm)"
                                    {...form.getInputProps("large_height")}
                                />
                            </Group>
                            <NumberInput className={classes.inputs}
                                onChange={(e) => form.setFieldValue("large_price", e.currentTarget.value)}
                                label="Precio"
                                {...form.getInputProps("large_price")}
                            />
                        </div>
                    </Box>

                    <FileUpload
                        name='files'
                        label='Imagen'
                        onChange={files => {
                            form.setFieldValue("files", files)
                        }}
                        {...form.getInputProps('files')}
                        error={form.errors.files}
                        multiple={true}
                        style={{
                            width: '100%',
                            margin: "0.5rem 0",
                        }}
                    />

                    <Button sx={{ margin: "0.5rem 0", marginTop: "3rem", width: "50%" }} style={{ backgroundColor: '#339AF0' }} type="submit" disabled={uploading}>{(uploading) ? <Loader size='xs' /> : 'Cargar'}</Button>
                </form>
            </Flex>
        </Container>
    )

}
export default CreateProduct
