import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Ambil dari localStorage, jika ada
  const getInitialCart = () => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  };

  const [cartItems, setCartItems] = useState(getInitialCart);

  // Simpan ke localStorage setiap kali cartItems berubah
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Tambah ke keranjang
  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  // Hapus dari keranjang
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Tambah jumlah
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Kurangi jumlah → hapus jika jadi 0
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Hapus otomatis jika quantity 0
    );
  };

  // Kosongkan keranjang (untuk setelah checkout)
  const clearCart = () => {
    setCartItems([]);
  };

  // Hitung total item (untuk badge)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook untuk akses context
export const useCart = () => useContext(CartContext);

export default CartContext;