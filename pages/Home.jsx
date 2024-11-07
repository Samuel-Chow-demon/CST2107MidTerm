import React, { useContext, useEffect, useState } from 'react'
import Card from '../components/Card.jsx'
import { Box, CircularProgress, Typography } from '@mui/material';
import productContext from '../context/productContext.js';
import { grey } from '@mui/material/colors';
import {getAllProduct} from '../api_services/api.js'
import SearchBar from '../components/SearchBar.jsx';

const Home = () => {

    const {productItems, setProductItem} = useContext(productContext);
    const [loading, setLoading] = useState(true);

    const [displayProductItems, setDisplayProductItems] = useState([]);

    useEffect(()=>{

        const getAllProducts = async() =>{

            const allProducts = await getAllProduct();
            setProductItem(allProducts);
            setDisplayProductItems(allProducts);
            setLoading(false);
        }

        getAllProducts();

    }, [])

    const searchHandle = (text)=>{
        if (text)
        {
            const filteredProducts = productItems.filter(product => {
                return (
                    product.title.toLowerCase().includes(text.toLowerCase()) || 
                    product.description.toLowerCase().includes(text.toLowerCase())
                );
            });
            setDisplayProductItems(filteredProducts);
        }
        else
        {
            setDisplayProductItems(productItems);
        }
    }

  return (
    <>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:'20px', width:'98vw'}}>
            <Typography variant="h6"
                    sx={{
                        fontSize: '48px',
                        color: grey[900]
                    }}>
                    All Products
            </Typography>

            <SearchBar searchHandle={searchHandle}/>

            {
                loading ? 
                <Box marginTop={5}>
                    <CircularProgress />
                </Box>
                :
                <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap:'10px', rowGap:'20px', width: '100%'}}>

                    {
                        displayProductItems.length > 0 && 
                        displayProductItems.map((product, index)=>{
                            return (
                                <Card key={index} productData={product}/>
                            )
                        })
                    }
                </Box>
            }
        </Box>
    </>
  )
}

export default Home