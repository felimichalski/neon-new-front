import { Routes, Route, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import CustomFonts from './fonts/CustomFonts';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from "./pages/Admin";
import ProtectedRoute from './components/middleware/ProtectedRoute';
import ProductDetail from './components/ProductDetail';

import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import Category from './pages/Category';

const App = () => {

  const location = useLocation();

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
      <Navbar />
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
