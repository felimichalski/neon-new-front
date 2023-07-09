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
import ConfirmModal from './ConfirmModal';

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
    return data.filter((item) => item.code.toLowerCase().includes(query));
}

function sortData(
    data,
    payload
) {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    if(typeof data[0][sortBy] === 'number') return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy] - a[sortBy]
            }
            return a[sortBy] - b[sortBy]
        }),
        payload.search
    )

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

const DiscountTable = () => {

    const { classes } = useStyles()

    const [data, setData] = useState([])

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const [confirmModalOpened, setConfirmModalOpened] = useState(false)
    const [discountToDelete, setDiscountToDelete] = useState(undefined)

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

    const openConfirmModal = (discount) => {
        setDiscountToDelete(discount)
        setConfirmModalOpened(true)
    }

    const fetchDiscounts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/discount`, {
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
        fetchDiscounts();
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
                            sorted={sortBy === 'code'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('code')}
                        >
                            Código
                        </Th>
                        <Th
                            sorted={sortBy === 'type'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('type')}
                        >
                            Tipo
                        </Th>
                        <Th
                            sorted={sortBy === 'value'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('value')}
                        >
                            Valor
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
                        sortedData.map((discount) => (
                            <tr key={discount.id}>
                                <td>{discount.code}</td>
                                <td>{discount.type === 'percentage' ? 'Porcentaje' : 'Precio'}</td>
                                <td>{discount.value}</td>
                                <td>
                                    <Edit2Outline size={20} className={[classes.actionButton, classes.edit]} />
                                    <Trash3Fill onClick={() => openConfirmModal(discount)} size={20} className={[classes.actionButton, classes.delete]} />
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
            <ConfirmModal opened={confirmModalOpened} setOpened={setConfirmModalOpened} discount={discountToDelete} reloadDiscounts={fetchDiscounts}/>
        </ScrollArea>
    );
}

export default DiscountTable;