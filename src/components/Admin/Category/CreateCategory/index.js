import { Container, createStyles,TextInput, Flex, Button, Loader } from '@mantine/core'
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { postCategory } from '../../../../features/actions/categoryActions'

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

    return (
        <Container fluid sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "2rem" }}>
            <Flex className={classes.flexContainer}>
                <form className={classes.form} onSubmit={form.onSubmit(values => {
                    setUploading(true)
                    dispatch(postCategory(values))
                    setUploading(false)
                })}>
                    <TextInput className={classes.inputs}
                        onChange={(e) => form.setFieldValue("name", e.currentTarget.value)}
                        /* placeholder='Nombre de la nueva categoría' */
                        label="Nombre de la categoría"
                        {...form.getInputProps("name")}
                    />

                    <Button sx={{margin: "0.5rem 0", marginTop: "3rem", width: "50%" }} style={{ backgroundColor: '#339AF0' }} type="submit" disabled={uploading}>{(uploading) ? <Loader size='xs' /> : 'Cargar'}</Button>
                </form>
            </Flex>
        </Container>
    )

}
export default CreateCategory