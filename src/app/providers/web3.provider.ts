import { Injectable } from "@angular/core";

import { HttpProvider } from "./http.provider";
import { AccountRegistryContract } from "../contracts/account-registry.contract";

import TruffleContract from "truffle-contract";
import Web3 from "web3";

declare var web3: any; // The "web3" variable can be injected by Mist or MetaMask.

@Injectable()
export class Web3Provider {
  
  public static readonly ROPSTEN_INFURA_NODE_URL = "https://ropsten.infura.io/Iew1uKXAzftAJqrjz3VX";
  public static readonly TEST_WALLET_MNEMONIC = "family symbol vocal question task obey clump bright planet drama wire buyer";

  public accountRegistryContract: AccountRegistryContract;

  constructor(private httpProvider: HttpProvider) {
    // Wait a bit for web3 to be injected (if using MetaMask).
    setTimeout(() => {
      this.init();    
    }, 400);
  }
  
  private init() {
    let web3Provider = this.getWeb3Provider();
    let web3Instance = new Web3(web3Provider);
    
    web3Instance.eth.getAccounts((error, result) => {
      if (result && result.length > 0) {
        let accountAddress = result[0];
        this.initContracts(web3Provider, accountAddress);
      } else {
        console.log("** Unable to find web3 accounts: " + JSON.stringify(error));                 
      }
    });   
  }
  
  private initContracts(web3Provider: any, accountAddress: string) {
    console.log("** Initializing AccountRegistry contract...");
    this.httpProvider.get("assets/contracts/AccountRegistry.json").subscribe((response) => {
      let abiArtifact = response.json();
      let truffleContract = this.initTruffleContract(web3Provider, abiArtifact, accountAddress);
      this.accountRegistryContract = new AccountRegistryContract(truffleContract);
    });
  }
  
  private initTruffleContract(web3Provider: any, abiArtifact: any, accountAddress: string): any {
    let contract = TruffleContract(abiArtifact);
    
    contract.setProvider(web3Provider);
    contract.defaults({
      from: accountAddress
    });

    return contract;
  }
  
  private getWeb3Provider(): any {
    if (typeof web3 !== "undefined") {
      console.log("** Using web3 provider: Injected");
      return web3.currentProvider;
    } else {
      console.log("** Using web3 provider: Infura/Ropsten");
      let SignedWalletProvider = require("truffle-hdwallet-provider");
      return new SignedWalletProvider(Web3Provider.TEST_WALLET_MNEMONIC, Web3Provider.ROPSTEN_INFURA_NODE_URL);
    }
  }
}