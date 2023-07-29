import { Container, createStyles, TextInput, Flex, Button, NumberInput, Select, Loader } from '@mantine/core'
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { postProduct } from '../../../../features/actions/productActions';
import { useState } from 'react';
import { toast } from 'react-toastify';

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


const CreateDiscount = () => {
    const { classes } = useStyles()
    const [uploading, setUploading] = useState(false)
    const form = useForm({
        initialValues: {
            code: null,
            value: null,
            type: null,
            reusable: null,
            max: null,
        },
        validate: {
            code: (value) => (!value ? 'Escriba el código de descuento' : null),
            value: (value) => (!value ? 'El descuento debe tener un valor' : null),
            type: (value) => (!value ? 'Elija el tipo del descuento' : null),
            reusable: (value) => (value === null ? 'Elija si el descuento es reutilizable o no' : null),
        }
    })

    const createDiscount = async (values) => {
        if(values.type === 'price' || values.max === undefined) values.max = null
        setUploading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/discount`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
                mode: "cors"
            });
    
            if (response.status !== 201) {
                toast.error("El código no pudo ser creado", {
                    position: "bottom-left",
                });
            } else {
                toast.success("Código creado", {
                    position: "bottom-left",
                });
            }
        } catch (error) {
            console.error(error)
        }
        setUploading(false)
    }

    return (
        <Container fluid sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "2rem" }}>
            <Flex className={classes.flexContainer}>
                <form className={classes.form} onSubmit={form.onSubmit(createDiscount)}>
                    <TextInput className={classes.inputs}
                        onChange={(e) => form.setFieldValue("code", e.currentTarget.value)}
                        label="Código de descuento"
                        placeholder="XXXX-XXXX-XXXX"
                        {...form.getInputProps("code")}
                    />

                    <Select className={classes.inputs}
                        onChange={(e) => form.setFieldValue("type", e.currentTarget.value)}
                        label="Tipo"
                        data={[{ value: 'percentage', label: "Porcentaje" }, { value: 'price', label: "Precio" }]}
                        placeholder='Elija si se descontará un porcentaje o un precio específico'
                        {...form.getInputProps("type")}
                    />

                    <NumberInput className={classes.inputs}
                        onChange={(e) => form.setFieldValue("value", e.currentTarget.value)}
                        label="Valor"
                        placeholder="Si es de tipo porcentaje, 30 equivale a 30% del precio total, sino, es el precio que se descuenta"
                        {...form.getInputProps("value")}
                    />

                    <Select className={classes.inputs}
                        onChange={(e) => form.setFieldValue("reusable", e.currentTarget.value)}
                        data={[{ value: true, label: "Si" }, { value: false, label: "No" }]}
                        label="¿El código es reutilizable?"
                        placeholder='Elija si el código puede usarse una única vez o varias'
                        {...form.getInputProps("reusable")}
                    />

                    {form.values.type === 'percentage' && 
                        <NumberInput className={classes.inputs}
                            onChange={(e) => form.setFieldValue("max", e.currentTarget.value)}
                            label="Máximo"
                            placeholder="Elija si el código tiene un precio máximo de descuento (para descuentos de tipo porcentaje)"
                            {...form.getInputProps("max")}
                        />
                    }


                    <Button sx={{ margin: "0.5rem 0", marginTop: "3rem", width: "50%" }} style={{ backgroundColor: '#339AF0' }} type="submit" disabled={uploading}>{(uploading) ? <Loader size='xs' /> : 'Cargar'}</Button>
                </form>
            </Flex>
        </Container>
    )

}
export default CreateDiscount
