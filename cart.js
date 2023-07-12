let cartData = [];

export function addToCart(productId) {
  return new Promise((resolve, reject) => {
    const existingProduct = cartData.find(item => item.productId === productId);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      fetchProductDetails(productId)
        .then(productDetails => {
          if (productDetails) {
            const newProduct = {
              productId: productDetails.productId,
              name: productDetails.name,
              price: productDetails.price,
              quantity: 1
            };
            cartData.push(newProduct);
            updateCartDisplay();
            resolve('Produto adicionado ao carrinho com sucesso.');
          } else {
            reject('Produto não encontrado.');
          }
        })
        .catch(error => {
          reject(error);
        });
    }
  });
}

export function removeFromCart(productId) {
  return new Promise((resolve, reject) => {
    const index = cartData.findIndex(item => item.productId === productId);

    if (index !== -1) {
      cartData.splice(index, 1);
    } else {
      reject('Produto não encontrado no carrinho.');
    }

    updateCartDisplay();

    resolve('Produto removido do carrinho com sucesso.');
  });
}

export function clearCart() {
  return new Promise((resolve, reject) => {
    cartData = [];

    updateCartDisplay();

    resolve('Carrinho de compras limpo com sucesso.');
  });
}

export function getCartData() {
  return cartData;
}

export function setCartData(data) {
  cartData = data;
}

function fetchProductDetails(productId) {
  return new Promise((resolve, reject) => {
    const products = [
      { productId: 1, name: 'Produto 1', price: 19.99 },
      { productId: 2, name: 'Produto 2', price: 29.99 },
      { productId: 3, name: 'Produto 3', price: 39.99 }
    ];

    const product = products.find(product => product.productId === productId);

    if (product) {
      resolve(product);
    } else {
      reject('Produto não encontrado.');
    }
  });
}

export function updateCartDisplay() {
  return new Promise((resolve, reject) => {
    const cartDisplay = document.getElementById('cart-display');

    if (!cartDisplay) {
      reject('Elemento do carrinho de compras não encontrado.');
      return;
    }

    cartDisplay.innerHTML = '';

    if (cartData.length === 0) {
      const emptyCartMessage = document.createElement('p');
      emptyCartMessage.textContent = 'O carrinho de compras está vazio.';
      cartDisplay.appendChild(emptyCartMessage);
    } else {
      cartData.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const productName = document.createElement('h3');
        productName.textContent = product.name;
        productElement.appendChild(productName);

        const productQuantity = document.createElement('span');
        productQuantity.textContent = `Quantidade: ${product.quantity}`;
        productElement.appendChild(productQuantity);

        const productPrice = document.createElement('span');
        productPrice.textContent = `Preço: R$ ${product.price.toFixed(2)}`;
        productElement.appendChild(productPrice);

        cartDisplay.appendChild(productElement);
      });
    }

    resolve();
  });
}