let cartData = [];

export function addToCart(productId) {
  return new Promise((resolve, reject) => {
    const existingProduct = cartData.find(item => item.productId === productId);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      const productDetails = getProductDetails(productId);

      if (productDetails) {
        const newProduct = {
          productId: productDetails.productId,
          name: productDetails.name,
          price: productDetails.price,
          quantity: 1
        };
        cartData.push(newProduct);
      } else {
        reject('Produto não encontrado.');
      }
    }

    updateCartDisplay();

    resolve('Produto adicionado ao carrinho com sucesso.');
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

export function validateCheckoutForm(formData) {
  const { name, email, address, city, postalCode } = formData;

  if (!name || !email || !address || !city || !postalCode) {
    return false;
  }

  return true;
}

export function submitFormData(formData) {
  return new Promise((resolve, reject) => {
    if (validateCheckoutForm(formData)) {
      saveToDatabase(formData)
        .then(() => {
          clearCart();
          redirectToConfirmationPage();
          resolve('Dados do formulário enviados com sucesso.');
        })
        .catch(error => {
          reject(`Erro ao salvar os dados no banco de dados: ${error}`);
        });
    } else {
      reject('Formulário de checkout inválido. Preencha todos os campos obrigatórios.');
    }
  });
}

export function redirectToConfirmationPage() {
  window.location.href = '/confirmation.html';
}

export function saveToDatabase(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Dados salvos no banco de dados:', data);
      resolve();
    }, 1000);
  });
}

export function loadFromDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: '123 Main St',
        city: 'New York',
        postalCode: '10001'
      };
      console.log('Dados carregados do banco de dados:', data);
      resolve(data);
    }, 1000);
  });
}