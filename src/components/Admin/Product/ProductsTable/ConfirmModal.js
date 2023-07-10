import { Button, Group, Loader, Modal, Title, createStyles } from "@mantine/core"
import { useState } from "react";
import { toast } from "react-toastify";

const useStyles = createStyles((theme) => ({
    cancel: {
        backgroundColor: "gray",

        '&:hover': {
            backgroundColor: "gray",
        }
    },


    confirm: {
        backgroundColor: "red",

        '&:hover': {
            backgroundColor: "red",
        }
    }
}));

const ConfirmModal = ({opened, setOpened, product, reloadProducts}) => {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false)

    const deleteProduct = async () => {
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${product.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'DELETE'
        });
        
        if (response.status !== 200) {
            toast.error("El producto no pudo ser eliminado", {
              position: "bottom-right",
            });
        }

        toast.success("Producto Eliminado", {
            position: "bottom-right",
        });

        reloadProducts();
        setOpened(false)
        setLoading(false)
    }
    
    return (
        <Modal
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            zIndex={1000}
        >
            {product &&
            <>
                <Title align="center" order={2} mb={50}>¿Desea eliminar el producto {product.title}?</Title>
                <Group position="apart">
                    <Button onClick={() => setOpened(false)} className={classes.cancel}>Cancelar</Button>
                    <Button onClick={() => deleteProduct()} className={classes.confirm}>{loading ? <Loader size="sm"/> : 'Confirmar'}</Button>
                </Group>
            </>}
        </Modal>
    )
}

export default ConfirmModal