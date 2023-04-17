import { Box, List, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CategoriesSection = () => {

    const [categories, setCategories] = useState(undefined)

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/types`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            })

            const data = await response.json()
            setCategories(data);
        }
        fetchCategories()
    }, [])

    if(!categories) return;

    return (
        <Box>
            <Title mb={20}>Categorías</Title>
            <List
                listStyleType='none'
            >
                <List.Item>
                    <Link style={{textDecoration: 'none', color: 'gray'}} to='/categories/type/1'>Neones de diseño</Link>
                </List.Item>
                <List
                withPadding
                listStyleType='none'
                mb={20}
                >
                    {categories.firstType.map((category) => (
                        <List.Item my={5}>
                            <Link style={{textDecoration: 'none', color: 'gray'}} to={`/categories/${category.id}`}>{category.name}</Link>
                        </List.Item>
                    ))}
                </List>
                <List.Item>
                    <Link style={{textDecoration: 'none', color: 'gray'}} to='/categories/type/2'>Artístico</Link>
                </List.Item>
                <List
                withPadding
                listStyleType='none'
                mb={20}
                >
                    {categories.secondType.map((category) => (
                        <List.Item my={5}>
                            <Link style={{textDecoration: 'none', color: 'gray'}} to={`/categories/${category.id}`}>{category.name}</Link>
                        </List.Item>
                    ))}
                </List>
                <List.Item>
                    <Link style={{textDecoration: 'none', color: 'gray'}} to='/categories/type/3'>Algo distinto</Link>
                </List.Item>
                <List
                withPadding
                listStyleType='none'
                mb={20}
                >
                    {categories.thirdType.map((category) => (
                        <List.Item my={5}>
                            <Link style={{textDecoration: 'none', color: 'gray'}} to={`/categories/${category.id}`}>{category.name}</Link>
                        </List.Item>
                    ))}
                </List>
            </List>
        </Box>
    )
}

export default CategoriesSection