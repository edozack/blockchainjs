import { Block } from './block';
import * as crypto from 'crypto-js/sha256';


export class Miner {

    constructor() {
        this.validProff = this.validProff.bind(this);
        this.hashBlock = this.hashBlock.bind(this);
    }

    public async prof_of_work(lastBlock: Block): Promise<Block> {
        let blk = new Block(); 
        blk.previousHash = lastBlock.previousHash;
        blk.proof = 0;
        while (!(await this.validProff(blk, 1)))
            blk.proof++;

        return blk;
    }


    public async validProff(block: Block, leadingZero: number): Promise<boolean> {
        let hash = this.hashBlock(block);

        if(hash.length >= leadingZero)
        {
            for (let i = 0; i < leadingZero; i++ ) {
                if (hash[i] != '0')
                    return false;
            }
            return true;
        }

        return false;
    }


    public hashBlock(block: Block): string {               
        const hash = crypto(block.proof.toString() + block.previousHash);        
        return hash.toString();
    }

    private stringToByteArray(str: string): number[] {       
        const bytes: number[] = [];
        let charCode;
        
        for (var i = 0; i < str.length; ++i)
        {
            charCode = str.charCodeAt(i);
            bytes.push((charCode & 0xFF00) >> 8);
            bytes.push(charCode & 0xFF);
        }        
        return bytes;
    }
}