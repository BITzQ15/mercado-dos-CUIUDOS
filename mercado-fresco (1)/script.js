// Dados dos produtos com imagens locais
const products = [
  {
    id: 1,
    name: "Maçã Fuji",
    price: 8.90,
    category: "frutas",
    description: "Maçãs frescas e crocantes, ideais para o dia a dia.",
    image: "img/maca.jpg"
  },
  {
    id: 2,
    name: "Banana Prata",
    price: 5.49,
    category: "frutas",
    description: "Bananas maduras e doces, ricas em potássio.",
    image: "img/banana.jpg"
  },
  {
    id: 3,
    name: "Laranja Pera",
    price: 6.90,
    category: "frutas",
    description: "Laranjas suculentas, perfeitas para suco natural.",
    image: "img/laranja.jpg"
  },
  {
    id: 4,
    name: "Tomate Italiano",
    price: 7.50,
    category: "legumes",
    description: "Tomates frescos e saborosos para saladas e molhos.",
    image: "img/tomate.jpg"
  },
  {
    id: 5,
    name: "Alface Crespa",
    price: 3.99,
    category: "legumes",
    description: "Alface crocante e fresca, colhida recentemente.",
    image: "img/alface.jpg"
  },
  {
    id: 6,
    name: "Cenoura",
    price: 4.20,
    category: "legumes",
    description: "Cenouras doces e nutritivas.",
    image: "img/cenoura.jpg"
  },
  {
    id: 7,
    name: "Leite Integral 1L",
    price: 5.79,
    category: "laticinios",
    description: "Leite fresco e cremoso de alta qualidade.",
    image: "img/leite.jpg"
  },
  {
    id: 8,
    name: "Queijo Mussarela",
    price: 22.90,
    category: "laticinios",
    description: "Queijo mussarela fatiado, ideal para lanches.",
    image: "img/queijo.jpg"
  },
  {
    id: 9,
    name: "Iogurte Natural",
    price: 4.50,
    category: "laticinios",
    description: "Iogurte cremoso sem açúcar.",
    image: "img/iogurte.jpg"
  },
  {
    id: 10,
    name: "Pão Francês (kg)",
    price: 12.90,
    category: "padaria",
    description: "Pão francês quentinho e crocante.",
    image: "img/pao-frances.jpg"
  },
  {
    id: 11,
    name: "Pão de Forma",
    price: 8.49,
    category: "padaria",
    description: "Pão de forma macio e fresco.",
    image: "img/pao-forma.jpg"
  },
  {
    id: 12,
    name: "Arroz Tipo 1 5kg",
    price: 24.90,
    category: "mercearia",
    description: "Arroz branco de excelente qualidade.",
    image: "img/arroz.jpg"
  },
  {
    id: 13,
    name: "Feijão Carioca 1kg",
    price: 8.90,
    category: "mercearia",
    description: "Feijão selecionado e saboroso.",
    image: "img/feijao.jpg"
  },
  {
    id: 14,
    name: "Óleo de Soja 900ml",
    price: 7.49,
    category: "mercearia",
    description: "Óleo de soja refinado.",
    image: "img/oleo.jpg"
  },
  {
    id: 15,
    name: "Morango (bandeja)",
    price: 12.90,
    category: "frutas",
    description: "Morangos doces e vermelhos.",
    image: "img/morango.jpg"
  },
  {
    id: 16,
    name: "Batata Inglesa",
    price: 5.90,
    category: "legumes",
    description: "Batatas frescas e de boa procedência.",
    image: "img/batata.jpg"
  }
];

let cart = [];
let currentCategory = 'todos';

// Renderizar produtos
function renderProducts() {
  const grid = document.getElementById('product-grid');
  const filtered = currentCategory === 'todos' 
    ? products 
    : products.filter(p => p.category === currentCategory);

  grid.innerHTML = filtered.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
        <button class="add-btn" onclick="addToCart(${product.id})">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `).join('');
}

// Filtrar por categoria
function filterProducts(category) {
  currentCategory = category;
  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderProducts();
}

// Adicionar ao carrinho
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  // Feedback visual
  const btn = event.target;
  btn.textContent = 'Adicionado ✓';
  btn.style.background = '#43a047';
  setTimeout(() => {
    btn.textContent = 'Adicionar ao Carrinho';
    btn.style.background = '#2e7d32';
  }, 1000);
}

// Atualizar carrinho
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align:center; color:#999; margin-top:50px;">Seu carrinho está vazio</p>';
    cartTotal.textContent = 'R$ 0,00';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>R$ ${item.price.toFixed(2).replace('.', ',')} × ${item.quantity}</p>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remover</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Remover do carrinho
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Abrir/fechar carrinho
function toggleCart() {
  document.getElementById('cart-sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}

// Finalizar compra
function checkout() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  alert('Compra finalizada com sucesso!\nObrigado por comprar no Mercado Fresco 🛒');
  cart = [];
  updateCart();
  toggleCart();
}

// Inicializar
renderProducts();
