import { Box, createStyles, TextInput, Button, Title, Text, Textarea } from "@mantine/core"
import emailjs from "@emailjs/browser"
/* import { useForm } from "@mantine/form"; */
import { toast } from "react-toastify";

const useStyles = createStyles((theme) => ({
    root:{
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    infoContainer:{
        display:"flex",
        justifyContent:"center"
    }
}))

const Contact = ()=>{
    /* const htmlForm = document.getElementById("formulario")
    console.log(htmlForm) */
    /* emailjs.sendForm("service_2q0ykq2","template_foe24bk",htmlForm,"oIeXxu1_SwGzfkz4K") */
    //const form = useForm({
    //    initialValues:{
    //        name:"",
    //        email:"",
    //        message:""
    //    },
    //    validate: {
    //        /* unit_price: (value) => (value === 0? 'El producto debe tener precio' : null),
    //        title: (value) => (value === "" ? 'El producto debe tener título' : null),
    //        category: (value) => (value.length === 0 ? 'El producto debe tener categoría' : null),
    //        description: (value) => (value === "" ? 'El producto debe tener descripción' : null), */
    //      }
    //})
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(e.target)
        emailjs.sendForm("service_v8cqrk8","template_s2spdei",e.target,"3VYT0PrO35TzxcFO_")
    }

    const {classes} = useStyles()
    return (
        <Box className={classes.root}>
            <Title>¿Querés trabajar con nosotros?</Title>
            <Box className={classes.infoContainer}>
            <form onSubmit={(e)=>handleSubmit(e)} className={classes.form}>
                    <div /* className={s.name_and_email} */>
                        <div /* className={s.name_container} */>
                            <input id="name" name="user_name" placeholder="Name" /* className={s.input} */ type="text" />
                            {/* <span id="name_validate" className={s.validate}></span> */}
                        </div>
                        <div /* className={s.email_container} */>
                            <input id="mail" name="user_email" placeholder="your@email.com" /* className={s.input} */ type="text" />
                            {/* <span id="mail_validate" className={s.validate}></span> */}
                        </div>
                    </div>
                    <div /* className={s.textarea_container} */>
                        <textarea placeholder="Your message..." /* className={s.textarea} */ name="user_message" id="textarea" cols="30" rows="10"></textarea>
                        {/* <span id="textarea_validate" className={s.validate}></span> */}
                    </div>
                    <button /* className={s.submit_button} */ type="submit">enviar</button>
                </form>
                {/* <form id="formulario" onSubmit={form.onSubmit(values=>emailjs.sendForm("service_2q0ykq2","template_foe24bk",htmlForm,"oIeXxu1_SwGzfkz4K"))} className={classes.form}>
                    <TextInput onChange={(e)=>form.setFieldValue("name", e.currentTarget.value)} 
                        label="nombre"
                        {...form.getInputProps("name")}
                    />

                    <TextInput onChange={(e)=>form.setFieldValue("email", e.currentTarget.value)}
                        label="email" 
                        placeholder="ejemplo@ejemplo.com"
                        {...form.getInputProps("email")}
                    />

                    <Textarea onChange={(e)=>form.setFieldValue("message", e.currentTarget.value)}
                        label="mensaje"
                        {...form.getInputProps("message")}
                    />

                    <Button type="submit">enviar</Button>                
                </form> */}
                <Box>
                    <Text>Ya muchas empresas confiaron en nosotros, imagina tu diseño y nosotros lo hacemos realidad</Text>
                </Box>
            </Box>
        </Box>
    )
}
export default Contact