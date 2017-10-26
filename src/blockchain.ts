import { Miner } from './miner';
import { Transaction } from './transaction';
import { Block } from './block';

export class Blockchain {

    private static  m_instance: Blockchain;    

    public static Instance(): Blockchain
    {
        if (!Blockchain.m_instance)
            Blockchain.m_instance = new Blockchain();

        return Blockchain.m_instance;
    } 

    private  m_chain: Block[];
    private  m_transactions: Transaction[];
    private  m_miner: Miner;

    constructor() {
        this.lastBlock = this.lastBlock.bind(this);

        this.m_chain = [];
        this.m_transactions = [];
        this.m_miner = new Miner();

        const genesis: Block = new Block(); 
        genesis.index = 1; 
        genesis.previousHash = '1';
        genesis.proof = 100;
        this.m_chain.push(genesis);
    }

    public createBlock(proof: number, previousHash: string, hash: string): Block {
        const block = new Block(); 
        block.previousHash = this.lastBlock().hash;
        block.hash = hash;
        block.proof = proof;
        block.timeStamp = new Date();
        block.index = this.m_chain.length + 1;
        block.transactions = [];
        block.transactions.concat(...this.m_transactions);        
        this.m_transactions = [];
        this.m_chain.push(block);
        return block;
    }

    public lastBlock(): Block {
        if (this.m_chain.length == 0)
            return null;
        return this.m_chain[this.m_chain.length - 1];
    }
    
    public createTransaction(sender: string, recipient: string, amount: number): number {
        const transaction = new Transaction();
        transaction.sender = sender;
        transaction.recipient = recipient;
        transaction.amount = amount;
        this.m_transactions.push(transaction);
        const lastBlock = this.lastBlock();
        return (lastBlock === null ? 0 : lastBlock.index + 1);
    }
 
    public chain(): Block[] {
        return this.m_chain;
    }

    public async mine(): Promise<Block> {
        return this.m_miner.prof_of_work(this.lastBlock());
    }
}