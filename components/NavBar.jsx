import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { purple } from '@mui/material/colors';

import { navItemAndPath, NAV_HOME, NAV_PRODUCT_DETAILS } from '../constant';
import productContext from '../context/productContext'
import { useNavigate } from 'react-router-dom';

import Alert from '../components/Alert';


function NavBar() {

  const navigate = useNavigate();

  const {productItems, setProductItem} = useContext(productContext);
  const [alertConfig, setAlertConfig] = useState({});

  const clickNavBar = async (menuItem, path) =>{
    if (menuItem === NAV_PRODUCT_DETAILS)
    {
      setAlertConfig({...alertConfig, message:'Please Use Item Details Button', color: 'success', isOpen: true })

        setTimeout(()=>{
            setAlertConfig({...alertConfig, isOpen: false })
        }, 1000);
    }
    else
    {
      navigate(path);
    }
  }

  return (
    <AppBar position="static" sx={{backgroundColor: purple[400]}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingBagIcon sx={{ display: 'flex', mr: 2 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 10,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'white',
              textDecoration: 'none',
              flexShrink: 0, // prevent shrinking
            }}
          >
            SHOPPING!!!
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 5 }}>
            {Object.entries(navItemAndPath).map(([menuItem, path], index) => (
              <Button
                key={index}
                onClick={()=>{clickNavBar(menuItem, path)}}
                sx={{ my: 2, color: 'white', display: 'block', fontSize:'18px' }}
              >
                {menuItem}
              </Button>
            ))}
          </Box>
          
        </Toolbar>
      </Container>
      <Alert alertConfig={alertConfig} />
    </AppBar>
  );
}
export default NavBar;
