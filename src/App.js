import { Routes, Route, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import MainLayout from './layouts/MainLayout';
import CustomFonts from './fonts/CustomFonts';
import Home from './pages/Home';

const App = () => {

  const location = useLocation();

  return (
    <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: 'light',
      focusRing: 'never',
      fontFamily: ['Gotham', 'Proxima Nova', 'Lexend'],
      fontFamilyMonospace: ['Gotham', 'Proxima Nova', 'Lexend'],
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
      <ToastContainer pauseOnHover={false} theme='dark' autoClose={2000}/>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />}/>
        </Route>
      </Routes>
    </MantineProvider>
  );
}

export default App;
