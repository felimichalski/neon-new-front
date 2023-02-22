import { BackgroundImage, Box, Card, Center, createStyles, Text, Title } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    height: '0',
    padding: '2rem',
    position: 'relative',
    paddingBottom: '100%',
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
    zIndex: 2,
    color: theme.white,
    position: 'relative',
  },
  
  title: {
    fontFamily: 'Gotham',
    fontWeight: 400
  },

  text: {
    whiteSpace: 'nowrap',
    textOverflow:'ellipsis',
    overflow: 'hidden'
  }
}))

const SectionCard = ({ background, title, text }) => {

  const { classes } = useStyles();

  return (
    <Card m={0} p={0}>
      <BackgroundImage src={background} className={classes.root}>
        <div className={classes.overlay}/>
        <Box className={classes.info}>
          <Center>
            <Title align="center" className={classes.title}>{title}</Title>
          </Center>
          <Text className={classes.text}>{text}</Text>
        </Box>
      </BackgroundImage>
    </Card>
  )
}

export default SectionCard