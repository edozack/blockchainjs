"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("./blockchain");
const express = require("express");
const bodyParser = require("body-parser");
var app = express();
let jsonParser = bodyParser.json();
app.get('/', function (req, res) {
    res.send('Hello block chain');
});
app.get('/mine', (req, res) => {
    const chain = blockchain_1.Blockchain.Instance();
    chain.mine().then(block => {
        const blk = chain.createBlock(block.proof, block.previousHash);
        res.send(JSON.stringify(blk));
    })
        .catch((e) => res.send(e));
});
/*
app.get('/chain', (req, res) => {
    compositionsClient.getRtm(req.query)
        .then((result: IRtm[]) => res.send(result))
        .catch((e) => res.sendStatus(500));
});*/
app.post('/transaction/new', jsonParser, function (req, res) {
    let message = req.body;
    let blockID = blockchain_1.Blockchain.Instance().createTransaction(message.sender, message.recipient, message.amount);
    const msg = 'transaction will be added to block ' + blockID;
    res.send(msg);
});
app.listen(3024);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2Q0FBMEM7QUFFMUMsbUNBQW1DO0FBQ25DLDBDQUEwQztBQUUxQyxJQUFJLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQTtBQUNuQixJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7QUFFbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztJQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDL0IsQ0FBQyxDQUFDLENBQUE7QUFFRixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUUxQixNQUFNLEtBQUssR0FBRyx1QkFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXBDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdEIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUMsQ0FBQztBQUVIOzs7OztLQUtLO0FBRUwsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztJQUN2RCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBRXZCLElBQUksT0FBTyxHQUFHLHVCQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6RyxNQUFNLEdBQUcsR0FBVyxxQ0FBcUMsR0FBRyxPQUFPLENBQUM7SUFDcEUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUVsQixDQUFDLENBQUMsQ0FBQztBQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUEifQ==