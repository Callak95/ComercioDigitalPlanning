const featuredProducts = document.querySelectorAll('.featured-product');
featuredProducts.forEach(function(product) {
  product.addEventListener('click', function(event) {
    const productId = event.target.dataset.productId;
    displayProductDetails(productId);
  });
});

const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-button');
removeFromCartButtons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    const productId = event.target.dataset.productId;
    removeFromCart(productId);
  });
});

const finalizePurchaseButton = document.getElementById('finalize-purchase-button');
finalizePurchaseButton.addEventListener('click', function() {
  if (validateCheckoutForm()) {
    submitFormData();
  }
});

window.addEventListener('load', function() {
  loadCartFromLocalStorage();
});

document.addEventListener('cartUpdated', function() {
  saveCartToLocalStorage();
});
