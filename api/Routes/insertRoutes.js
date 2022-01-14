import express from 'express';
import InsertsRepo from '../Repositories/insertsRepo.js';

let insertsRoute = express.Router();

let insertsRepo = new InsertsRepo();

insertsRoute.use((req,res,next)=>{
    console.log("From Middleware 1");

    let mihnea={  
        text:"ceva routes MW1"
    }
    next(mihnea);
})

insertsRoute.get('/', async (req,res) =>{
    try {
        let items = await insertsRepo.getInserts();

        res.status(200).json(items);

    } catch (error) {

        res.status(500).json({message: error.message})
    }
});

insertsRoute.use((req,res,next)=>{
    console.log("From Middleware 2");
    let mihnea={  
        text:"ceva routes MW2"
    }
    next(mihnea);
});


insertsRoute.post('/', async (req,res) => {
    try {
        let item = req.body;
        insertsRepo.newIsertsList(item);
        res.status(200).json('Item postet sucessfuly');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

insertsRoute.use((req,res,next)=>{
    console.log('From Middleware 3');
    next();
});

insertsRoute.delete('/:id', async (req,res) => {
    try {
        let {id} = req.params;
        insertsRepo.deleteItem(id);
        res.status(200).json('Deleted Successfuly!');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


export default insertsRoute;