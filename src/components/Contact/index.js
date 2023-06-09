import { Box, createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => ({
    root:{
        height:"100vh"
    }
}))

const Contact = ()=>{
    const {classes} = useStyles()
    return (
        <Box className={classes.root}>

        </Box>
    )
}
export default Contact