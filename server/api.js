const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db=require('./db/index.js');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products/search',(request, response)=> {
  db.Search(request.query).then(res=>{response.send({'Product':res} ); });
});

app.get('/products/:id',(request, response)=> {
  db.findId(request.params.id).then(res=>{response.send({'Product':res} ); });
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
