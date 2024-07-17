import { orderStateSelector } from "./orderSelector";

export function totalPayProduct(_id) {
  const priceProduct = orderStateSelector(_id).productId.price;
  const cantidad = orderStateSelector(_id).quantity;
  const priceTotalProduct = parseInt(priceProduct.slice(1)) * cantidad;

  return priceTotalProduct;
}
