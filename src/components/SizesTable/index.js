import { createStyles, Table, ScrollArea } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    light: {
        backgroundColor: theme.colors.gray[1]
    },

    dark: {
        backgroundColor: theme.colors.gray[2]
    },
}));

const SizesTable = ({ product }) => {
    const { classes } = useStyles();

    return (
        <ScrollArea>
            <Table verticalSpacing="md">
                <thead>
                    <tr>
                        <th className={classes.light}>Pequeño (S)</th>
                        <th className={classes.dark}>Mediano (M)</th>
                        <th className={classes.light}>Grande (L)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={product.id}>
                        <td className={classes.light}>
                            {product.size.small_width} x {product.size.small_height} cm
                        </td>
                        <td className={classes.dark}>
                            {product.size.medium_width} x {product.size.medium_height} cm
                        </td>
                        <td className={classes.light}>
                            {product.size.large_width} x {product.size.large_height} cm
                        </td>
                    </tr>
                </tbody>
            </Table>
        </ScrollArea>
    );
}

export default SizesTable;