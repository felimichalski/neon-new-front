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
                <Text>
                Bienvenido a Neon Infinito. En 2020, nació Neon Infinito con el propósito de ofrecer decoración y comunicación a través de la tecnología del neón LED. Nos especializamos en embellecer espacios y crear experiencias impactantes, tanto en el ámbito de la decoración del hogar, como en colaboraciones con marcas internacionales. Durante nuestro recorrido, hemos establecido una presencia en las redes sociales, conectando con amantes del diseño y la estética visual. Ahora, damos un paso más al lanzar nuestra página web para brindarte una experiencia de compra cómoda y conveniente. Nos enorgullece haber concretado proyectos importantes con diversos clientes y marcas. Hemos dejado nuestra impronta en lugares emblemáticos como el Casino Trilenium a lo largo de todo el país, hemos colaborado con agencias productoras de TV y hemos sido elegidos por marcas reconocidas como Givenchy, Chandon y Smirnoff, entre otras, para llevar a cabo proyectos de neón exclusivos. En Neon Infinito, nuestra trayectoria y experiencia son nuestro aval. Nos comprometemos a ofrecerte carteles de neón de la más alta calidad. Cada uno de nuestros trabajos refleja la dedicación y la atención al detalle que nos caracteriza. Gracias por visitar Neon Infinito. Esperamos que encuentres inspiración en nuestros carteles de neón para transformar tus espacios en algo verdaderamente especial.
                </Text>
            </Box>
        </Box>
    )
}
export default PDDesc