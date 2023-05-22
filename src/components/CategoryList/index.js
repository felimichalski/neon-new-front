import React, { useEffect, useState } from "react";
import { Box, Container, Menu, Title } from '@mantine/core';
import { Link } from "react-router-dom";
import { ChevronRight } from '@styled-icons/entypo'

import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    column: {
        padding: 10,
        color: 'white',

        '&:nth-of-type(1)': {
            width: '50%',
            backgroundColor: '#5c84ac'
        },

        '&:nth-of-type(2)': {
            width: '50%',
            backgroundColor: '#0d4c9b'
        },

        '&:nth-of-type(3)': {
            width: '50%',
            backgroundColor: '#15244c'
        }
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

const CategoryList = ({ categories }) => {
    const { classes } = useStyles();

    return (
        <Container fluid display='flex' m={0} p={0}>
            <Box className={classes.column}>
                <Box mb={15} display='flex' style={{ justifyContent: 'space-between' }}>
                    <Title style={{ width: '100%' }} >Neones de diseño</Title>
                    <Menu.Item className={[classes.item, classes.customItem]}>
                        <Link style={{textDecoration: 'none', color: 'rgba(255, 255, 255, .3)'}} to='/categories'>Ver todo</Link>
                    </Menu.Item>
                </Box>
                <Box display='flex'>
                    {categories.type1.map((categoryGroup, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            {categoryGroup.map((category, index) => (
                                <Link to={`categories/${category.id}`} className={classes.link} key={index}>
                                    <Menu.Item icon={<ChevronRight size={16} />} key={index} className={classes.item}>
                                        {category.name}
                                    </Menu.Item>
                                </Link>
                            ))}
                        </div>
                    ))}
                </Box>
            </Box>
            <Box className={classes.column}>
                <Title style={{ width: '100%' }} mb={15}>Artístico</Title>
            </Box>
            {/* <Box className={classes.column}>
                <Title style={{ width: '100%' }} mb={15}>Algo distinto</Title>
                <Box display='flex'>
                    {categories.type3.map((categoryGroup, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            {categoryGroup.map((category, index) => (
                                <Link to={`categories/${category.id}`} className={classes.link} key={index}>
                                    <Menu.Item icon={<ChevronRight size={16} />} key={index} className={classes.item}>
                                        {category.name}
                                    </Menu.Item>
                                </Link>
                            ))}
                        </div>
                    ))}
                </Box>
            </Box> */}
        </Container>
    );
};

export default CategoryList;