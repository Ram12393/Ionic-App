import { Component } from "@angular/core";

import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { ProductDetailsPage } from "../product-details/product-details";
import { CartPage } from "../cart/cart";

import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

import { CartService } from "../../providers/cart.service";
import { AuthService } from "../../providers/auth.service";
import { ProductsProvider } from "../../providers/products/products";

@IonicPage()
@Component({
  selector: "page-products",
  templateUrl: "products.html",
  providers: [CartService, AuthService]
})
export class ProductsPage {
  products: FirebaseListObservable<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    private viewCtrl: ViewController,
    afAuth: AngularFireAuth,
    public cartService: CartService,
    public authService: AuthService,
    public productService: ProductsProvider
  ) {
    this.products = db.list("products");
    this.getItems();
    cartService.loadCartList(this.authService.getLoggedUID());
  }

  ionViewDidLoad() {}

  showDetails(product): void {
    this.navCtrl.push(ProductDetailsPage, product);
  }

  addToCart(product): void {
    this.cartService.addCartItem(this.authService.getLoggedUID(), product);
  }

  openCart(): void {
    this.navCtrl.push(CartPage);
  }

  getItems(): void {
    alert("Get Itmes");
    // return;
    this.productService.getProducts().subscribe(response => {
      console.log(response);
   });
  }

  applyCategoryFilter(event): void {
    // TODO : filter
  }
}
