import { Box, Container, Grid, Menu, Title } from '@mantine/core';
import { Link } from "react-router-dom";
import { ChevronRight } from '@styled-icons/entypo'

import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    column: {
        padding: 10,
        color: 'white',
        width: '100%',

        '&:nth-of-type(1)': {
            backgroundColor: '#5c84ac'
        },

        '&:nth-of-type(2)': {
            backgroundColor: '#0d4c9b'
        },
    },

    item: {
        backgroundColor: 'transparent !important',
        color: 'white',
        fontFamily: 'ITC Avant Garde Gothic',

        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, .2) !important'
        }
    },

    customItem: {
        width: 'fit-content',
        color: theme.colors.gray[3],
        whiteSpace: 'nowrap',

        '&:hover': {
            backgroundColor: 'transparent !important'
        }
    },

    link: {
        textDecoration: 'none',
        marginBottom: 10,
    }
}));

const CategoryList = ({ types }) => {
    const { classes } = useStyles();

    return (
        <Container fluid display='flex' m={0} p={0} zIndex={10}>
            {types && types.map((type, key) => (
                <Box className={classes.column} key={key}>
                    <Box mb={15} display='flex' style={{ justifyContent: 'space-between' }}>
                        <Title style={{ width: '100%' }} >{type.name}</Title>
                        <Menu.Item className={[classes.item, classes.customItem]}>
                            <Link style={{textDecoration: 'none', color: 'rgba(255, 255, 255, .3)'}} to={`/categories/${type.id}`}>Ver todo</Link>
                        </Menu.Item>
                    </Box>
                    <Grid m={1}>
                        {type.categories.length > 0 && type.categories.map((category, index) => (
                            <Grid.Col span={4} key={index}>
                                <Link to={`/categories/${type.id}/${category.id}`} className={classes.link}>
                                    <Menu.Item icon={<ChevronRight size={16} />} className={classes.item}>
                                        {category.name}
                                    </Menu.Item>
                                </Link>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Container>
    );
};

export default CategoryList;