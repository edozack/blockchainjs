import { Transaction } from './transaction';
export declare class Block {
    index: number;
    timeStamp: Date;
    transactions: Transaction[];
    proof: number;
    previousHash: string;
}
