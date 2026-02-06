const products = [
  { id: 1, name: 'Arroz 1kg', price: 28 },
  { id: 2, name: 'Frijol 1kg', price: 32 },
  { id: 3, name: 'Aceite 1L', price: 45 }
];
// DOM
const productContainer = document.getElementById('products');
const cartContainer = document.getElementById('cart-items');
const totalElement = document.getElementById('total');

const container = document.getElementById('products');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderProducts() {
    
  container.innerHTML = '';

  products.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product');

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Agregar</button>
    `;

    container.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(p => p.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  cartContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<li>El carrito está vacío</li>';
    totalElement.textContent = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x${item.quantity} - $${item.price * item.quantity}
      <button onclick="removeFromCart(${index})">X</button>
    `;
    cartContainer.appendChild(li);
  });

  totalElement.textContent = total;
  localStorage.setItem('cart', JSON.stringify(cart));
}
function removeFromCart(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
}

renderProducts();
renderCart();