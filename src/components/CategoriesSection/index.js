import { Box, List, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CategoriesSection = () => {

    const [types, setTypes] = useState(undefined)

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/types/all`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            })

            const data = await response.json()
            setTypes(data)
        }
        fetchCategories()
    }, [])

    if (!types) return;

    return (
        <Box sx={{
            [`@media (max-width: 600px)`]: {
                display: "none",
            },
        }}>
            <Title mb={20}>Categorías</Title>
            <List
                listStyleType='none'
            >
                {types.map((type, key) => (
                    <>
                        <List.Item key={key}>
                            <Link style={{ textDecoration: 'none', color: 'gray' }} to={`/categories/${type.id}`}>{type.name}</Link>
                        </List.Item>
                        <List
                            withPadding
                            listStyleType='none'
                            mb={20}
                        >
                            {type.categories.length > 0 && type.categories.map((category) => (
                                <List.Item key={category.id} my={5}>
                                    <Link key={category.id} style={{ textDecoration: 'none', color: 'gray' }} to={`/categories/${type.id}/${category.id}`}>{category.name}</Link>
                                </List.Item>
                            ))}
                        </List>
                    </>
                ))}
            </List>
        </Box>
    )
}

export default CategoriesSection