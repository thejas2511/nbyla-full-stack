const express=require('express');
const cors=require('cors');

const mongoose=require('mongoose');

require('dotenv').config()

const app=express();
const port=process.env.PORT||5050;

app.use(cors()); 
app.use(express.json()); 

const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});
const connection =mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB connection extablished");
})

const userRouter=require('./routes/users');
app.use('/users',userRouter);

const jobRouter=require('./routes/jobs');
app.use('/jobs',jobRouter);


app.listen(port,()=> {
    console.log(`Server is runnin in port: ${port}`);
})