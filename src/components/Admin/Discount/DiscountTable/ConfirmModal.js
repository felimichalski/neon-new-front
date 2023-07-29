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

const ConfirmModal = ({opened, setOpened, discount, reloadDiscounts}) => {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false)

    const deleteDiscount = async () => {
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/discount/${discount.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'DELETE'
        });
        
        if (response.status !== 200) {
            toast.error("El descuento no pudo ser eliminado", {
              position: "bottom-right",
            });
        }

        toast.success("Descuento Eliminado", {
            position: "bottom-right",
        });

        reloadDiscounts();
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
            {discount &&
            <>
                <Title align="center" order={2} mb={50}>¿Desea eliminar el código {discount.code}?</Title>
                <Group position="apart">
                    <Button onClick={() => setOpened(false)} className={classes.cancel}>Cancelar</Button>
                    <Button onClick={() => deleteDiscount()} className={classes.confirm}>{loading ? <Loader size="sm"/> : 'Confirmar'}</Button>
                </Group>
            </>}
        </Modal>
    )
}

export default ConfirmModal