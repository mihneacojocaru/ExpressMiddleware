import express from 'express';
import productRoutes from './Routes/productRoutes.js';
import cors from 'cors';

const app = express();


const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

//routes
app.use('/api/v1/products', productRoutes)

app.use((req,res,next)=>{

     const err= new Error("not ceva");
     err.status=404;

     next(err);

});

app.use((err,req,res,next)=>{

    res.status(err.status||500);

    res.json({

        error:{
            message:err.message
        }

    })
});

app.listen(port, ()=>console.log('Listening on port' + port));