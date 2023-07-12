export function fetchFeaturedProducts() {
  return new Promise((resolve, reject) => {

    const featuredProducts = [
      { productId: 1, name: 'Produto em Destaque 1', price: 19.99 },
      { productId: 2, name: 'Produto em Destaque 2', price: 29.99 },
      { productId: 3, name: 'Produto em Destaque 3', price: 39.99 }
    ];

    resolve(featuredProducts);
  });
}

export function fetchProductDetails(productId) {
  return new Promise((resolve, reject) => {

    const productDetails = {
      productId: productId,
      name: `Produto ${productId}`,
      price: 19.99,
      description: `Descrição do Produto ${productId}`
    };

    resolve(productDetails);
  });
}

export function submitOrder(formData) {
  return new Promise((resolve, reject) => {

    const orderData = {
      orderId: '123456789',
      totalAmount: 99.99
    };

    resolve(orderData);
  });
}