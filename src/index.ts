import { Transaction } from './transaction';
import { Blockchain } from './blockchain';
import { Block } from './block'
import * as express from 'express';
import * as bodyParser from 'body-parser';

var app = express()
let jsonParser = bodyParser.json();

app.get('/', function (req, res) {
  res.send('Hello block chain')
})
 
app.get('/mine', (req, res) => {

    const chain = Blockchain.Instance();
        
    chain.mine().then(block => {
        const blk = chain.createBlock(block.proof, block.previousHash, block.hash);
        res.send(JSON.stringify(blk));
     })
     .catch((e) => res.send(e));                         
});

app.get('/chain', (req, res) => {

    const chain = Blockchain.Instance();

    res.send(JSON.stringify(chain.chain()));
});

app.post('/transaction/new', jsonParser, function (req, res) {
    let message = req.body;

    let blockID = Blockchain.Instance().createTransaction(message.sender, message.recipient, message.amount);
    const msg: string = 'transaction will be added to block ' + blockID;
    res.send(msg);
        
});
app.listen(3024)