import { Box, Text, Title, createStyles } from "@mantine/core"

const useStyles = createStyles((theme,) => ({
    root:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        background:"#DDDDDD",
        height:"50rem",
        width:"100%"
    },
    textBox:{   
        padding:"5rem 10rem",
        height:"90%",
        width:"80%",
        background:"white"
    },
    title:{
        marginBottom:"3rem"
    }
}))

const PDDesc = ()=>{
    const {classes} = useStyles()
    return(
        <Box className={classes.root}>
            <Box className={classes.textBox}>
                <Title className={classes.title}>Un poco sobre nosotros</Title>
                
            </Box>
        </Box>
    )
}
export default PDDesc