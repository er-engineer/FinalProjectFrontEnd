import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit{
  _cartItems: CartItem[] = [];
  _isOpen:boolean = false;
  constructor(private cartService:CartService) { }

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
  }

  removeFromCartByOne(cartItem:CartItem){
    this.cartService.removeFromCartByOne(cartItem);
  }

  addToCartByOne(cartItem:CartItem){
    this.cartService.addToCartByOne(cartItem);
  }

}
