import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { CART_FILTER } from '../filters';

@Injectable()
export class CartService {
  items: CartItem[] = [];

  addProduct(product: Product, quantity: number = 1) {
    if (this.isProductInCart(product)) {
      this.changeQty(product, quantity);
      console.log('Cart Item updated');
    } else {
      const item = new CartItem(product, quantity);
      this.items = [...this.items, item];
      console.log('Added to Cart');
    }
  }

  removeItem(item: CartItem) {
    const {product} = item;
    this.items = this.filterItems(CART_FILTER.PRODUCT_NAME_NOT_EQ(product));
    console.log('Removed from Cart');
  }

  getItems() {
    return this.items;
  }

  get isEmpty() {
    return this.totalNumber === 0;
  }

  get totalNumber() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  searchItemsByProduct(product) {
    return this.filterItems(CART_FILTER.PRODUCT_NAME_EQ(product));
  }

  filterItems(filter) {
    return this.items.filter(filter);
  }

  searchOneItemByProduct(product) {
    const found = this.searchItemsByProduct(product);
    if (found.length === 0) {
      throw new Error('Product not found in Cart');
    }
    if (found.length > 1) {
      throw new Error('Several products found in Cart');
    }
    return found[0];
  }

  isProductInCart(product: Product) {
    const found = this.searchItemsByProduct(product);
    return found.length > 0;
  }

  changeQty(product: Product, diff: number) {
    const foundItem = this.searchOneItemByProduct(product);
    return foundItem.quantity += diff;
  }

  getProductQuantity(product) {
    const found = this.searchOneItemByProduct(product);
    return found.quantity;
  }

}