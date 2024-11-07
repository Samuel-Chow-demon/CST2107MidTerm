import React, { memo } from 'react'
import {Box, Button, Chip, IconButton, Link, Paper, Typography} from '@mui/material'
import { blue, green, grey } from '@mui/material/colors';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import StarIcon from '@mui/icons-material/Star';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';
import { navItemAndPath, NAV_PRODUCT_DETAILS } from '../constant';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const Card = ({productData, addToCart, isDetailsPage = false}) => {

    const navigate = useNavigate();

    const {id, title, price, description, category, image, rating} = productData;

    const clickReadProdDetails = (productId)=>{
        navigate(`${navItemAndPath[NAV_PRODUCT_DETAILS]}/${id}`);
    }

    const clickAddCart=()=>{

        setAlertConfig({...alertConfig, message:'Cancelled Like a blog', color: 'success', isOpen: true })

        setTimeout(()=>{
            setAlertConfig({...alertConfig, isOpen: false })
        }, 1000);
    }

    if (productData)
    {
        return (        
            <Paper elevation={8}
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                    padding: '10px',
                    width: isDetailsPage ? '45rem' :'25rem',
                    height: isDetailsPage ? '60rem' : '35rem'
                }}>

                {
                    isDetailsPage &&
                                <IconButton style={{ position: 'absolute', right: '30px', top: '30px', color:blue[500]}} size="large" onClick={() => navigate("/")}>
                                    <KeyboardReturnIcon fontSize="inherit" /> Back
                                </IconButton>
                }

                {image &&
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            height: '50%',
                            margin: '1px',
                            borderRadius: '8px',
                            objectFit: 'cover'
                        }}    
                    src={image} />
                }
    
                {
                    !isDetailsPage &&
                    <Typography variant='h6' sx={{marginY: '10px', marginX: '10px', textAlign:'justify', color:grey[900]}}>
                        {title}
                    </Typography>
                }

                <Typography variant='h4' sx={{marginY: '10px', marginX: '10px', textAlign:'justify', color:grey[900]}}>
                    $ {price}
                </Typography>
    
                {
                    isDetailsPage &&
                            <Typography variant='body1' sx={{marginTop: '10px', marginX:'10px', textAlign:'justify', fontSize:'25px'}}>
                                {description}
                            </Typography>
                }

                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop: '5px'}}>
                    <Chip icon={<StarIcon/>} label={rating.rate} sx={{margin: '5px', fontSize:'15px'}} />
                    <Chip icon={<PeopleAltIcon/>} label={rating.count} sx={{margin: '5px', fontSize:'15px'}} />
                </Box>
                
                {
                    !isDetailsPage &&
                    <Chip icon={<KeyboardDoubleArrowRightIcon/>} label="Details"
                        sx={{fontSize:'12px', marginTop:'10px', position:'absolute', bottom:'20px', backgroundColor:blue[300]}}
                        onClick={clickReadProdDetails}/>
                }

                {
                    isDetailsPage &&
                    <Button
                        sx={{
                            fontSize:'16px',
                            color: grey[100],
                            backgroundColor: blue[600],
                            marginTop: '30px',
                            position:'absolute',
                            bottom:'20px'
                        }}
                        onClick={()=>{addToCart(id)}}
                        >
                        Add To Cart
                    </Button>
                }
            </Paper>
        )
    }
    else
    {
        return <></>;
    }
}

export default memo(Card)