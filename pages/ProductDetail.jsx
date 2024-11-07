import { CircularProgress, Typography, Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import { getProductById } from '../api_services/api';
import Card from '../components/Card.jsx'
import Alert from '../components/Alert';
import cartContext from '../context/cartContext.js';


const ProductDetailsPage = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState({});
    const [alertConfig, setAlertConfig] = useState({});

    const {cartItems, setCartItem} = useContext(cartContext);

    useEffect(()=>{

        const getProduct = async() =>{

            const product = await getProductById(id);
            setProductData(product);
            setLoading(false);
        }

        getProduct();

    }, [])

    useEffect(()=>{
        console.log(cartItems);
    }, [cartItems])

    const AddToCartHandle=(id)=>{

        //console.log(id);
        let updateQuantity = 1;
        let total = 0;
        if (cartItems.hasOwnProperty(id))
        {
            updateQuantity = cartItems[id].qty;
            updateQuantity++;
        }

        if (cartItems.hasOwnProperty("total"))
        {
            total = cartItems["total"];
            console.log("before", total)
            total = total + productData.price;
            console.log("After", total)
        }
        else
        {
            total = productData.price;
            console.log("single", total)
        }

        setCartItem(cartItems=>({
            ...cartItems,
            [id] : {"qty": updateQuantity, "product": productData},
            "total" : total
        }));

        setAlertConfig({...alertConfig, message:'Added Item To Cart', color: 'success', isOpen: true })

        setTimeout(()=>{
            setAlertConfig({...alertConfig, isOpen: false })
        }, 1000);
    }

    return (
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginY: '100px',
          height: '100vh',
          width: '100vw'
        }}>

            <Typography variant="h6"
                    sx={{
                        fontSize: '48px',
                        color: grey[900]
                    }}>
                    {productData.title}
            </Typography>
            {
                loading ? 
                <Box marginTop={5}>
                    <CircularProgress />
                </Box>
                :
                productData ? <Card productData={productData} addToCart={AddToCartHandle} isDetailsPage={true}/> : <></>
            }
            <Alert alertConfig={alertConfig} />
        </Box>
      )

}

export default ProductDetailsPage;