const products = [
  { id: 1, name: 'Arroz 1kg', price: 28 },
  { id: 2, name: 'Frijol 1kg', price: 32 },
  { id: 3, name: 'Aceite 1L', price: 45 }
];

const container = document.getElementById('products');
let cart = [];

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
  cart.push(product);
  alert(`${product.name} agregado al carrito`);
}

renderProducts();
