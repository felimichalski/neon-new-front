import { Box } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import FeaturedProducts from "../components/FeaturedProducts"
import SectionCards from "../components/SectionCards"
import TitleBox from "../components/TitleBox"
import IconsHome from "../components/IconsHome"

// import bg1 from '../assets/section-cards/bg1.jpg'
import bg2 from '../assets/section-cards/bg2.jpg'
// import bg3 from '../assets/section-cards/bg3.jpg'
import bg4 from '../assets/section-cards/bg4.jpg'
import CustomDivider from "../components/CustomDivider"

import { motion } from 'framer-motion'
import { useState } from "react"

const mock1 = [
  {
    background: bg4,
    title: 'Alquilá tu cartel',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque commodi sapiente provident cum tempora eius harum ad omnis est? Minima.',
    bgText: 'white',
    textColor: 'black',
    buttonText: 'Boton texto 2',
    type: 'card'
  },
  {
    background: bg2,
    title: 'Creá un diseño propio',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque commodi sapiente provident cum tempora eius harum ad omnis est? Minima.',
    bgText: 'black',
    textColor: 'white',
    buttonText: 'Texto 1',
    type: 'card'
  },
]

// const mock2 = [
//   {
//     background: bg1,
//     type: 'card'
//   },
//   {
//     title: 'Nuestros destacados',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque commodi sapiente provident cum tempora eius harum ad omnis est? Minima.',
//     bgText: 'white',
//     textColor: 'black',
//     buttonText: 'Boton de texto 2',
//     type: 'text'
//   }
// ]

const Home = () => {
  const [updateText, setUpdateText] = useState("")
  useDocumentTitle('Neon infinito - Inicio')
  
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <Box style={{ backgroundColor: 'white'}}>
          <TitleBox updateText={updateText} setUpdateText={setUpdateText}/>
          <CustomDivider />
          <SectionCards data={mock1} updateText={updateText} setUpdateText={setUpdateText}/>
          <CustomDivider />
          <IconsHome/>
          <CustomDivider />
          <FeaturedProducts />
          <CustomDivider />
          {/* <SectionCards data={mock2}/>
          <CustomDivider /> */}
      </Box>
    </motion.div>
  )
}

export default Home