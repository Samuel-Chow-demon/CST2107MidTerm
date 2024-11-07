import React, {useContext, useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import cartContext from '../context/cartContext.js';
import { green, grey } from '@mui/material/colors';
import { Box, Button } from '@mui/material';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';


const CheckoutPage = () => {

    const {cartItems, setCartItem} = useContext(cartContext);
    const [alertConfig, setAlertConfig] = useState({});

    // useEffect(()=>{

    //     //console.log("Cart", cartItems);
    // }, [])

    const checkoutHandle = ()=>{

        if (cartItems)
        {
            setCartItem({});

            setAlertConfig({...alertConfig, message:'Items Checked Out Successfully', color: 'success', isOpen: true })

            setTimeout(()=>{
                setAlertConfig({...alertConfig, isOpen: false })
            }, 1000);
        }
    }

    const Item = ({id, img, title, price, qty}) =>{

        return (
            <>
                <ListItem alignItems="flex-start"
                    sx={{ padding: 2, minHeight: 80 }}
                    >
                    <ListItemAvatar>
                        <Avatar src={img} sx={{ width: 60, height: 60, marginRight:'20px' }}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography variant="h6" sx={{ fontSize: '1.5rem', color: 'text.primary' }}>
                                {title}
                            </Typography>}
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{ color: 'text.primary', display: 'inline' }}
                            >
                                @ {price}
                            </Typography>
                            
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{ color: 'text.primary', display: 'inline', marginLeft:'50px' }}
                            >
                                {`QTY : ${qty}`}
                            </Typography>
                            
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{ color: 'text.primary', display: 'inline', marginLeft:'50px' }}
                            >
                                SubTotal : $ {(price * qty).toFixed(2)}
                            </Typography>
                            </React.Fragment>
                        }
                    />
                    
                </ListItem>
                <Divider variant="inset" component="li" />;
            </>);
    }

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', margin:"20px" }}>
                {
                    cartItems &&
                    Object.entries(cartItems).map(([key, itemDetails], index)=>{

                        if (key != "total")
                        {
                            const qty = itemDetails["qty"];
                            const product = itemDetails["product"];
                            const image = product["image"];
                            const title = product["title"];
                            const price = product["price"];

                            return <Item key={index} id={key} img={image} title={title} price={price} qty={qty}/>
                        }
                    })

                }  
            </List>
            <Box sx={{
                    display:'flex',
                    justifyContent:'flex-start',
                    width: "100%",
                    margin: "40px"
                }}>
                <Typography variant="h5"
                    sx={{
                        fontSize: '36px',
                        color: grey[900],
                        margin:"20px"
                    }}>
                    {`Total Price : $ ${((Object.is(cartItems['total'], -0) ? 0 : cartItems['total']) || 0).toFixed(2)}`}
                </Typography>
                <Button sx={{
                        fontSize: '24px',
                        backgroundColor: green[500],
                        color: grey[200],
                        padding: '20px',
                        marginLeft:"50px"
                    }}
                    onClick={checkoutHandle}>
                    Check Out
                </Button>
                <Alert alertConfig={alertConfig} />
            </Box>
        </>
    )
}

export default CheckoutPage;