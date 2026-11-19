// Autenticação demonstrativa + carrinho (localStorage) - NEXBYTE

const AUTH_KEY = "dessence_user";
const CART_KEY = "dessence_cart";

function getUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setUser(user) {
  if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  else localStorage.removeItem(AUTH_KEY);
}

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartBadge();
}

function cartTotalItems() {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

function cartTotalPrice() {
  return getCart().reduce((sum, i) => {
    const p = getProductById(i.id);
    return sum + (p ? p.price * i.quantity : 0);
  }, 0);
}

function addToCart(productId, quantity = 1) {
  const user = getUser();
  if (!user) {
    const redirect = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = "login.html?redirect=" + redirect;
    return false;
  }
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) existing.quantity += quantity;
  else cart.push({ id: productId, quantity });
  saveCart(cart);
  return true;
}

function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.id !== productId));
}

function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
}

function updateCartBadge() {
  const badges = document.querySelectorAll("[data-cart-count]");
  const total = cartTotalItems();
  badges.forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? "flex" : "none";
  });
}

function updateAuthUI() {
  const user = getUser();
  document.querySelectorAll("[data-auth-guest]").forEach(el => {
    el.classList.toggle("hidden", !!user);
  });
  document.querySelectorAll("[data-auth-user]").forEach(el => {
    el.classList.toggle("hidden", !user);
  });
  document.querySelectorAll("[data-user-name]").forEach(el => {
    if (user) el.textContent = user.name;
  });
}

function logout() {
  setUser(null);
  updateAuthUI();
  window.location.href = "index.html";
}

function requireAuth(redirectTo) {
  if (!getUser()) {
    window.location.href = "login.html?redirect=" + encodeURIComponent(redirectTo || "carrinho.html");
    return false;
  }
  return true;
}

// Init on every page
document.addEventListener("DOMContentLoaded", () => {
  if (typeof STORE_CONFIG !== "undefined") {
    document.querySelectorAll(".logo").forEach(el => {
      const sub = el.querySelector(".logo-sub");
      el.childNodes[0].nodeValue = STORE_CONFIG.name + " ";
      if (sub) sub.textContent = STORE_CONFIG.tagline;
    });
    document.querySelectorAll(".brand, .brand-mini").forEach(el => {
      const small = el.querySelector("small");
      if (small) small.textContent = STORE_CONFIG.tagline;
      if (el.childNodes.length) el.childNodes[0].nodeValue = STORE_CONFIG.name;
    });
  }
  updateCartBadge();
  updateAuthUI();
});
