import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaTrash, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const isAllSelected = selectedItems.length === cartItems.length && cartItems.length > 0;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const total = cartItems.reduce((sum, item) => {
    if (selectedItems.includes(item.id)) {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0);

  const handleCheckout = () => {
    if (selectedItems.length > 0) {
      navigate("/checkout");
    }
  };

  const handleBack = () => {
    navigate("/product"); // Ganti dengan route yang sesuai jika berbeda
  };

  return (
    <div className="bg-white min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      {/* Tombol Back */}
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base"
        >
          <FaArrowLeft className="w-4 h-4" />
        </button>
      </div>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 text-center md:text-left">
        Keranjang
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Kiri - Daftar Produk */}
        <div className="flex-1 space-y-4">
          {/* Pilih Semua */}
          <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-5 h-5 rounded"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
              <span className="text-base sm:text-lg font-semibold">
                Pilih Semua ({selectedItems.length}/{cartItems.length})
              </span>
            </label>
          </div>

          {/* Daftar Item */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm border flex flex-col sm:flex-row gap-4"
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  className="w-5 h-5 mt-2 rounded"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />

                {/* Gambar */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-lg"
                />
              </div>

              {/* Info Produk */}
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-bold">{item.name}</h2>
                <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
              </div>

              {/* Harga dan Qty */}
              <div className="flex flex-col items-end justify-between">
                <p className="text-lg sm:text-xl font-bold text-right">
                  Rp{item.price.toLocaleString()}
                </p>

                {/* Tombol Qty */}
                <div className="flex items-center border rounded-lg mt-2 overflow-hidden">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="p-2 sm:p-3 hover:bg-gray-200"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                  <div className="px-3 sm:px-4 text-sm sm:text-base font-semibold">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="p-2 sm:p-3 hover:bg-gray-200"
                    aria-label="Increase quantity"
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>

                {/* Hapus */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-500 hover:text-red-600 mt-3"
                  aria-label="Remove item"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Kanan - Ringkasan */}
        <div className="w-full lg:w-80 xl:w-96">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border sticky top-4">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Ringkasan Belanja</h3>
            <div className="flex justify-between text-base sm:text-lg font-semibold mb-6">
              <span>Total</span>
              <span>Rp{total.toLocaleString()}</span>
            </div>
            <button
              disabled={selectedItems.length === 0}
              onClick={handleCheckout}
              className={`w-full text-white text-base sm:text-lg font-bold py-2 sm:py-3 rounded-lg transition ${
                selectedItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Checkout ({selectedItems.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
