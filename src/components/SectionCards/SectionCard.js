import { BackgroundImage, Box, Card, createStyles, Text, Title, UnstyledButton, Button, TextInput } from "@mantine/core"
/* import { useSelector, useDispatch } from "react-redux";
import { Edit2Outline } from "@styled-icons/evaicons-outline/Edit2Outline"
import { getPublics, updatePublic } from "../../features/actions/publicActions";
import { useForm } from "@mantine/form";
import { Tick } from "@styled-icons/typicons/Tick"
import { Cross } from "@styled-icons/entypo/Cross"
import { useEffect } from "react"; */

const useStyles = createStyles((theme, {hoverEffects}, { bgText, textColor }) => ({
  root: {
    width: '100%',
    aspectRatio: '3 / 2', 
    padding: '3rem 2rem',
    position: 'relative',
    [`@media (max-width: 600px)`]: {
      display:"none",
    },
  },
  responsiveContainer:{
    display:"flex",
    flexDirection:"column",
    padding:"1rem",
    background:"black",
    height:"100%",
    [`@media (min-width: 600px)`]: {
      display:"none",
    },
  },
  overlay: {
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, .4)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0
  },

  info: {
    height: '100%',
    color: theme.white,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  titleContainer:{
    display:"flex",
    flexDirection:"row",
    margin:"0",
    padding:"0",
    background:"none",
    alignItems:"center"
  },

  title: {
    background:"none",
    fontFamily: 'ITC Avant Garde Gothic',
    fontWeight: 500,
    fontSize: '1.7rem',
    color: 'white',
    // backgroundColor: bgText,
    // boxShadow: `.5rem 0 0 ${bgText}, -.5rem 0 0 ${bgText}`,
    // boxDecorationBreak: 'clone',
    padding: '0 .2rem',
    // marginLeft: '.5rem'
  },

  text: {
    fontFamily: 'ITC Avant Garde Gothic',
    fontWeight: 400,
    fontSize: 16,
    display: 'inline',
    // backgroundColor: bgText,
    // boxShadow: `.5rem 0 0 ${bgText}, -.5rem 0 0 ${bgText}`,
    // boxDecorationBreak: 'clone',
    color: 'white',
    // lineHeight: 1,
    // marginLeft: '.5rem'
  },

  button: {
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontWeight: 700,
    fontSize: 13,
    color: 'black',
    borderRadius: '5px',
    padding: '1rem 1.5rem',
    transition: '.3s all ease-in-out',
    backgroundColor: 'white !important',

    '&:hover': {
      backgroundColor: '#FF8033',
      color: 'white'
    }
  },

  textBox: {
    width: '100%',
    height: '25vw',
    padding: '2rem 15%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  editButton: {
    background:"none",
    transition:"transform 0.2s",
    padding:"0",
    margin:"0 0.5rem",
    [`&:hover`]: {
        transform: !hoverEffects && "scale(1.1)",
        background: !hoverEffects && "none"
    }
},
form: {
  display:"flex",
  flexDirection:"row"
},
}))

const SectionCard = ({ id, updateText, setUpdateText, background, title, text, bgText, textColor, buttonText, hoverEffects }) => {

  const { classes } = useStyles({ bgText, textColor, hoverEffects });
/*   const logedUser = useSelector(state=> state.auth.userInfo)
  const dispatch = useDispatch()
  const publics = useSelector(state=>state.public.items)
  const titleContent = publics.length?publics.filter(title => title.name===`Box${id+1} Title`)[0].content:"" */

/*   useEffect(() => {
    dispatch(getPublics())
  }, [dispatch]) */
  
/*   const form = useForm({
    initialValues:{
      content:"",
      name:`Box${id+1} Title`
  },
  validate: {
    content: (value) => (value === "" ? 'Debes escribir algo para cambiar este texto' : null),
}
  }) */

/*   const handleTitleEdit = (e)=>{
    if(e.currentTarget.name==="edit"){
        setUpdateText(`Box${id+1} Title`)
    }else if(e.currentTarget.name==="ok"){
        dispatch(getPublics)
    }else{
        dispatch(getPublics)
        setUpdateText("")
    }
} */
  return (
    <Card sx={{height:"100%"}} mx={0} p={0} radius={5} style={{ backgroundColor: 'transparent' }}>
      <Box className={classes.responsiveContainer}>
        <>
              <div className={classes.overlay}/>
              <Box className={classes.info}>
                <div className={classes.titleContainer}>
                  <Title mb={0} className={classes.title}>{title}</Title>
                </div>
                <div>
                  <Text className={classes.text}>{text}</Text>
                </div>
                <div>
                  <UnstyledButton className={classes.button}>{buttonText}</UnstyledButton>
                </div>
              </Box>
            </>
      </Box>
      <BackgroundImage src={background} className={classes.root}>
        {title && text &&
        <>
          {background ? 
            <>
              <div className={classes.overlay}/>
              <Box className={classes.info}>
                <div className={classes.titleContainer}>
                  <Title mb={0} className={classes.title}>{title}</Title>

                  {/* {updateText!==`Box${id+1} Title`?
                <Title className={classes.title}>{titleContent}</Title>:
                <form className={classes.form} onSubmit={form.onSubmit(values => dispatch(updatePublic(values)))}>
                    <TextInput
                    placeholder={titleContent}
                    className={classes.titleInput}
                    {...form.getInputProps("content")}
                    />
                    <Button type="submit" name="ok" onClick={(e)=>handleTitleEdit(e)} className={classes.editButton}><Tick size={27}/></Button>
                    <Button name="back" onClick={(e)=>handleTitleEdit(e)} className={classes.editButton}><Cross size={27}/></Button>
                </form>} */}

                  {/* {logedUser?.admin && updateText!==`Box${id+1} Title`?
                  <Button name="edit" onClick={(e)=>handleTitleEdit(e)} className={classes.editButton}><Edit2Outline size={27}/></Button>:
                  ""} */}
                </div>
                <div>
                  <Text className={classes.text}>{text}</Text>
                </div>
                <div>
                  <UnstyledButton className={classes.button}>{buttonText}</UnstyledButton>
                </div>
              </Box>
            </>
            :
            <Box className={classes.info}>
                <div>
                  <Title mb={30} className={classes.title} style={{color: "black"}}>{title}</Title>
                  <Text className={classes.text} style={{color: "black"}}>{text}</Text>
                </div>
                <div>
                  <UnstyledButton className={classes.button} style={{color: "white", backgroundColor: "black"}}>{buttonText}</UnstyledButton>
                </div>
              </Box>
          }
        </>
        }
      </BackgroundImage>
    </Card>
  )
}

export default SectionCard