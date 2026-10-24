import { Component, OnInit } from '@angular/core';
import { CartItems } from '../../models/cartItems';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  _cartItems = CartItems;
  constructor() { }
  ngOnInit(): void {
  }


}
