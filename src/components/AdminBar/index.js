import { Box, Button, Container, createStyles, Divider, Grid, List, MantineProvider, Text, Title, Flex } from '@mantine/core'
import { useHover } from '@mantine/hooks';

const useStyles = createStyles((theme, { hoverEffects }) => ({
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
    option:{
        fontSize:"1.3rem",
        background:"none",
        color: "grey",
        width: "20rem",
        height: "100%",
        transition:"transform .1s linear",
        [`&:hover`]: {
            transform: !hoverEffects && "scale(1.1)",
            background: !hoverEffects && "none"
        }
    },
})) 

const AdminBar = ({hoverEffects}) => {
    const {classes} = useStyles({hoverEffects});
        
    return(
                <Container fluid className={classes.container}>
                    <Flex className={classes.flexContainer}>
                        <Button className={classes.option}>
                            Cargar Productos
                        </Button>
                        <Divider px={0} my={10} color='rgb(229 229 229 / 1)' orientation='vertical' />
                        <Button className={classes.option}>
                            Borrar Productos
                        </Button>
                    </Flex>
                </Container>
    )
}
export default AdminBar