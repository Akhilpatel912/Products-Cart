const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 }
  ];

  const productList = document.getElementById('productList');
  const cartList = document.getElementById('cartList');
  const totalPriceElement = document.getElementById('totalPrice');

  let cart = [];

  // Display products
  Products.forEach(product => {
    const li = document.createElement('li');
    li.classList.add('product-item');
    li.innerHTML = `
      <span>${product.name} - $${product.price}</span>
      <button onclick="addToCart(${product.id})">+</button>
      <button onclick="removeFromCart(${product.id})">-</button>
    `;
    productList.appendChild(li);
  });

  // Add to cart
  function addToCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
      cart[productIndex].quantity++;
    } else {
      const productToAdd = Products.find(product => product.id === productId);
      cart.push({ ...productToAdd, quantity: 1 });
    }
    displayCart();
  }

  // Remove from cart
  function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
      cart[productIndex].quantity--;
      if (cart[productIndex].quantity === 0) {
        cart.splice(productIndex, 1);
      }
      displayCart();
    }
  }

  // Display cart
  function displayCart() {
    cartList.innerHTML = '';
    if (cart.length === 0) {
      cartList.innerHTML = '<div class="no-products">No Product added to the cart</div>';
    } else {
      let totalPrice = 0;
      cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `${item.name} - Quantity: ${item.quantity} - $${item.price * item.quantity}`;
        cartList.appendChild(div);
        totalPrice += item.price * item.quantity;
      });
      totalPriceElement.textContent = totalPrice;
    }
  }