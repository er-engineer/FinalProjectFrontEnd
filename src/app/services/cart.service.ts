import { Injectable } from '@angular/core';
import { CartItems } from '../models/cartItems';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(product: Product): boolean {
    let item = CartItems.find((c) => c.product.productId === product.productId);
    if (item) {
      item.quantity += 1;
    } else {
      let cartItem = { product: product, quantity: 1 };
      CartItems.push(cartItem);
    }
    return true;
  }

  addToCartByOne(cartItem:CartItem){
    cartItem.quantity++;
  }

  list(): CartItem[] {
    return CartItems;
  }

  getSubTotal(cartItems: CartItem[]): number {
    let result = 0;
    cartItems.forEach((cartItem) => {
      result += cartItem.product.unitPrice * cartItem.quantity;
    });
    return result;
  }

  removeFromCart(product: Product) {
    let itemToRemove = CartItems.find(
      (c) => c.product.productId === product.productId,
    );
    CartItems.splice(CartItems.indexOf(itemToRemove), 1);
  }

  removeFromCartByOne(cartItem: CartItem) {
    if (cartItem.quantity === 1) {
      this.removeFromCart(cartItem.product);
    } else {
      cartItem.quantity--;
    }
  }


}
