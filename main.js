function updateCartDisplay() {
  const cartItems = getCartItems();
  const cartElement = document.getElementById('cart');
  cartElement.innerHTML = '';

  cartItems.forEach(item => {
    const productElement = document.createElement('div');
    productElement.innerText = `Product: ${item.name} | Quantity: ${item.quantity}`;
    cartElement.appendChild(productElement);
  });
}

function clearCart() {
  clearCartItems();
  updateCartDisplay();
}

function validateCheckoutForm() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const addressInput = document.getElementById('address');
  const cityInput = document.getElementById('city');
  const postalCodeInput = document.getElementById('postal-code');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const address = addressInput.value.trim();
  const city = cityInput.value.trim();
  const postalCode = postalCodeInput.value.trim();

  if (!name || !email || !address || !city || !postalCode) {
    return false;
  }

  return true;
}

function submitFormData() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const addressInput = document.getElementById('address');
  const cityInput = document.getElementById('city');
  const postalCodeInput = document.getElementById('postal-code');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const address = addressInput.value.trim();
  const city = cityInput.value.trim();
  const postalCode = postalCodeInput.value.trim();

  const formData = {
    name,
    email,
    address,
    city,
    postalCode
  };

  if (validateCheckoutForm(formData)) {
    redirectToConfirmationPage();
  }
}

function redirectToConfirmationPage() {
  window.location.href = '/confirmation.html';
}

const checkoutForm = document.getElementById('checkout-form');
checkoutForm.addEventListener('submit', function(event) {
  event.preventDefault();
  submitFormData();
});

const clearCartButton = document.getElementById('clear-cart-button');
clearCartButton.addEventListener('click', function() {
  clearCart();
});