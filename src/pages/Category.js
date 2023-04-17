import { Box, Breadcrumbs, Container, Divider, Grid, Select, Title, createStyles } from "@mantine/core"
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { ChevronDown } from '@styled-icons/entypo'
import ProductsSection from "../components/ProductsSection";
import CategoriesSection from "../components/CategoriesSection";

const useStyles = createStyles((theme) => ({
    breadcrumbs: {
        color: theme.colors.gray[5],
        fontWeight: 500
    },

    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },

    filter: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}))

const Category = () => {

    const [category, setCategory] = useState(undefined)
    const [products, setProducts] = useState([])
    const [selectValue, setSelectValue] = useState('date')
    let { id } = useParams();
    id = parseInt(id);
    const { classes } = useStyles();
    const location = useLocation();
    const isType = location.pathname.includes('type')

    const loadProducts = useCallback(async () => {
        let endpoint;
        isType ? endpoint = `${process.env.REACT_APP_API_URL}/products/type/${id}` : endpoint = `${process.env.REACT_APP_API_URL}/products/category/${id}`;
        
        if (id) {
            const response = await fetch(endpoint, {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
            });

            const data = await response.json()
            setProducts(data[0])
        } else {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
            });

            const data = await response.json()
            setProducts(data)
        }
    }, [id, isType])

    useEffect(() => {
        const getCategory = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            })
            const data = await response.json();
            setCategory(data);
        }

        (id) && getCategory();
        loadProducts();
    }, [id, loadProducts])

    return (
        <Container fluid m={0} p={20}>
            <Breadcrumbs classNames={{
                breadcrumb: classes.breadcrumbs,
                separator: classes.breadcrumbs
            }}>{category ?
                    isType ?
                        ['Categorías', id === 1 ? 'Neones de diseño' : id === 2 ? 'Artístico' : 'Algo distinto']
                    :
                        ['Categorías', id === 1 ? 'Neones de diseño' : id === 2 ? 'Artístico' : 'Algo distinto', category.name]
                : 
                    ['Categorías', 'Todos los productos']}
            </Breadcrumbs>
            <Grid m={1} columns={24}>
                <Grid.Col span={6}></Grid.Col>
                <Grid.Col span={17} offset={1}>
                    <Box className={classes.tableHeader}>
                        <Title>
                            {category ? 
                                isType ?
                                    id === 1 ? 'Neones de diseño' : id === 2 ? 'Artístico' : 'Algo distinto'
                                :
                                    category.name
                            : 
                                'Todos los productos'}
                        </Title>
                        <Box className={classes.filter}>
                            <Box>
                                <Select
                                    label="Ordenar por"
                                    data={[
                                        { value: 'date', label: 'Más nuevos' },
                                        { value: 'pricehtl', label: 'Precio (mayor a menor)' },
                                        { value: 'pricelth', label: 'Precio (menor a mayor)' },
                                        { value: 'nameatz', label: 'Nombre (A a Z)' },
                                        { value: 'namezta', label: 'Nombre (Z a A)' },
                                    ]}
                                    value={selectValue}
                                    rightSection={<ChevronDown size={16} />}
                                    styles={{ rightSection: { pointerEvents: 'none' } }}
                                    onChange={(val) => {
                                        setSelectValue(val)
                                        loadProducts()
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Divider my='md' />
                </Grid.Col>
            </Grid>
            <Grid m={1} columns={24}>
                <Grid.Col span={6}>
                    <CategoriesSection />
                </Grid.Col>
                <Grid.Col span={17} offset={1}>
                    <ProductsSection products={products} />
                </Grid.Col>
            </Grid>
        </Container>
    )
}

export default Category