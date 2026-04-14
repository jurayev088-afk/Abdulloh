// public/js/cart.js fayli ichini mana bularga almashtiring:

const CART_KEY = 'phonestore_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(phone, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === phone.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: phone.id,
      name: `${phone.brand} ${phone.name}`,
      price: parseFloat(phone.price),
      color: phone.color,
      quantity: qty,
    });
  }
  saveCart(cart);
}

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = getCart().reduce((s, i) => s + i.quantity, 0);
}

function formatPrice(n) {
  return Number(n).toLocaleString('uz-UZ') + ' so\'m';
}

function brandIcon(brand) {
  const icons = { Apple: '🍎', Samsung: '📱', Google: '🔍', OnePlus: '1️⃣', Xiaomi: '🔶' };
  return icons[brand] || '📱';
}

function toast(msg, type = 'success') {
  let wrap = document.getElementById('toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  const icon = type === 'success' ? '✓' : '✕';
  t.innerHTML = `<span>${icon}</span> ${msg}`;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', updateCartCount);