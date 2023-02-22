import { Box } from "@mantine/core"
import SectionCards from "../components/SectionCards"
import TitleBox from "../components/TitleBox"

const Home = () => {
  return (
    <Box fluid style={{ backgroundColor: '#F3F4F4'}}>
        <TitleBox />
        <SectionCards />
    </Box>
  )
}

export default Home