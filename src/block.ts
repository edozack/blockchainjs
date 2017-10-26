import { Transaction } from './transaction';

export class Block {
    public index: number;
    public timeStamp: Date;
    public transactions: Transaction[];
    public proof: number;
    public previousHash: string;
    public hash: string;
}