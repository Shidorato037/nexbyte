// Camada de catálogo (API adapter).
// Por padrão, usa o estoque local de preview em products.js.
// Para conectar um backend próprio, defina STORE_CONFIG.productsApiUrl em store-config.js.
// O endpoint deve retornar um array JSON de produtos ou { "products": [...] }.
const CatalogAPI = {
  async list() {
    const endpoint = typeof STORE_CONFIG !== "undefined" && STORE_CONFIG.productsApiUrl;
    if (!endpoint) return Array.isArray(PRODUCTS) ? [...PRODUCTS] : [];
    const response = await fetch(endpoint, { headers: { "Accept": "application/json" } });
    if (!response.ok) throw new Error(`Falha ao consultar catálogo (${response.status})`);
    const payload = await response.json();
    const items = Array.isArray(payload) ? payload : payload.products;
    if (!Array.isArray(items)) throw new Error("Formato de catálogo inválido.");
    return items;
  }
};
