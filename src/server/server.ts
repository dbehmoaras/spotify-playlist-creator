const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();

const port = process.env.SERVER_PORT;

const loginRouter = require('./routes/login');

app.use('/assets', express.static(path.join(__dirname, './../assets/')));
app.use(cors());
app.use(express.urlencoded({ extended:true }));
app.use(express.json());


app.use('/login', loginRouter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  console.log('*** serving root of landing page ( / )');
  res.sendFile(path.resolve(__dirname + './../index.html'))
})

//test route
app.get('/test', (req, res) =>{
  console.log('***** REACHED TEST ENDPOINT *****');
  return res.status(200).send({test:true});
})

//Global 404 handler
app.use('*', (req, res) => {
  return res.status(404).send('********** GLOBAL BAD REQUEST / 404 ERROR **********');
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});