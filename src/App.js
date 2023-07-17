import { Routes, Route, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from 'react';
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
import Contact from './components/Contact';
import PageNotFound from './components/PageNotFound';
import Dashboard from './components/Admin/Dashboard';
import CreateProduct from './components/Admin/Product/CreateProduct';
import CreateCategory from './components/CreateCategory';
import ProductsTable from './components/Admin/Product/ProductsTable';
import ScrollToTop from './components/ScrollToTop';
import CreateDiscount from './components/Admin/Discount/CreateDiscount';
import DiscountTable from './components/Admin/Discount/DiscountTable';
import NeonArt from './pages/NeonArt'

const useStyles = createStyles((theme) => ({
  container: {
    /* position:"relative", */
  },
  /*  sidebar:{
     position:"sticky"
   }, */
  openSideBar: {
    position: "fixed",
  },
  /* closeSideBar:{
    position:"sticky",
    top:"80px"
  } */
}))

const App = () => {
  const { classes } = useStyles()
  const location = useLocation();
  const [viewFull, setViewFull] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    if(location.pathname.includes('admin')) {
      setViewFull(false)
    } else {
      setViewFull(true)
    }
  }, [location])

  if (openMenu === false) {
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
        <ScrollToTop />
        {viewFull &&
          <Navbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        }
        <Routes location={location} key={location.pathname}>
          <Route element={<ProtectedRoute />}>
            <Route path="admin" element={<Admin />}>
              <Route index element={<Dashboard />}/>
              <Route path='products'>
                <Route path='create' element={<CreateProduct />}/>
                <Route path='update' element={<ProductsTable />}/>
              </Route>
              <Route path='discounts'>
                <Route path='create' element={<CreateDiscount />}/>
                <Route path='update' element={<DiscountTable />}/>
              </Route>
              <Route path='category'>
                <Route path='create' element={<CreateCategory />}/>
              </Route>
              <Route path='*' element={<Dashboard />}/>
            </Route>
            {/* <Route path="/create_product" element={<CreateProduct />} /> */}
            {/* <Route path="/update/:productId" element={<Update />} /> */}
          </Route>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='cart' element={<Cart />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='categories' element={<Category />}>
              <Route index />
              <Route path=':type' />
              <Route path=':type/:category' />
            </Route>
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path='neonart' element={<NeonArt />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        {viewFull && 
          <Footer />
        }
      </MantineProvider>
    );
  } else {
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
        <Navbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <Box className={openMenu ? classes.openSideBar : classes.closeSideBar} >
          <SideBar className={classes.sidebar} openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </Box>
      </MantineProvider>
    )
  }
}

export default App;
