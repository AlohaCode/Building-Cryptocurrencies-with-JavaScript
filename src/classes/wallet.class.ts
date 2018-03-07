export class Wallet {
  address: string = '';
  balance: number = 0;
  
  assignWalletAddress( address: string ) {
      this.address = address;
      console.log("Assigned wallet this address: " + this.address);
  }
  
}