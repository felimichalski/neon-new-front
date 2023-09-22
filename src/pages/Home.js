import { Box } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import SectionCards from "../components/SectionCards"
import TitleBox from "../components/TitleBox"
import IconsHome from "../components/IconsHome"
import { useEffect } from 'react'


// import bg1 from '../assets/section-cards/bg1.jpg'
import bg2 from '../assets/section-cards/bg2.jpg'
// import bg3 from '../assets/section-cards/bg3.jpg'
import bg4 from '../assets/section-cards/bg4.jpg'
import CustomDivider from "../components/CustomDivider"

import { motion } from 'framer-motion'
import { useState } from "react"
import LogosBar from "../components/LogosBar"
import FeaturedProducts from "../components/FeaturedProducts/new"
import generateAccessToken from "../utils/generateAccessToken"

const mock1 = [
  {
    background: bg4,
    title: 'Conseguí tu neón',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque commodi sapiente provident cum tempora eius harum ad omnis est? Minima.',
    bgText: 'black',
    textColor: 'white',
    buttonText: 'Texto 1',
    type: 'card',
    link: '/categories'
  },
  {
    background: bg2,
    title: 'Creá un diseño propio',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque commodi sapiente provident cum tempora eius harum ad omnis est? Minima.',
    bgText: 'black',
    textColor: 'white',
    buttonText: 'Texto 1',
    type: 'card',
    link: '/custom'
  } 
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

/* <script async src="//www.instagram.com/embed.js"></script> */

const Home = () => {
  const [updateText, setUpdateText] = useState("")
  useDocumentTitle('Neon infinito - Inicio')

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <Box style={{ backgroundColor: 'white', position:"relative"}}>
          <TitleBox updateText={updateText} setUpdateText={setUpdateText}/>
          <CustomDivider />
          <SectionCards data={mock1} updateText={updateText} setUpdateText={setUpdateText}/>
          <CustomDivider />
          <LogosBar />
          <CustomDivider />
          <FeaturedProducts />
          <CustomDivider />
          <IconsHome/>
          {/* <CustomDivider />
          <SectionCards data={mock2}/>
          <CustomDivider /> */}
      </Box>
    </motion.div>
  )
}

export default Home