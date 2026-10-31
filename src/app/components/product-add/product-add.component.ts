import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  add() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value);

      this.productService.addProduct(productModel).subscribe({
        next: (response) => {
          console.log(response);
          this.toastrService.success('Product added.');
        },
        error: (responseError) => {
          console.log(responseError);
          if(responseError.error.Errors !== undefined)
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              console.log(responseError.error.Errors[i].ErrorMessage);
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
              );
            }
            else{
              this.toastrService.error(responseError.error.message);
            } 
        }
      });
    } else {
      this.toastrService.error('Product is not valid.');
    }
  }
}
