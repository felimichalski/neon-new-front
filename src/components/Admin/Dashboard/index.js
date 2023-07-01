import { Box, Container, Grid, SimpleGrid, createStyles } from '@mantine/core';

const useStyles = createStyles((theme, { primaryColHeight }) => ({
  container: {
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.gray[2]
  },

  big: {
    height: primaryColHeight + theme.spacing.md
  },

  small: {
    height: primaryColHeight / 2
  }
}));

const Dashboard = () => {
  const { classes } = useStyles({ primaryColHeight: 300 })

  return (
    <Container my="md">
      <SimpleGrid cols={2} spacing="md" mb="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Box className={[classes.container, classes.big]} />
        <Grid gutter="md">
          <Grid.Col>
            <Box className={[classes.container, classes.small]} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className={[classes.container, classes.small]} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className={[classes.container, classes.small]} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
      <SimpleGrid cols={2} spacing="md" mb="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Grid gutter="md">
          <Grid.Col>
            <Box className={[classes.container, classes.small]} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className={[classes.container, classes.small]} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className={[classes.container, classes.small]} />
          </Grid.Col>
        </Grid>
        <Box className={[classes.container, classes.big]} />
      </SimpleGrid>
    </Container>
  );
}

export default Dashboard;