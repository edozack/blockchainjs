import { Miner } from './miner';
import { Transaction } from './transaction';
import { Block } from './block';
import { Node } from './node';

export class Blockchain {

    private static  _instance: Blockchain;    

    public static Instance(): Blockchain
    {
        if (!Blockchain._instance)
            Blockchain._instance = new Blockchain();

        return Blockchain._instance;
    }

    private  _chain: Block[];
    private  _transactions: Transaction[];
    private  _miner: Miner;
    private  _nodes: Node[];

    constructor() {
        this.lastBlock = this.lastBlock.bind(this);

        this._chain = [];
        this._transactions = [];
        this._miner = new Miner();
        this._nodes = [];

        const genesis: Block = new Block(); 
        genesis.index = 1; 
        genesis.previousHash = '0';
        genesis.hash = '1';
        genesis.proof = 100;
        this._chain.push(genesis);
    }

    public registerNode(address: string, port: number) {
        const node = new Node();
        node.address = address;
        node.port = port;
        this._nodes.push(node);
    }

    public createBlock(proof: number, previousHash: string, hash: string): Block {
        const block = new Block(); 
        block.previousHash = this.lastBlock().hash;
        block.hash = hash;
        block.proof = proof;
        block.timeStamp = new Date();
        block.index = this._chain.length + 1;
        block.transactions = [];
        this._transactions.forEach(item => block.transactions.push(item));        
        this._transactions = [];
        this._chain.push(block);
        return block;
    }

    public lastBlock(): Block {
        if (this._chain.length == 0)
            return null;
        return this._chain[this._chain.length - 1];
    }
    
    public createTransaction(sender: string, recipient: string, amount: number): number {
        const transaction = new Transaction();
        transaction.sender = sender;
        transaction.recipient = recipient;
        transaction.amount = amount;
        this._transactions.push(transaction);
        const lastBlock = this.lastBlock();
        return (lastBlock === null ? 0 : lastBlock.index + 1);
    }
 
    public chain(): Block[] {
        return this._chain;
    }

    public async mine(): Promise<Block> {
        return this._miner.prof_of_work(this.lastBlock());
    }

    public validChain(chain: Block[]): boolean {
        if(chain.length === 0)
            return false;

        let lastBlock = chain[0];
        let currentIndex = 1;

        if (this._miner.hashBlock(lastBlock) !== lastBlock.hash)
            return false;

        while (currentIndex < chain.length) {
            let block = chain[currentIndex];

            if (block.previousHash !== lastBlock.hash)
                return false;

            if (this._miner.hashBlock(block) !== block.hash)
                return false;

            lastBlock = block;
            currentIndex++;
        }

        return true;
    }

    public resolveConflicts() {
        /****        
        This is our Consensus Algorithm, it resolves conflicts
        by replacing our chain with the longest one in the network.
        :return: <bool> True if our chain was replaced, False if not
        """

        neighbours = self.nodes
        new_chain = None

        # We're only looking for chains longer than ours
        max_length = len(self.chain)

        # Grab and verify the chains from all the nodes in our network
        for node in neighbours:
            response = requests.get(f'http://{node}/chain')

            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']

                # Check if the length is longer and the chain is valid
                if length > max_length and self.valid_chain(chain):
                    max_length = length
                    new_chain = chain

        # Replace our chain if we discovered a new, valid chain longer than ours
        if new_chain:
            self.chain = new_chain
            return True

        return False 
         ***/
    }

}