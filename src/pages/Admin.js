import AdminBar from "../components/AdminBar"
import CreateProduct from "../components/CreateProduct";
import { useDocumentTitle } from '@mantine/hooks';
import { Box, Container, createStyles, MultiSelect, TextInput, InputBase, Flex, Image, Button, NumberInput } from '@mantine/core'
import { motion } from 'framer-motion';

import { useState } from "react";


const Admin = () => {
    useDocumentTitle("Neon Infinito - Panel de administrador")
    const [selected, setSelected] = useState("create")
    
    return(
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
            <Container fluid sx={{width:"100%"}}>
                <AdminBar/>
                {selected === "create"?<CreateProduct/>:""}
                   
            </Container>
        </motion.div>
    )
}
export default Admin