const express = require('express');
const {connectMongoDb} = require('./connection');

const {logReqRes} = require('./middlewares/index')
const userRouter = require('./routes/user');
const app = express();
const port = 8000;

//connection 
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app1').then(()=>{
  console.log('Connection successful');
});

// middleware -plugin
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes('log.txt'));

app.use('/api/users',userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
