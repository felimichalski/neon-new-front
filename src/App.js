import { Routes, Route, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from 'react';
import { Box, createStyles } from "@mantine/core"

import "react-toastify/dist/ReactToastify.css";
import CustomFonts from './fonts/CustomFonts';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/CheckoutL';
import PaymentPage from './pages/PaymentPage';
import Admin from "./pages/Admin";
import ProtectedRoute from './components/middleware/ProtectedRoute';
import SideBar from './components/SideBar';

import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import Category from './pages/Category';
import Contact from './pages/Contact';
import About from './pages/About';
import NeonArt from './pages/NeonArt'
import PageNotFound from './components/PageNotFound';
import Dashboard from './components/Admin/Dashboard';
import CreateProduct from './components/Admin/Product/CreateProduct';
import CreateCategory from './components/Admin/Category/CreateCategory';
import ProductsTable from './components/Admin/Product/ProductsTable';
import ScrollToTop from './components/ScrollToTop';
import CreateDiscount from './components/Admin/Discount/CreateDiscount';
import DiscountTable from './components/Admin/Discount/DiscountTable';
import CategoriesTable from './components/Admin/Category/CategoriesTable';
import ProductDetail from './pages/ProductDetail';
import { useDispatch } from 'react-redux';
import { resetDiscount } from './features/slices/cartSlice';

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

  const [paymentInfo, setPaymentInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
  })
  const [paymentInfoFilled, setPaymentInfoFilled] = useState(false)
  const [viewFull, setViewFull] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!location.pathname.includes('/checkout') && !location.pathname.includes('/cart')) {
      dispatch(resetDiscount())
    }

    if (location.pathname.includes('admin')) {
      setViewFull(false)
    } else {
      setViewFull(true)
    }
  }, [location, dispatch])

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
              <Route index element={<Dashboard />} />
              <Route path='products'>
                <Route path='create' element={<CreateProduct />} />
                <Route path='update' element={<ProductsTable />} />
              </Route>
              <Route path='discounts'>
                <Route path='create' element={<CreateDiscount />} />
                <Route path='update' element={<DiscountTable />} />
              </Route>
              <Route path='category'>
                <Route path='create' element={<CreateCategory />} />
                <Route path='update' element={<CategoriesTable />} />
              </Route>
              <Route path='*' element={<Dashboard />} />
            </Route>
          </Route>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='cart' element={<Cart />} />
            <Route path='checkout' element={<Checkout paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo} setPaymentInfoFilled={setPaymentInfoFilled} />} />
            <Route path='payment' element={<PaymentPage info={paymentInfo} filled={paymentInfoFilled} />} />
            <Route path='categories' element={<Category />}>
              <Route index />
              <Route path=':type' />
              <Route path=':type/:category' />
            </Route>
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path='about' element={<About />} />
            <Route path='neonart' element={<NeonArt />} />
            <Route path="custom" element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        {/* {viewFull &&
          <Footer />
        } */}
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
            sm: 750,
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
