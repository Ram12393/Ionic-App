import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { HttpProvider } from "../http/http";

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {
  private url: string = "http://localhost/shopping-mummy-codeigniter/index.php";
  constructor(public http: HttpProvider) {
    console.log("Hello ProductsProvider Provider");
  }

  getProducts() {
    return this.http
      .get(this.url + "productcontrollerapi/search")
      .map(response => {
        return response.json();
      });
  }
}
