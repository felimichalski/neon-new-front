import { useEffect, useState } from 'react';
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    Box,
} from '@mantine/core';
import { ChevronExpand, ChevronDown, ChevronUp, Search, Trash3Fill } from '@styled-icons/bootstrap';
import { Edit2Outline } from '@styled-icons/evaicons-outline'
import ConfirmModal from './ConfirmModal.js';

const useStyles = createStyles((theme) => ({
    th: {
        padding: '0 !important',
    },

    control: {
        width: '100%',
        padding: `.5rem 1rem`,
    },

    sortable: {
        '&:hover': {
            backgroundColor: theme.colors.gray[1],
        },
    },

    icon: {
        width: 21,
        height: 21,
        borderRadius: 21,
    },

    actionButton: {
        cursor: 'pointer',
    },

    delete: {
        color: 'red',
    },

    edit: {
        color: '#FFC300',
        marginRight: '1rem'
    }
}));

function Th({ children, reversed, sorted, onSort, sortable = true }) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : ChevronExpand;
    return (
        <th className={classes.th}>
            {sortable ?
                <UnstyledButton onClick={onSort} className={[classes.control, classes.sortable]}>
                    <Group position="apart">
                        <Text fw={500} fz="sm">
                            {children}
                        </Text>
                        <Center className={classes.icon}>
                            <Icon size="0.9rem" stroke={1.5} />
                        </Center>
                    </Group>
                </UnstyledButton>
                :
                <Box className={classes.control}>
                    <Group position="apart">
                        <Text fw={500} fz="sm">
                            {children}
                        </Text>
                    </Group>
                </Box>
            }
        </th>
    );
}

function filterData(data, search) {
    const query = search.toLowerCase().trim();
    return data.filter((item) => item.title.toLowerCase().includes(query) || parseProductCategories(item.categories).toLowerCase().includes(query));
}

function sortData(
    data,
    payload
) {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    if (sortBy === 'categories') return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return parseProductCategories(b[sortBy]).localeCompare();
            }

            return parseProductCategories(a[sortBy]).localeCompare(parseProductCategories(b[sortBy]));
        }),
        payload.search
    );

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
}

const parseProductCategories = (categories) => {
    let categoryNames = [];
    for (const category of categories) {
        categoryNames.push(category.name)
    }
    return categoryNames.sort().join(", ")
}

const ProductsTable = () => {

    const { classes } = useStyles()

    const [data, setData] = useState([])

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const [confirmModalOpened, setConfirmModalOpened] = useState(false)
    const [productToDelete, setProductToDelete] = useState(undefined)

    const setSorting = (field) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const openConfirmModal = (product) => {
        setProductToDelete(product)
        setConfirmModalOpened(true)
    }

    const fetchProducts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        });

        const responseJson = await response.json()
        setData(responseJson)
        setSortedData(responseJson)
    }    

    useEffect(() => {    
        fetchProducts();
    }, [])

    return (
        <ScrollArea>
            <TextInput
                placeholder="Busque por nombre o categoría"
                mb="md"
                icon={<Search size="0.9rem" stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <Th
                            sorted={sortBy === 'title'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('title')}
                        >
                            Nombre
                        </Th>
                        <Th
                            sorted={sortBy === 'categories'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('categories')}
                        >
                            Categorías
                        </Th>
                        <Th
                            sortable={false}
                        >
                            Acciones
                        </Th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.length > 0 ? (
                        sortedData.map((product) => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{parseProductCategories(product.categories)}</td>
                                <td>
                                    <Edit2Outline size={20} className={[classes.actionButton, classes.edit]} />
                                    <Trash3Fill onClick={() => openConfirmModal(product)} size={20} className={[classes.actionButton, classes.delete]} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>
                                <Text weight={500} align="center">
                                    Nothing found
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <ConfirmModal opened={confirmModalOpened} setOpened={setConfirmModalOpened} product={productToDelete} reloadProducts={fetchProducts}/>
        </ScrollArea>
    );
}

export default ProductsTable;