import { Container, createStyles, Grid, Box } from '@mantine/core'
import SectionCard from './SectionCard'
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    width: '100%',
    padding: '0 1rem',
  },
  gridContainer:{
    [`@media (max-width: 600px)`]: {
      /* display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      background:"black",
      width:"100vw" */
      display:"none"
    },
  },
  flexContainer:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    [`@media (min-width: 600px)`]: {
      display:"none",
    },
  },
  flexItem:{
    margin:"1rem 0",
    height:"20rem"
  }
}))

const SectionCards = ({ data, updateText, setUpdateText }) => {

  const { classes } = useStyles();

  return (
    <Container fluid className={classes.root}>
      <Box className={classes.flexContainer}>
      {data.map(({background, title, text, bgText, textColor, buttonText, type, link}, key) => (
          <Box className={classes.flexItem} key={key}>
            <SectionCard id={key} updateText={updateText} setUpdateText={setUpdateText} background={background} title={title} text={text} bgText={bgText} textColor={textColor} buttonText={buttonText} type={type} link={link}/>
          </Box>
        ))}
      </Box>
      <Grid mx={1} gutter='md' className={classes.gridContainer}>
        {data.map(({background, title, text, bgText, textColor, buttonText, type, link}, key) => (
          <Grid.Col span={6} key={key} className={classes.gridItem}>
            <SectionCard id={key} updateText={updateText} setUpdateText={setUpdateText} background={background} title={title} text={text} bgText={bgText} textColor={textColor} buttonText={buttonText} type={type} link={link}/>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  )
}

export default SectionCards