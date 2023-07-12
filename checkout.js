export function validateCheckoutForm(formData) {
  const { name, email, address, city, postalCode } = formData;

  if (!name || !email || !address || !city || !postalCode) {
    return false;
  }

  return true;
}

export function redirectToConfirmationPage() {
  window.location.href = '/confirmation';
}