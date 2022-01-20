import express from 'express';
import ProductsRepo from '../Repositories/productsRepo.js';

let productRoutes = express.Router();

let productsRepo = new ProductsRepo();


function asyncHandler(cb){
    return async (req,res,next)=>{
        try{
            await cb(req,res,next);
        }catch(err){
            next(err);
        }
    }
}

// productRoutes.use((req,res,next)=>{
//     console.log("First Console Print");
//     req.mihnea="message from MW1";
//     req.itemNotFound='Item not found';
//     next();
// });

productRoutes.get('/', asyncHandler(async(req,res,next)=>{
    let items = await productsRepo.getProducts();
    res.status(200).json(items);
    
}));

// productRoutes.use((req,res,next)=>{
//     console.log(req.mihnea);
//     req.bogdan="Something else";
//     next();
// });

productRoutes.post('/', asyncHandler(async (req,res,next)=>{
    let item = req.body;
    productsRepo.newProductsList(item);
    res.status(200).json('Item successfuly postet');
}));

// productRoutes.use((req,res,next)=>{
//     console.log(req.mihnea);
//     console.log(req.bogdan);
//     next();
// });

productRoutes.delete("/:id",asyncHandler(async (req,res,next)=>{
    let {id} = req.params;
    let x = await productsRepo.verifyItem(id);
    if(x == true){
        productsRepo.deleteItem(id);
        res.status(200).json('Delete Successful');
    }else{
        req.id = id;
        next();
    }
}));

productRoutes.use((req,res,next)=>{
    const x = `Item #${req.id} was not found.`;
    next(x);
});


productRoutes.put('/', asyncHandler(async (req,res,next)=>{
   let item = req.body;
   productsRepo.updateProduct(item);
   res.status(200).json('Product updated sucessfuly!'); 
}));


export default productRoutes;