export function displayFeaturedProducts() {
  return new Promise((resolve, reject) => {
    fetch('/api/featured-products')
      .then(response => response.json())
      .then(data => {
        const featuredProductsSection = document.getElementById('featured-products-section');
        featuredProductsSection.innerHTML = '';

        data.forEach(product => {
          const productElement = document.createElement('div');
          productElement.classList.add('featured-product');
          productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h2 class="product-title">${product.name}</h2>
            <p class="product-description">${product.description}</p>
            <span class="product-price">${product.price}</span>
            <a href="#" class="add-to-cart-button" data-product-id="${product.id}" onclick="addToCart(event)">Adicionar ao Carrinho</a>
          `;
          featuredProductsSection.appendChild(productElement);
        });

        resolve();
      })
      .catch(error => reject(error));
  });
}

export function displayProductDetails(productId) {
  return new Promise((resolve, reject) => {
    fetch(`/api/products/${productId}`)
      .then(response => response.json())
      .then(product => {
        const productDetailsSection = document.getElementById('product-details-section');
        productDetailsSection.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <h2 class="product-title">${product.name}</h2>
          <p class="product-description">${product.description}</p>
          <span class="product-price">${product.price}</span>
          <a href="#" class="add-to-cart-button" data-product-id="${product.id}" onclick="addToCart(event)">Adicionar ao Carrinho</a>
        `;

        resolve();
      })
      .catch(error => reject(error));
  });
}