import express from 'express';
import ProductsRepo from '../Repositories/productsRepo.js';

let productRoutes = express.Router();

let productsRepo = new ProductsRepo();

productRoutes.use((req,res,next)=>{
    console.log("From Middleware 1");

    let mihnea={  
        text:"ceva routes MW1"
    }
    next(mihnea);
})

productRoutes.get('/', async (req,res) =>{
    try {
        let items = await productsRepo.getProducts();

        res.status(200).json(items);

    } catch (error) {

        res.status(500).json({message: error.message})
    }
});

productRoutes.use((req,res,next)=>{
    console.log("From Middleware 2");
    let mihnea={  
        text:"ceva routes MW2"
    }
    next(mihnea);
});


productRoutes.post('/', async (req,res) => {
    try {
        let item = req.body;
        productsRepo.newProductsList(item);
        res.status(200).json('Item postet sucessfuly');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

productRoutes.use((req,res,next)=>{
    console.log('From Middleware 3');
    next();
});

productRoutes.delete('/:id', async (req,res) => {
    try {
        let {id} = req.params;
        productsRepo.deleteItem(id);
        res.status(200).json('Deleted Successfuly!');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

productRoutes.put('/', async (req,res) => {
    try {
        let item = req.body;
        productsRepo.updateProduct(item);
        res.status(200).json('Product updated sucessfuly!');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


export default productRoutes;