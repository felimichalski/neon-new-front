import { Box, Title, createStyles, Text, BackgroundImage } from "@mantine/core"
import backgroundA from '../../assets/bgAbout.jpg'

const useStyles = createStyles((theme) => ({
    root:{
        height:"auto",
        padding:"8rem 0",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        background:"rgba(0, 0, 0, 0.2)",
    },
    textContainer:{
        width:"95%",
        padding:"3rem 4rem",
        background:"rgba(255, 255, 255, 0.8)",
        fontWeight:500,
        borderRadius:"1rem",
        fontSize:"1.4rem"
    },
}))

const About = ()=>{
    const {classes} = useStyles()
    return(
        <BackgroundImage src={backgroundA}>
            <Box className={classes.root}>
                <Title sx={{color:"white", textShadow:"0 0 10px rgba(0, 0, 0, 0.5)", marginBottom:"2rem"}}>Lo que debes saber sobre Neon Infinito</Title>
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
        </BackgroundImage>
    )
}
export default About;