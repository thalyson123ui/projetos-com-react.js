import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const filteredProducts = products.filter(product => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "" || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(index) {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function finishPurchase() {
    alert("✅ Compra finalizada com sucesso!");
    setCart([]);
    setCheckout(false);
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* HEADER */}
      <header className="header">
        <div className="logo">Loja<span>Prime</span></div>

        <input
          type="text"
          placeholder="Pesquisar produtos"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="header-actions">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <div className="cart-icon">
            🛒 <span>{cart.length}</span>
          </div>
        </div>
      </header>

      <div className="container">
        {/* FILTRO */}
        <aside className="filters">
          <h3>Categorias</h3>
          <button
            className={!selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory("")}
          >
            Todas
          </button>

          {categories.map(cat => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </aside>

        {/* CONTEÚDO */}
        <main>
          {!checkout ? (
            <div className="products">
              {filteredProducts.map(product => (
                <div className="product-card" key={product.id}>
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p className="price">R$ {product.price.toFixed(2)}</p>
                  <button onClick={() => addToCart(product)}>
                    Adicionar ao carrinho
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="checkout">
              <h2>Resumo da compra</h2>

              {cart.map((item, index) => (
                <div className="checkout-item" key={index}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <strong>R$ {item.price.toFixed(2)}</strong>
                  </div>
                </div>
              ))}

              <h3>Total: R$ {total.toFixed(2)}</h3>

              <button className="finish" onClick={finishPurchase}>
                Finalizar compra
              </button>
            </div>
          )}
        </main>

        {/* CARRINHO */}
        <aside className="cart">
          <h2>Carrinho</h2>

          {cart.length === 0 && <p>Carrinho vazio</p>}

          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <strong>R$ {item.price.toFixed(2)}</strong>
              </div>
              <button onClick={() => removeFromCart(index)}>❌</button>
            </div>
          ))}

          {cart.length > 0 && (
            <>
              <div className="total">
                <strong>Total:</strong> R$ {total.toFixed(2)}
              </div>
              <button className="checkout-btn" onClick={() => setCheckout(true)}>
                Ir para o checkout
              </button>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
