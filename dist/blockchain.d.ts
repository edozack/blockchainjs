import { Block } from './block';
export declare class Blockchain {
    private static m_instance;
    static Instance(): Blockchain;
    private m_chain;
    private m_transactions;
    private m_miner;
    constructor();
    createBlock(proof: number, previousHash: string): Block;
    lastBlock(): Block;
    createTransaction(sender: string, recipient: string, amount: number): number;
    mine(): Promise<Block>;
}
