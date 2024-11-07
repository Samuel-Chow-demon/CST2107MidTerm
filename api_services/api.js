import axios from 'axios'

const getAllProduct = async ()=>{

    try{
        const response = await axios.get(`https://fakestoreapi.com/products`);
        return response.data;
    }
    catch(error)
    {
        console.log(`Get Data Error : ${error}`);
        return []; // return empty list if fail
    }
}

const getCategoryProduct = async (category, setCurCategory)=>{

    try{
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        setCurCategory(category);
        return response.data;
    }
    catch(error)
    {
        console.log(`Get Data Error : ${error}`);
        return []; // return empty list if fail
    }
}

const getProductById = async (id)=>{

    try{
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        return response.data;
    }
    catch(error)
    {
        console.log(`Get Data Error : ${error}`);
        return {}; // return empty object if fail
    }
}


export {getAllProduct, getCategoryProduct, getProductById}
