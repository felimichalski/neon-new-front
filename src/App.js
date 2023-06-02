import { Routes, Route, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ToastContainer } from "react-toastify";
import { useState } from 'react';
import { Box, createStyles } from "@mantine/core"

import "react-toastify/dist/ReactToastify.css";
import CustomFonts from './fonts/CustomFonts';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from "./pages/Admin";
import ProtectedRoute from './components/middleware/ProtectedRoute';
import ProductDetail from './pages/ProductDetail';
import SideBar from './components/SideBar';

import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import Category from './pages/Category';

const useStyles = createStyles((theme) => ({
  container:{
    position:"relative",
  },
  openSideBar:{
    position:"absolute",
    
  },
  closeSideBar:{
    display:"none"
  }
}))

const App = () => {
  const { classes } = useStyles()
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
        focusRing: 'never',
        fontFamily: ['Gotham', 'Proxima Nova', 'Lexend', 'ITC Avant Garde Gothic', 'ITC Avant Garde Gothic Cn'],
        fontFamilyMonospace: ['Gotham', 'Proxima Nova', 'Lexend', 'ITC Avant Garde Gothic', 'ITC Avant Garde Gothic Cn'],
        headings: {
          fontFamily: ['Gotham', 'Proxima Nova', 'Lexend']
        },
        breakpoints: {
          xs: 350,
          sm: 600,
          md: 950,
          lg: 1150,
          xl: 1400,
        },
      }}
    >
      <CustomFonts />
      <ToastContainer pauseOnHover={false} theme='light' autoClose={2000} position='bottom-right' />
      <Navbar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
      <Box className={openMenu?classes.openSideBar:classes.closeSideBar} >
          <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
      </Box>
      <Routes location={location} key={location.pathname}>
      <Route element={<ProtectedRoute />}>
          {/* <Route path="/create_product" element={<CreateProduct />} /> */}
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/update/:productId" element={<Update />} /> */}
        </Route>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='admin' element={<Admin />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='categories'>
            <Route index element={<Category />} />
            <Route path=':id' element={<Category />} />
            <Route path='type/:id' element={<Category />} />
          </Route>
          <Route path="product/:id" element={<ProductDetail/>}/>
        </Route>
      </Routes>
      <Footer />
    </MantineProvider>
  );
}

export default App;
