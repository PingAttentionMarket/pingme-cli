import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { IpfsProvider } from "./ipfs.provider";
import { Web3Provider } from "./web3.provider";

import { Account } from "../domains/account";

@Injectable()
export class AccountProvider {

  public currentAccountIpfsHash: string;
  public currentAccount: Account = new Account();
  
  constructor(private ipfsProvider: IpfsProvider,
              private web3Provider: Web3Provider) {
    // Do nothing.
  }
  
  init() {
    this.getCurrentAccountIpfsHash().subscribe((accountIpfsHash) => {
      if (accountIpfsHash) {
        this.initCurrentAccount(accountIpfsHash);
      } else {
        this.createTestAccount();
      }
    });
  }
  
  private initCurrentAccount(accountIpfsHash: string) {
    console.log("** Initializing current account: " + accountIpfsHash);
    
    this.ipfsProvider.fetchJson(accountIpfsHash).subscribe((result) => {
      this.currentAccount = new Account(result);
    });
  }
  
  private createTestAccount() {  
    console.log("** No account found...creating test account");
    
    let web3Provider = this.web3Provider;
    let account = new Account();
    account.name = "Hwi Yong Song";
    account.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    account.facebookId = "hwiyong.song";  
  
    this.currentAccount = account;
    this.ipfsProvider.addJson(account).subscribe((ipfsHash) => {
      web3Provider.accountRegistryContract.registerAccount(account.name, ipfsHash).subscribe(() => {
        console.log("**** Created test account: " + JSON.stringify(account));
      });
    });
  }

  private getCurrentAccountIpfsHash(): Observable<string> {
    if (this.currentAccountIpfsHash) {
      return Observable.of(this.currentAccountIpfsHash);
    }

    return this.web3Provider.accountRegistryContract.getSenderAccountIpfsHash();
  }
  
}