import { AbstractContract } from "./abstract.contract";

import { Observable } from "rxjs/Rx";

export class AccountRegistryContract extends AbstractContract {

  constructor(truffleContract: any) {
    super(truffleContract);
  }
  
  getSenderAccountIpfsHash(): Observable<string> {
    let promise = super.deployed().then((contract) => contract.getSenderAccountIpfsHash.call());
    return Observable.fromPromise(promise);
  }
  
  registerAccount(name: string, ipfsHash: string): Observable<boolean> {
    let promise = super.deployed().then((contract) => contract.registerAccount(name, ipfsHash));
    return Observable.fromPromise(promise);
  }

}