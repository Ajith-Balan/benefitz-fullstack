import express from 'express'
import dotenv from 'dotenv'
import connection from './connection.js'
import auth from './router/auth.js'
import categoryRoutes from './router/categoryRoutes.js'
import countryRoutes from './router/countryRoutes.js'
import cors from 'cors'
import path from 'path';
import workRoutes from './router/workRoutes.js'
dotenv.config()
connection()
const app = express()
app.use(cors())
app.use(express.json({ limit: "50mb" }));


app.use('/api/v1/auth',auth)
app.use('/api/v1/work',workRoutes)

app.use('/api/v1/category',categoryRoutes);
// app.get('/',(req,res)=>{
//     res.send({message:'welcome to ecom app'})
// })
app.use('/api/v1/country', countryRoutes)

app.use(express.static( '../frontend/dist/'));

// Catch-all handler for any request that doesn't match the above routes



const PORT = process.env.PORT || 8080




app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
    
})
