import * as SHA256 from 'crypto-js/sha256';
import { Transaction } from './transaction.class';

export class Block {
    
    timestamp: any;
    txns: Transaction[] = [];
    previousHash: string = null;
    hash: string = null;
    nonce: number = 0;

    constructor( timestamp, txns, previousHash ) {
        this.timestamp = timestamp;
        this.txns = txns;
        this.previousHash = previousHash;
        this.hash = this. calculateHash();
    }

    calculateHash() {
        return SHA256( this.previousHash + this.timestamp + JSON.stringify( this.txns ) + this.nonce ).toString();
    }   
    
    mineBlock( difficulty ): Promise<any> {
        let promise = new Promise( ( resolve, reject ) => {
            while ( this.hash.substring( 0, difficulty ) != Array( difficulty +1 ).join( "0" ) ) {
                this.nonce++;
                this.hash = this.calculateHash();
            }
            console.log( "Block successfully hashed (" + this.nonce + " iterations). Hash: " + this.hash );
            resolve();
        } );
        return promise;
    }
    
}