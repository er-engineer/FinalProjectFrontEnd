import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(products: Product[], filterText: string): Product[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? products.filter(
          (p: Product) =>
            p.productName.toLocaleLowerCase().indexOf(filterText) !== -1,
        )
      : products;
  }

  //  My solution
  //   if (!products) {
  //     return [];
  //   }

  //   if (filterText === '') {
  //     return products;
  //   }

  //   return products.filter(product =>
  //     product.productName.toLowerCase().includes(filterText.toLowerCase())
  //   );
  // }
}
