const express = require('express');
const app = express();
const path = require("path");
require('dotenv').config();

const port = process.env.SERVER_PORT;


const loginRouter = require('./routes/login');

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use('/login', loginRouter);


//Serving up the styles sheet
app.use('/assets', express.static(path.join(__dirname, './../assets')));

app.get('/', (req, res) => {
  console.log('*** serving root of landing page ( / )');
  res.sendFile(path.resolve(__dirname + './../index.html'))
})



//Global 404 handler
app.use('*', (req, res) => {
  return res.status(404).send('********** GLOBAL BAD REQUEST / 404 ERROR **********');
});

const server = app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${port}`);
});