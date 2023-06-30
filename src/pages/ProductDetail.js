import PDContainer from "../components/PDContainer"
import PDDesc from "../components/PDDesc"
import { Box } from "@mantine/core"
import FeaturedProducts from "../components/FeaturedProducts"

const ProductDetail = ()=>{
    return(
        <Box sx={{background:"#DDDDDD"}}>
            <PDContainer/>
            <PDDesc/>
            <Box sx={{padding:"3rem 0"}}>
                <FeaturedProducts/>
            </Box>
        </Box>
    )
}
export default ProductDetail