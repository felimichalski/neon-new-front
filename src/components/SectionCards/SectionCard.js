import { BackgroundImage, Box, Card, createStyles, Text, Title, UnstyledButton } from "@mantine/core"

const useStyles = createStyles((theme, { bgText, textColor }) => ({
  root: {
    width: '100%',
    aspectRatio: '3 / 2', 
    padding: '3rem 2rem',
    position: 'relative',
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
  
  title: {
    fontFamily: 'ITC Avant Garde Gothic',
    fontWeight: 500,
    fontSize: '1.7rem',
    color: 'white',
    // backgroundColor: bgText,
    // boxShadow: `.5rem 0 0 ${bgText}, -.5rem 0 0 ${bgText}`,
    // boxDecorationBreak: 'clone',
    padding: '0 .2rem',
    width: 'max-content',
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
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '5px',
    padding: '1rem 1.5rem',
    transition: '.3s all ease-in-out',

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
  }
}))

const SectionCard = ({ background, title, text, bgText, textColor, buttonText }) => {

  const { classes } = useStyles({ bgText, textColor });

  return (
    <Card mx={0} p={0} radius={5} style={{ backgroundColor: 'transparent' }}>
      <BackgroundImage src={background} className={classes.root}>
        {title && text &&
        <>
          {background ? 
            <>
              <div className={classes.overlay}/>
              <Box className={classes.info}>
                <div>
                  <Title mb={30} className={classes.title}>{title}</Title>
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