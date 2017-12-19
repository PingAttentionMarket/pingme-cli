import { Injectable } from "@angular/core";
import { Http, RequestOptions, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Rx";

import "rxjs/add/operator/share";

@Injectable()
export class HttpProvider {
  
  public static readonly FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";
  public static readonly JSON_CONTENT_TYPE = "application/json";

  constructor(private http: Http) {
    // Do nothing.
  }

  get(url: string, params?: any, options?: RequestOptions): Observable<Response> {
    if (!options) {
      options = new RequestOptions();
    }
    
    params = this.encodeParams(params);
    options.search = params;

    console.log("** GET: url[" + url + "], params[" + params.toString() + "]");
    return this.http.get(url, options).share();
  }

  post(url: string, body?: any, options?: RequestOptions): Observable<Response> {  
    console.log("** POST: url[" + url + "], body[" + JSON.stringify(body) + "]");
    return this.http.post(url, body, options).share();
  }
  
  put(url: string, body?: any, options?: RequestOptions): Observable<Response> {  
    console.log("** PUT: url[" + url + "], body[" + JSON.stringify(body) + "]");
    return this.http.put(url, body, options).share();
  }
  
  delete(url: string, options?: RequestOptions): Observable<Response> {  
    console.log("** DELETE: url[" + url + "]");
    return this.http.delete(url, options).share();
  }

  private encodeParams(params: any): URLSearchParams {
    let searchParams = new URLSearchParams();
    
    if (params) {
      for (let key in params) {
        let value = params[key];
        searchParams.append(key, value);
      }
    }

    return searchParams;
  }

}