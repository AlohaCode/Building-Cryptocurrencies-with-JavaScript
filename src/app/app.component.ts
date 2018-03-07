import { Component } from '@angular/core';
import { CryptoService } from './services/crypto.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Wallet } from '../classes/wallet.class';
import { Blockchain } from '../classes/blockchain.class';
import { Transaction } from '../classes/transaction.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    walletAddressForm: FormGroup;
    sendCoinsForm: FormGroup;
  
    blockchain: Blockchain;
    balance: number = 0;
    wallet: Wallet;

    constructor( public cryptoSvc: CryptoService, private fb: FormBuilder) {
        this.walletAddressForm = this.fb.group({
          walletAddress: ['', Validators.required ]
        });
        this.sendCoinsForm = this.fb.group({
          receiverAddress: ['', Validators.required],
          transactionAmount: ['', Validators.required]
        });
      
        this.blockchain = this.cryptoSvc.cryptoChain;
        this.wallet = new Wallet();
    }
  
  assignWalletAddress() {
      this.wallet.assignWalletAddress( this.walletAddressForm.value.walletAddress );
  }
  
  getCurrentBalance() {
      this.balance = this.blockchain.getAddressBalance( this.wallet.address );
      console.log( "balance: " + this.balance );
  }
  
  sendTransaction() {
      let txn = new Transaction(
          Date.now(),
          this.wallet.address,
          this.sendCoinsForm.value.receiverAddress,
          this.sendCoinsForm.value.transactionAmount
      );
      this.blockchain.receiveTransaction( txn );
  }
  
}
