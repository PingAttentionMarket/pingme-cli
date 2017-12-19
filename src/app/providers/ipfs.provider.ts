import { Injectable } from "@angular/core";

import { HttpProvider } from "./http.provider";
import { PlatformProvider } from "./platform.provider";

import { Observable } from "rxjs/Rx";

declare var IpfsApi: any;

@Injectable()
export class IpfsProvider {
    
  private ipfs: any;
  
  constructor(private httpProvider: HttpProvider,
              private platformProvider: PlatformProvider) {
    this.ipfs = this.getIpfsClient();
  }
    
  addText(value: string): Observable<string> {
    let buffer = (typeof value == "string") ? new Buffer(value) : value;
    let sequence = Observable.fromPromise(this.ipfs.add(buffer));
    
    return sequence.map((result: any[]) => {
      return result.length > 0 ? result[0].hash : Observable.of(null);
    });
  }

  addJson(value: any): Observable<string> {
    value = JSON.stringify(value);
    return this.addText(value);
  }
  
  fetchText(hash: string): Observable<string> {
    return this.fetch(hash).map((result) => result.text());
  }

  fetchJson(hash: string): Observable<any> {
    return this.fetch(hash).map((result) => result.json());
  }

  private fetch(hash: string): Observable<any> {
    let catPromise = this.ipfs.cat(hash);
    let sequence = Observable.fromPromise(catPromise);
    
    // HACK: The correct way is to convert the resulting node stream to string. 
    // For now, do an HTTP GET to fetch IPFS content (note that this will call IPFS again, which is not good).
    return sequence.flatMap((result: any) => {
      return this.httpProvider.get(result.url);
    });
  }

  private getIpfsClient(): any {
    if (this.platformProvider.isLocalhost()) {
      return IpfsApi("localhost", "5001");
    } else {
      return IpfsApi("ipfs.infura.io", "5001", { protocol: "https" });            
    }
  }

}