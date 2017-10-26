"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const miner_1 = require("./miner");
const transaction_1 = require("./transaction");
const block_1 = require("./block");
class Blockchain {
    static Instance() {
        if (!Blockchain.m_instance)
            Blockchain.m_instance = new Blockchain();
        return Blockchain.m_instance;
    }
    constructor() {
        this.lastBlock = this.lastBlock.bind(this);
        this.m_chain = [];
        this.m_transactions = [];
        this.m_miner = new miner_1.Miner();
        const genesis = new block_1.Block();
        genesis.index = 1;
        genesis.previousHash = '1';
        genesis.proof = 100;
        this.m_chain.push(genesis);
    }
    createBlock(proof, previousHash) {
        const block = new block_1.Block();
        block.previousHash = previousHash;
        block.proof = proof;
        block.timeStamp = new Date();
        block.index = this.m_chain.length + 1;
        if (this.m_transactions.length > 0)
            block.transactions.concat(...this.m_transactions);
        this.m_transactions = [];
        this.m_chain.push(block);
        return block;
    }
    lastBlock() {
        if (this.m_chain.length == 0)
            return null;
        return this.m_chain[this.m_chain.length - 1];
    }
    createTransaction(sender, recipient, amount) {
        const transaction = new transaction_1.Transaction();
        transaction.sender = sender;
        transaction.recipient = recipient;
        transaction.amount = amount;
        this.m_transactions.push(transaction);
        const lastBlock = this.lastBlock();
        return (lastBlock === null ? 0 : lastBlock.index + 1);
    }
    mine() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.m_miner.prof_of_work(this.lastBlock());
        });
    }
}
exports.Blockchain = Blockchain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ibG9ja2NoYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxtQ0FBZ0M7QUFDaEMsK0NBQTRDO0FBQzVDLG1DQUFnQztBQUVoQztJQUlXLE1BQU0sQ0FBQyxRQUFRO1FBRWxCLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztZQUN2QixVQUFVLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFFN0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQU1EO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBSyxFQUFFLENBQUM7UUFFM0IsTUFBTSxPQUFPLEdBQVUsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQUNuQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNsQixPQUFPLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUMzQixPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sV0FBVyxDQUFDLEtBQWEsRUFBRSxZQUFvQjtRQUNsRCxNQUFNLEtBQUssR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM3QixLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN0QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDOUIsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sU0FBUztRQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxNQUFjLEVBQUUsU0FBaUIsRUFBRSxNQUFjO1FBQ3RFLE1BQU0sV0FBVyxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO1FBQ3RDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzVCLFdBQVcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ2xDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVZLElBQUk7O1lBQ2IsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDN0QsQ0FBQztLQUFBO0NBQ0o7QUE5REQsZ0NBOERDIn0=