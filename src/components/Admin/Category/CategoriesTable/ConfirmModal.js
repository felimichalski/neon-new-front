import { Button, Group, Loader, Modal, Title, createStyles } from "@mantine/core"
import { useState } from "react";
import { toast } from "react-toastify";

const useStyles = createStyles((theme) => ({
    cancel: {
        backgroundColor: "gray !important",
    },


    confirm: {
        backgroundColor: "red !important",
    }
}));

const ConfirmModal = ({opened, setOpened, category, reloadCategories}) => {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false)

    const deleteCategory = async () => {
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/${category.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'DELETE'
        });
        
        if (response.status !== 200) {
            toast.error("La categoría no pudo ser eliminada", {
              position: "bottom-right",
            });
        }

        toast.success("Categoría eliminada", {
            position: "bottom-right",
        });

        reloadCategories();
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
            {category &&
            <>
                <Title align="center" order={2} mb={50}>¿Desea eliminar la categoría {category.title}? Se eliminaran todos los productos de esta categoría</Title>
                <Group position="apart">
                    <Button onClick={() => setOpened(false)} className={classes.cancel}>Cancelar</Button>
                    <Button onClick={() => deleteCategory()} className={classes.confirm}>{loading ? <Loader size="sm"/> : 'Confirmar'}</Button>
                </Group>
            </>}
        </Modal>
    )
}

export default ConfirmModal