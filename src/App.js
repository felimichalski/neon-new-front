import { Routes, Route, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import MainLayout from './layouts/MainLayout';
import CustomFonts from './fonts/CustomFonts';
import Home from './pages/Home';
import Cart from './pages/Cart';

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
      <ToastContainer pauseOnHover={false} theme='light' autoClose={2000} position='bottom-right'/>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />}/>
          <Route path='cart' element={<Cart />}/>
        </Route>
      </Routes>
    </MantineProvider>
  );
}

export default App;
