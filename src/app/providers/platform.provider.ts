import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";

@Injectable()
export class PlatformProvider {
    
  public static readonly API_URL = window.location.href;
  
  constructor(private platform: Platform) {
    console.log("** window.location.href = " + window.location.href);
  }
  
  isCordova() {
    return this.platform.is("cordova");
  }
  
  isLocalhost() {
    return PlatformProvider.API_URL.indexOf("localhost:8100") > -1;
  }
  
  isDevelopment() {
    return !this.isLocalhost() && (PlatformProvider.API_URL.indexOf(":8100") > -1 || PlatformProvider.API_URL.indexOf(":8101") > -1);
  }

  isProduction() {
    return !this.isLocalhost() && !this.isDevelopment();
  }
  
}