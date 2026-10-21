import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

   products = [
    {name: "Computer",
    price: 50,
    stock: 52
    },
    {name: "Monitor",
    price: 50,
    stock: 152
    },
    {name: "Ram",
    price: 50,
    stock: 52
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
