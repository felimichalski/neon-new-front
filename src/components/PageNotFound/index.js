import { Box, Title, createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => ({
    root:{
        height:"90vh",
        padding:"2rem",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        background:"black",
        color:"white",
    },
    gif:{
        width:"11rem",
        margin:"1rem"
    }
}))

const PageNotFound = ()=>{
    const {classes} = useStyles()
    return (
        <Box className={classes.root}>
            <Title>La página que buscas no existe :(</Title>
            <img className={classes.gif} src="https://thumbs.gfycat.com/ConsiderateCornyBuzzard-max-1mb.gif" alt="neon heart"/>
            
        </Box>
    )
}
export default PageNotFound