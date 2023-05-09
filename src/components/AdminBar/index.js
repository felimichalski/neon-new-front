import { Box, Button, Container, createStyles, Divider, Grid, List, MantineProvider, Text, Title, Flex } from '@mantine/core'
import { useHover } from '@mantine/hooks';
import { motion } from 'framer-motion';

const useStyles = createStyles((theme) => ({
    container: {
        width: '100%',
        height:"10vh",
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        borderBottom: '1px solid rgb(229 229 229 / 1)',
        top: 0,
    },
    flexContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        height: "100%",
        margin: "auto"
    },
    /* option1:{
        background:"red",
        color: "grey",
        width: "10%",
        height: "100%"

    },
    selectedOption1:{
        background:"none !important",
        color: "black",
        width: "10%",
        height: "100%"

    },
    option2:{
        background:"red",
        color: "grey",
        width: "10%",
        height: "100%"

    },
    selectedOption2:{
        background:"none !important",
        color: "black",
        width: "10%",
        height: "100%"

    }, */
})) 

const AdminBar = () => {
    const {classes} = useStyles();
    const {hovered, ref} = useHover();
        
    return(
                <Container fluid className={classes.container}>
                    <Flex className={classes.flexContainer}>
                        <Button ref={ref} className={hovered?classes.selectedOptions:classes.options}>
                            Cargar Productos
                        </Button>
                        <Button ref={ref} className={hovered?classes.selectedOption2:classes.option2}>
                            Borrar Productos
                        </Button>
                        <Button ref={ref} className={hovered?classes.selectedOptions:classes.options}>
                            Administrar Usuarios
                        </Button>
                    </Flex>
                </Container>
    )
}
export default AdminBar