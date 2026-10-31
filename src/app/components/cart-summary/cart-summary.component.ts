import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem';
import { Product } from '../../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit{
  _cartItems: CartItem[] = [];
  _isOpen:boolean = false;
  constructor(private cartService:CartService, private toastrService:ToastrService) { }

  toggleCartSummaryMenu(){
    this._isOpen = !this._isOpen;
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this._cartItems = this.cartService.list();
  }
  get _subTotal():number{
    return this.cartService.getSubTotal(this._cartItems);
  }

  removeFromCart(product:Product){
    this.cartService.removeFromCart(product);
    this.toastrService.error(product.productName, "removed from cart.")
  }

  removeFromCartByOne(cartItem:CartItem){
    this.cartService.removeFromCartByOne(cartItem);
    this.toastrService.error(cartItem.product.productName, "quantity reduced by one.")
  }

  addToCartByOne(cartItem:CartItem){
    this.cartService.addToCartByOne(cartItem);
    this.toastrService.success(cartItem.product.productName, "quantity increased by one.")
  }

}
