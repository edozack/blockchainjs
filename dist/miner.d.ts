import { Block } from './block';
export declare class Miner {
    constructor();
    prof_of_work(lastBlock: Block): Promise<Block>;
    validProff(block: Block, leadingZero: number): Promise<boolean>;
    hashBlock(block: Block): string;
    private stringToByteArray(str);
}
