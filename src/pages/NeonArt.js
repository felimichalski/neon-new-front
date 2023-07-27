import { Box, Title, createStyles, Text, BackgroundImage, Image, Grid } from "@mantine/core"
import backgroundA from '../assets/bgAbout.jpg'
import IMG1 from '../assets/NeonArt1.jpg'
import IMG2 from '../assets/NeonArt2.jpg'
import IMG3 from '../assets/NeonArt3.jpg'
import IMG4 from '../assets/NeonArt4.jpg'
import IMG5 from '../assets/NeonArt5.jpg'
import IMG6 from '../assets/NeonArt6.JPG'
import IMG7 from '../assets/NeonArt7.JPG'
import IMG8 from '../assets/NeonArt8.JPG'
import IMG9 from '../assets/NeonArt9.jpg'
import IMG10 from '../assets/NeonArt10.JPG'

const allImages= [
    [IMG1,"Desarrollos para ambentación de eventos corporativos"],
    [IMG2,"Adaptación del Neon Art a todos los espacios"],
    [IMG3,"Luces de alta calidad adecuadas a cada evento"],
    [IMG4,"Implementacion de distintas tecnicas y materiales"],
    [IMG5,"Colores variados y vivos"],
    [IMG6,"Decoracion para darle un toque único a tus espacios más personales"],
    [IMG7,"Cartelería a gran escala para casinos y espacios multitudinarios"],
/*     [IMG8,"Implementacion de neon en stands y festivales"], */
    [IMG9,"Producciones en serie enfocadas en marcas y distribuidores"],
    [IMG10,"Logos y diseños totalmente personalizados"],
]


const useStyles = createStyles((theme, { hoverEffects }) => ({
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
    image:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"20rem",
        background:"black",
        width:"auto",
        [`&:hover`]: {
            transform: hoverEffects && 'scale(1.02)',
            boxShadow: hoverEffects && '0 8px 42px rgb(0 0 0 / 20%)',
        },
        [`@media (min-width: 1900px)`]: {
            height:"30rem",
          },
    },
    hoverBox:{
        background:"transparent",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        height:"100%", 
        color:"transparent",
        textAlign:"center",
        fontSize:"1rem",
        padding:"1.5rem",
        transition:"background, color, 0.5s",

        [`&:hover`]: {
            background: 'rgba(0, 0, 0, 0.5)',
            color:"white",
        },
        [`@media (min-width: 1900px)`]: {
            fontSize:"1.5rem",
          },
    }
}))

const NeonArt = ({hoverEffects}) => {  
    const {classes} = useStyles({hoverEffects})
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
{/*                     <br/>
                    <Title sx={{textAlign:"center"}}>Algunos de nuestros trabajos</Title> */}
                    <br/>
                    <Grid>
                        {allImages.map((e, index)=>
                        <Grid.Col sm={12} md={6} lg={4}>
                            <BackgroundImage src={e[0]} alt={`image${index + 1}`} className={classes.image}>
                                    <Box className={classes.hoverBox}>
                                        <Text sx={{width:"90%"}}><b>·</b> {e[1]}</Text>
                                    </Box>
                                </BackgroundImage>
                        </Grid.Col>
                        )}
                       
                    </Grid>
                    <br/>
                    <Text>Gracias por visitar nuestra web. Esperamos que encuentres inspiración en nuestros carteles de neón para transformar tus espacios en algo verdaderamente especial.</Text>
                </Box>
        </Box>
    )
}
export default NeonArt