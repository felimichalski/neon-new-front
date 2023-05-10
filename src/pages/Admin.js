import AdminBar from "../components/AdminBar"
import { useDocumentTitle } from '@mantine/hooks';
import { Box, Container, createStyles, MultiSelect, TextInput, InputBase, Flex, Image, Button, NumberInput } from '@mantine/core'
import { motion } from 'framer-motion';
import CreateProduct from "../components/CreateProduct";


const Admin = () => {
    useDocumentTitle("Neon Infinito - Panel de administrador")

    return(
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
            <Container fluid sx={{height:"100vh", width:"100%"}}>
                <AdminBar/>
                <CreateProduct/>    
            </Container>
        </motion.div>
    )
}
export default Admin