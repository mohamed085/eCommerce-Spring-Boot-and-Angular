import {CartItem} from "./cart-item";

export class OrderItem {
  unitPrice: number;
  imageUrl: string;
  quantity: number;
  productId: string;

  constructor(cartItem: CartItem) {
    this.imageUrl = cartItem.imageUrl;
    this.unitPrice = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
  }
}
