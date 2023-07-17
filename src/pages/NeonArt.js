import { Box, Title, createStyles, Text, BackgroundImage, Image } from "@mantine/core"
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
    images:{
        margin:"2rem 4rem",
        [`@media (max-width: 600px)`]: {
            margin:"1rem"
          },
    },
    imageBox1:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        [`@media (max-width: 600px)`]: {
            flexDirection:"column",
            margin:"3rem"
          },
    },
    imageBox2:{
            display:"flex",
            justifyContent:"flex-end",
            alignItems:"center",
            [`@media (max-width: 600px)`]: {
                flexDirection:"column-reverse",
                margin:"3rem"
              },
    }
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
{/*                     <br/>
                    <Title sx={{textAlign:"center"}}>Algunos de nuestros trabajos</Title> */}
                    <br/>
                    <Box className={classes.imageBox1}>
                        <Image width={300} height={300} src={IMG1} alt="image1" className={classes.images}/>
                        <Text><b>·</b> Desarrollos para ambentación de eventos corporativos</Text>
                    </Box>
                    <Box className={classes.imageBox2}>
                        <Text><b>·</b> Adaptación del Neon Art a todos los espacios</Text>
                        <Image width={350} height={330} src={IMG2} alt="image2" className={classes.images}/>
                    </Box>
                    <Box className={classes.imageBox1}>
                        <Image width={400} height={350} src={IMG3} alt="image3" className={classes.images}/>
                        <Text><b>·</b> Luces de alta calidad adecuadas a cada evento</Text>
                    </Box>
                    <Box className={classes.imageBox2}>
                        <Text><b>·</b> Implementacion de distintas tecnicas y materiales</Text>
                        <Image width={350} height={400} src={IMG4} alt="image4" className={classes.images}/>
                    </Box>
                    <Box className={classes.imageBox1}>
                        <Image width={380} height={300} src={IMG5} alt="image5" className={classes.images}/>
                        <Text><b>·</b> Colores variados y vivos</Text>
                    </Box>
                    <Box className={classes.imageBox2}>
                        <Text><b>·</b> Decoracion para darle un toque único a tus espacios más personales</Text>
                        <Image width={300} height={380} src={IMG6} alt="image6" className={classes.images}/>
                    </Box>
                    <Box className={classes.imageBox1}>
                        <Image width={400} height={330} src={IMG7} alt="image7" className={classes.images}/>
                        <Text><b>·</b> Cartelería a gran escala para casinos y espacios multitudinarios</Text>
                    </Box>
                    <Box className={classes.imageBox2}>
                        <Text><b>·</b> Implementacion de neon en stands y festivales</Text>
                        <Image width={380} height={380} src={IMG8} alt="image8" className={classes.images}/>
                    </Box>
                    <Box className={classes.imageBox1}>
                        <Image width={300} height={400} src={IMG9} alt="image9" className={classes.images}/>
                        <Text><b>·</b> Producciones en serie enfocadas en marcas y distribuidores</Text>
                    </Box>
                    <Box className={classes.imageBox2}>
                        <Text><b>·</b> Logos y diseños totalmente personalizados</Text>
                        <Image width={330} height={460} src={IMG10} alt="image10" className={classes.images}/>
                    </Box>
                    <br/>
                    <Text>Gracias por visitar nuestra web. Esperamos que encuentres inspiración en nuestros carteles de neón para transformar tus espacios en algo verdaderamente especial.</Text>
                </Box>
        </Box>
    )
}
export default NeonArt