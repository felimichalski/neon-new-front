import { Pagination, Box, Breadcrumbs, Container, Divider, Grid, Select, Title, createStyles, TextInput, Menu, Button } from "@mantine/core"
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { FilterRight } from "@styled-icons/bootstrap/FilterRight"
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
        alignItems: 'flex-end',
        [`@media (max-width: 600px)`]: {
            width:"100%",
            /* background:"aqua", */
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"
          }
    },
    categoriesTitle:{
        [`@media (max-width: 600px)`]: {
            width:"100%",
            fontSize:"2.5rem",
            textAlign:"center",
            margin:"1.5rem 0"
          },
    },
    filter: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    inputBox: {
        width:"100%",
        display:"flex",
        alignItems:"flex-end",
        justifyContent:"flex-end",
        margin:"0.5rem",
        [`@media (max-width: 600px)`]: {
            justifyContent:"center",
          }
    },
    paginationBox:{
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-end"
    }
}))

const Category = () => {
    // const [typeName, setTypeName] = useState(undefined)
    // const [categoryName, setCategoryName] = useState(undefined)
    const [products, setProducts] = useState([])
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [selectValue, setSelectValue] = useState('date')
    const [page, setPage] = useState(1);
    const { type, category } = useParams();
    const { classes } = useStyles();

    const loadProducts = useCallback(async () => {
        let endpoint;
        if(!type) {
            endpoint = `${process.env.REACT_APP_API_URL}/products`
        } else if(!category) {
            endpoint = `${process.env.REACT_APP_API_URL}/products/filter/${type}`
        } else {
            endpoint = `${process.env.REACT_APP_API_URL}/products/filter/${type}/${category}`
        }

        const response = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        });

        const data = await response.json()
        setProducts(data)
    }, [type, category])

    
    useEffect(() => {
        const getBreadcrumbs = async () => {
            if(!type) {
                setBreadcrumbs(["Todos los productos"])
            } else if (!category) {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/types/${type}`, {
                    mode: 'cors',
                });

                const { name } = await response.json()
                setBreadcrumbs(name);
            } else {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/${category}`, {
                    mode: 'cors',
                });

                const { name, type } = await response.json()
                setBreadcrumbs([type.name, name]);
            }
        }
        getBreadcrumbs();
        loadProducts();
    }, [loadProducts, type, category])

    return (
        <Container sx={{height:"180vh",[`@media (max-width: 600px)`]: {
            /* height:"95vh", */
            height:"auto"
          },}} fluid m={0} p={20}>
            <Breadcrumbs classNames={{
                breadcrumb: classes.breadcrumbs,
                separator: classes.breadcrumbs
            }}>
                {breadcrumbs}
            </Breadcrumbs>
            <Grid m={1} sx={{[`@media (max-width: 600px)`]: {
                        display:"flex",
                        width:"100%",
                        /* background:"aqua", */
                        alignItems:"center",
                        justifyContent:"center",
                        padding:"0"
                      },}} columns={24}>
                <Grid.Col span={6} sx={{[`@media (max-width: 600px)`]: {
                        display:"none",
                        width:"100%"
                      },}}>

                </Grid.Col>
                <Grid.Col sx={{[`@media (max-width: 600px)`]: {
                        width:"100%",
                        /* background:"black", */
                        margin:"0"
                      },}} span={17} offset={1}>
                    <Box  className={classes.tableHeader}>
                        <Title className={classes.categoriesTitle}>
                            {/* {category ? 
                                isType ?
                                    id === 1 ? 'Neones de diseño' : id === 2 ? 'Artístico' : 'Algo distinto'
                                :
                                    category.name
                            : 
                                'Todos los productos'} */}
                        </Title>
                        <Box className={classes.filter}>
                            <Box>
                                <Select sx={{[`@media (max-width: 600px)`]: {
                                    display:"none"
                                    },}}
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
            <Box className={classes.inputBox}>
                
                <TextInput sx={{  width:"70%", marginRight:"1rem"}}
                    placeholder="Buscá tu diseño en esta categoría..."
                />
                <Menu sx={{[`@media (min-width: 600px)`]: {
                                    display:"none"
                                    },}}>
                    <Menu.Target>
                        <Button>
                            <FilterRight size={20}/>
                        </Button>
                    </Menu.Target>
                    {/* <Menu.Item>Más nuevos</Menu.Item>
                    <Menu.Item>Precio (mayor a menor)</Menu.Item>
                    <Menu.Item>Precio (menor a mayor)</Menu.Item>
                    <Menu.Item>Nombre (A a Z)</Menu.Item>
                    <Menu.Item>Nombre (Z a A)</Menu.Item> */}
                </Menu>
            </Box>
            <Box sx={{width:"100%",[`@media (min-width: 600px)`]: {
            display:"none",
            }}}>
                {products &&
                <ProductsSection products={products} page={page} />
                }
            </Box>
            <Grid sx={{[`@media (max-width: 600px)`]: {
                        display:"none",
                      },}} m={1} columns={24}>
                <Grid.Col sx={{[`@media (max-width: 600px)`]: {
                        display:"none",
                      },}} span={6}>
                    <CategoriesSection />
                </Grid.Col>
                <Grid.Col span={17} offset={1}>
                    <ProductsSection products={products} page={page} />
                </Grid.Col>
            </Grid>
            <Box className={classes.paginationBox}>
                <Pagination sx={{width:"41%", [`@media (max-width: 600px)`]: {
                        width:"100%",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center"
                      },}} total={products.length?Math.ceil(products.length/6):1} value={page} onChange={setPage}/>
            </Box>
        </Container>
    )
}

export default Category