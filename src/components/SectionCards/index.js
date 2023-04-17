import { Container, createStyles, Grid } from '@mantine/core'
import SectionCard from './SectionCard'

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    padding: '0 1rem',
  }
}))

const SectionCards = ({ data }) => {

  const { classes } = useStyles();

  return (
    <Container fluid className={classes.root}>
      <Grid mx={1} gutter='md'>
        {data.map(({background, title, text, bgText, textColor, buttonText, type}, key) => (
          <Grid.Col span={6} key={key}>
            <SectionCard background={background} title={title} text={text} bgText={bgText} textColor={textColor} buttonText={buttonText} type={type} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  )
}

export default SectionCards