import React, {useContext, useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import cartContext from '../context/cartContext.js';
import { green, grey, red } from '@mui/material/colors';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton, ListItemIcon } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const CartPage = () => {

    const {cartItems, setCartItem} = useContext(cartContext);

    useEffect(()=>{

        console.log("Cart", cartItems);
    }, [])

    const substractQty = (id)=>{

        const product = cartItems[id];

        let quantity = product["qty"];
        const productDetails = product["product"];
        let total = cartItems['total'];
        const unitPrice = productDetails['price'];

        //console.log(product);
        //console.log("total", total);
        //console.log("unitPrice", unitPrice);

        if (quantity >= 2)
        {
            quantity--;
            total = total - unitPrice;
            //console.log("after substract", total);

            setCartItem(cartItems=>({
                ...cartItems,
                [id] : {...product, "qty": quantity},
                "total" : total
            }));
        }
    }
    const addQty = (id)=>{

        const product = cartItems[id];

        let quantity = product["qty"];
        const productDetails = product["product"];
        let total = cartItems['total'];
        const unitPrice = productDetails['price'];

        quantity++;
        total = total + unitPrice;

        setCartItem(cartItems=>({
            ...cartItems,
            [id] : {...product, "qty": quantity},
            "total" : total
        }));
    }

    const removeProduct = (id)=>{

        if (cartItems.hasOwnProperty(id))
        {
            const product = cartItems[id];

            const quantity = product["qty"];
            const productDetails = product["product"];
            let total = cartItems['total'];
            const unitPrice = productDetails['price'];

            total = total - (quantity * unitPrice);

            delete cartItems[id];
            setCartItem(cartItems=>({
                ...cartItems,
                "total" : total
            }));
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
                            <IconButton onClick={()=>{substractQty(id)}} size="large" sx={{ marginLeft:'20px', marginRight: '1px', color:red[500] }}>
                                    <RemoveCircleOutlineIcon fontSize="large" />
                            </IconButton>
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{ color: 'text.primary', display: 'inline', marginLeft:'1px' }}
                            >
                                {`QTY : ${qty}`}
                            </Typography>
                            <IconButton onClick={()=>{addQty(id)}} size="large" sx={{ marginRight: '5px', color:green[500] }}>
                                    <AddCircleOutlineIcon fontSize="large" />
                            </IconButton>
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
                    <ListItemIcon >
                            <IconButton onClick={()=>{removeProduct(id)}} size="large" sx={{ marginRight: '5px', color:grey[500] }}>
                                    <DeleteForeverIcon fontSize="large" />
                            </IconButton>
                    </ListItemIcon >
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
            <Typography variant="h5"
                sx={{
                    fontSize: '36px',
                    color: grey[900],
                    margin:"20px"
                }}>
                {`Total Price : $ ${((Object.is(cartItems['total'], -0) ? 0 : cartItems['total']) || 0).toFixed(2)}`}
            </Typography>
        </>
    )
}

export default CartPage;