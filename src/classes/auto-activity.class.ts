import { Transaction } from './transaction.class';
import { Blockchain } from './blockchain.class';

export class AutoActivity {
  
    timerHandle: any;
    blockchain: Blockchain;
    currentPayerAddr: string = '';
    currentPayeeAddr: string = '';
    currentCoinAmount: number = 0;
    
    constructor( blockchain: Blockchain ) {
        this.blockchain = blockchain;
        this.timerHandle = setInterval( () => this.txnTrigger(), 20000 );
    }
    
    txnTrigger() {
        this.randomizePayer();
        this.randomizePayee();
        this.randomizeCoinAmount();
        this.sendTransaction();
    }
    
    randomizePayer() {
        this.currentPayerAddr = this.blockchain.registeredAddresses[ Math.floor( Math.random() * this.blockchain.registeredAddresses.length ) ];
    }
    
    randomizePayee() {
        let payee: string = '';
        while ( payee === '' || payee === this.currentPayerAddr ) {
            payee = this.blockchain.registeredAddresses[ Math.floor( Math.random() * this.blockchain.registeredAddresses.length ) ];
        }
        this.currentPayeeAddr = payee;
    }
    
    randomizeCoinAmount() {
        this.currentCoinAmount = Math.floor( Math.random() * 50 ) + 1;
    }
    
    sendTransaction() {
        let txn = new Transaction( Date.now, this.currentPayerAddr, this.currentPayeeAddr, this.currentCoinAmount );
        this.blockchain.receiveTransaction( txn );
        console.log( "Sent a random txn for: " + txn.amount + " coins");
    }
  
}