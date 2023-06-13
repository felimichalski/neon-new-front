import { Box, createStyles, TextInput, Button, Title, Text, Textarea, BackgroundImage } from "@mantine/core"
import emailjs from "@emailjs/browser"
/* import { useForm } from "@mantine/form"; */
import { toast } from "react-toastify";
import backgroundC from '../../assets/bgContact.jpg'

const useStyles = createStyles((theme, { hoverEffects }) => ({
    root:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    header:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"15rem",
        width:"auto",
        [`@media (max-width: 600px)`]: {
            boxShadow:"0 0 20px 1px rgb(0, 0, 0, 0.2)",
          },
    },
    title:{
        color:"white",
        [`@media (max-width: 600px)`]: {
            fontSize:"1.8rem",
            textAlign:"center"
          },
    },
    infoContainer:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"45rem",
        [`@media (max-width: 600px)`]: {
            flexDirection:"column-reverse",
            /* justifyContent:"revert" */
          },
    },
    form:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-around",
        height:"35rem",
        boxShadow:"0 0 20px 1px rgb(0, 0, 0, 0.2)",
        width:"60%",
        padding:"1rem 0",
        [`@media (max-width: 600px)`]: {
            width:"100%",
            boxShadow:"none",
            marginBottom:"2rem"
          },
    },
    textBox:{
        width:"30%",
        /* background:"aqua", */
        height:"60%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        padding:"4rem",
        [`@media (max-width: 600px)`]: {
            width:"100%",
            padding:"0 2rem",
            textAlign:"center",
          },
    },
    text:{
        fontWeight:"500",
        letterSpacing:"0.1rem",
        fontSize:"1.2rem",
        [`@media (max-width: 600px)`]: {
            fontSize:"1.1rem"
          },
    },
    input:{
        height:"2rem",
        padding:"1rem 0.5rem",
        width:"80%",
        border:"none",
        borderBottom:"2px solid #B0B0B0",
        background:"#F9F9F9",
          '&:focus': {
            outline: "none",

          },
    },
    textarea:{
        resize:"none",
        padding:"1rem 1rem",
        width:"80%",
        border:"none",
        borderBottom:"2px solid #B0B0B0",
        background:"#F9F9F9",
        '&:focus': {
            outline: "none",

          },
    },
    submitButton:{
        backgroundColor:"#228BE6",
        fontSize:"1.2rem",
        letterSpacing:"0.05rem",
        color:"white",
        border:"none",
        outline:"none",
        height:"2rem",
        width:"30%",
        /* borderRadius:"0.5rem", */
        [`&:hover`]: {
            cursor: !hoverEffects && "pointer",
            background: !hoverEffects && "#117AB0"
        }
    },
    validation:{
        color:"red",
        height:"2rem"
    }
}))

const Contact = ({hoverEffects})=>{

    const handleSubmit = (e)=>{
        e.preventDefault()
        const nameInput = document.getElementById("name")
        const mailInput = document.getElementById("mail")
        const textarea = document.getElementById("textarea")
        const nameVali = document.getElementById("name_validate")
        const mailVali = document.getElementById("mail_validate")
        const textareaVali = document.getElementById("textarea_validate")
        if(nameInput.value ===""){
            nameVali.textContent = "Debes completar este campo"
        }else{
            nameVali.textContent = ""
        }
        if(mailInput.value===""){
            mailVali.textContent = "Debes completar este campo"
        }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailInput.value)){
            mailVali.textContent = "Utilizá un mail válido"
        }else{
            mailVali.textContent = ""
        }
        if(textarea.value===""){
            textareaVali.textContent = "Debes completar este campo" 
        }else{
            textareaVali.textContent = ""
        }
        if(nameInput.value ===""||mailInput.value===""||textarea.value===""){
            return
        }
        emailjs.sendForm("service_v8cqrk8","template_s2spdei",e.target,"3VYT0PrO35TzxcFO_")
    }

    const {classes} = useStyles({hoverEffects})
    return (
        <Box className={classes.root}>
            <BackgroundImage src={backgroundC} className={classes.header}>
                <Box sx={{height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center", background:"rgba(0, 0, 0, 0.4)"}}>
                <Title className={classes.title}>¿Querés trabajar con nosotros?</Title>
                </Box>
            </BackgroundImage>
            <Box className={classes.infoContainer}>
            <form onSubmit={(e)=>handleSubmit(e)} className={classes.form}>
                <Title size="h2" sx={{color:"#B0B0B0",marginBottom:"1rem"}}>¡Entremos en contacto!</Title>
                <input id="name" name="user_name" placeholder="Nombre" className={classes.input} type="text" />
                <span id="name_validate" className={classes.validation}></span>
                <input id="mail" name="user_email" placeholder="tu@email.com" className={classes.input} type="text" />
                <span id="mail_validate" className={classes.validation}></span>
                <textarea placeholder="Tu mensaje..." className={(classes.textarea)} name="user_message" id="textarea" cols="30" rows="10"></textarea>
                <span id="textarea_validate" className={classes.validation}></span>
                <button className={classes.submitButton} type="submit">Enviar</button>
            </form>
            <Box className={classes.validationBox}>

            </Box>
            <Box className={classes.textBox}>
                <Text className={classes.text}>Ya muchas empresas confiaron en nosotros, imaginá tu diseño y nosotros lo hacemos realidad.</Text>
            </Box>
            </Box>
        </Box>
    )
}
export default Contact