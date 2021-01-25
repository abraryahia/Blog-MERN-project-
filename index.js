const express = require('express');
const app = express();

const mongoose = require('mongoose');
const  { router }  = require('./routes');
//const  routeblog  = require('./routes/bolg')

const { MONGODB_URI } = process.env;
mongoose.connect( MONGODB_URI  ,{useNewUrlParser: true});

app.use(express.json());

app.use('/',router);

//app.use('/blog' ,authMW, routeblog);

app.get('*',(req,res,next)=>{
    res.send('Not-Found')
    res.status(404).send('Not Found ');
})
 
app.get((err , req , res , next)=>{
    console.log(err);
    if (err.code === 11000) {
        res.status(402).send('There was a duplicate key error');
    }
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json(err.errors);
      }
      if (err.code === 11000) {
        res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
      }
      if (err.message === 'UN_AUTHENTICATED') {
        res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
      }
      if (err.message === 'UN_AUTHENTICATED') {
        res.status(400).json({ statusCode: 'Bad request' });
      }
      res.status(503).end();
})

const {PORT=3000}=process.env;
app.listen(process.env.PORT ||PORT,()=>{
    console.log(`Connected ${PORT} `);
})