import { Container, createStyles, Grid } from '@mantine/core'
import SectionCard from './SectionCard'

import bg1 from '../../assets/section-cards/bg1.webp'
import bg2 from '../../assets/section-cards/bg2.webp'
import bg3 from '../../assets/section-cards/bg3.webp'

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    padding: '32px'
  }
}))

const mockInfo = [
  {
    background: bg1,
    title: 'Creá un diseño propio',
    text: 'Text 1'
  },
  {
    background: bg2,
    title: 'Nuestros destacados',
    text: 'Text 2'
  },
  {
    background: bg3,
    title: 'Alquilá tu cartel',
    text: 'Text 3'
  }
]

const SectionCards = () => {

  const { classes } = useStyles();

  return (
    <Container fluid className={classes.root}>
      <Grid mx={1} gutter='xl'>
        {mockInfo.map(({background, title, text}) => (
          <Grid.Col span={4}>
            <SectionCard background={background} title={title} text={text} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  )
}

export default SectionCards