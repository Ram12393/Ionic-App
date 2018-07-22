import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import { LoggedUserProvider } from "../logged-user/logged-user";

@Injectable()
export class HttpProvider {

  
  constructor(private http: Http) {}

  public loggedUserInfo: LoggedUserProvider;

  private addTokenToUrl(url: string) {
    if (url.includes("?")) {
      url += "&token=" + this.loggedUserInfo.getToken();
    } else {
      url += "?token=" + this.loggedUserInfo.getToken();
    }
    return url;
  }

  createAuthorizationHeader() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + this.loggedUserInfo.getToken());
    return headers;
  }

  get(url: string) {
    const headers = this.createAuthorizationHeader();
    // url+='?XDEBUG_SESSION_START=netbeans-xdebug';
    url = this.addTokenToUrl(url);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url: string, data: any) {
    const headers = this.createAuthorizationHeader();
    // url+='?XDEBUG_SESSION_START=netbeans-xdebug';
    url = this.addTokenToUrl(url);

    return this.http.post(url, data, {
      headers: headers
    });
  }

  put(url: string, data: any) {
    const headers = this.createAuthorizationHeader();
    url = this.addTokenToUrl(url);

    // url+='?XDEBUG_SESSION_START=netbeans-xdebug';

    return this.http.put(url, data, {
      headers: headers
    });
  }

  delete(url: string) {
    const headers = new Headers();
    url = this.addTokenToUrl(url);

    this.createAuthorizationHeader();
    return this.http.delete(url, {
      headers: headers
    });
  }

  
  
  generateUrlStringForGet(test: string[]) {
    let testString = "";
    test.forEach(elem => {
      testString += elem + "=" + test[elem] + "&";
    });
    /* for (const i in test) {
            testString += i + '=' + test[i] + '&';
        } */
    return testString.slice(0, -1);
  }
}
