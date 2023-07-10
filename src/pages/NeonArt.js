import { Box, Title, createStyles, Text, BackgroundImage } from "@mantine/core"
import backgroundA from '../assets/bgAbout.jpg'

const useStyles = createStyles((theme) => ({
    root:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    header:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"15rem",
        width:"auto",
        /* position:"relative", */
    },
    title:{
        color:"white", 
        textShadow:"0 0 10px rgba(0, 0, 0, 0.5)", 
        marginBottom:"2rem",
        [`@media (max-width: 600px)`]: {
            fontSize:"1.8rem",
            textAlign:"center"
          },
    },
    textContainer:{
        padding:"8rem 6rem",
        background:"rgba(255, 255, 255, 0.8)",
        fontWeight:400,
        fontSize:"1.4rem",
        width:"90%",
        [`@media (max-width: 600px)`]: {
            width:"100%",
            padding:"1.5rem",
            fontSize:"1.2rem"
          },
    },
}))

const NeonArt = () => {  
    const {classes} = useStyles()
    return(
        <Box className={classes.root}>
            <BackgroundImage src={backgroundA} className={classes.header}>
            <Box sx={{height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center", background:"rgba(0, 0, 0, 0.4)"}}>
                <Title className={classes.title}>Lo que tenés que saber sobre Neon Infinito</Title>
            </Box>
            </BackgroundImage>
                <Box className={classes.textContainer}>
                    <Text>En 2020, nació Neon Infinito con el propósito de ofrecer decoración y comunicación a través de la tecnología del neón LED. Nos especializamos en embellecer espacios y crear experiencias impactantes, tanto en el ámbito de la decoración del hogar, como en colaboraciones con marcas internacionales.</Text>
                    <br/>
                    <Text>Durante nuestro recorrido, hemos establecido una presencia en las redes sociales, conectando con amantes del diseño y la estética visual. Ahora, damos un paso más al lanzar nuestra página web para brindarte una experiencia de compra cómoda y conveniente.</Text>
                    <br/>
                    <Text>Nos enorgullece haber concretado proyectos importantes con diversos clientes y marcas. Hemos dejado nuestra impronta en lugares emblemáticos como el <b>Casino Trilenium</b> a lo largo de todo el país, hemos colaborado con agencias productoras de TV y hemos sido elegidos por marcas reconocidas como <b>Givenchy</b>, <b>Chandon</b> y <b>Smirnoff</b>, entre otras, para llevar a cabo proyectos de neón exclusivos.</Text>
                    <br/>
                    <Text>En Neon Infinito, nuestra trayectoria y experiencia son nuestro aval. Nos comprometemos a ofrecerte carteles de neón de la más alta calidad. Cada uno de nuestros trabajos refleja la dedicación y la atención al detalle que nos caracteriza.</Text>
                    <br/>
                    <Text>Gracias por visitar nuestra web. Esperamos que encuentres inspiración en nuestros carteles de neón para transformar tus espacios en algo verdaderamente especial.</Text>
                </Box>
        </Box>
    )
}
export default NeonArt