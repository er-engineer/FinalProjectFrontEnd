import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryResponseModel } from '../../models/categoryResponseModel';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  apiUrl: string = 'https://localhost:44355/api/categories/getall';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.httpClient
      .get<CategoryResponseModel>(this.apiUrl)
      .subscribe((response) => (this.categories = response.data));
  }
}
