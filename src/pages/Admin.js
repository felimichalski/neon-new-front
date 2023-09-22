import { useDocumentTitle } from '@mantine/hooks';
import { Grid } from '@mantine/core'
import { motion } from 'framer-motion';

import Sidebar from "../components/Admin/Sidebar";
import { Outlet } from "react-router-dom";

const Admin = () => {
    useDocumentTitle("Neon Infinito - Panel de administrador")    
    return(
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
            <Grid mx={1} columns={24}>
                <Grid.Col p={0} span={5} style={{position: 'relative'}}>
                    <Sidebar />
                </Grid.Col>

                <Grid.Col p={32} span={19}>
                    <Outlet />
                </Grid.Col>
            </Grid>
        </motion.div>
    )
}
export default Admin