export abstract class AbstractContract {
  
  protected truffleContract: any;
  
  constructor(truffleContract: any) {
    this.truffleContract = truffleContract; 
  }
  
  protected deployed(): Promise<any> {
    return this.truffleContract.deployed();
  }
  
}