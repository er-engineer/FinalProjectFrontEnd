import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItems } from '../../models/cartItems';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filterText = '';
  dataLoaded = false;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsByCategoryId(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
  }
  getProducts(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByCategoryId(categoryId: number): void {
    this.productService
      .getProductsByCategoryId(categoryId)
      .subscribe((response) => {
        this.products = response.data;
        this.dataLoaded = true;
      });
  }
  addToCart(product: Product): void {
    let item = CartItems.find(
      (_cartItem) => _cartItem.product.productId === product.productId,
    );
    if (item) {
      item.quantity++;
    } else {
      CartItems.push({ product: product, quantity: 1 });
      this.toastrService.success(
        'named product added to cart.',
        product.productName,
      );
    }
  }
}
