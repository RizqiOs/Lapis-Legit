import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrash, FaArrowLeft } from "react-icons/fa";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();
  const [items, setItems] = useState(cartItems);

  // Cek jika keranjang kosong
  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-4 sm:py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Checkout</h1>
          <p className="text-base sm:text-lg text-gray-600 mb-4">Keranjang Anda kosong.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Kembali ke Produk
          </button>
        </div>
      </div>
    );
  }

  const [shippingInfo, setShippingInfo] = useState({
    name: "3KA17_ Rizqi Okta Syabani",
    phone: "+62 888-8888-8888",
    email: "rizqi@example.com",
    address: "Jl. Merdeka No. 45, Jakarta Selatan, DKI Jakarta",
  });
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [selectedCourier, setSelectedCourier] = useState(null);

  const couriers = [
    { id: 1, name: "J&T Express", eta: "2 - 3 Hari", cost: 15000 },
    { id: 2, name: "J&T Cargo", eta: "4 - 5 Hari", cost: 30000 },
    { id: 3, name: "SiCepat", eta: "2 - 3 Hari", cost: 12000 },
  ];

  const increaseQty = (id) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQty = (id) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  const handleRemoveItem = (id) => {
    removeFromCart(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = selectedCourier?.cost || 0;
  const total = subtotal + shippingCost;

  const handlePaymentChange = (e) => setPaymentMethod(e.target.value);
  const handleCourierChange = (courier) => setSelectedCourier(courier);

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleShippingSave = (e) => {
    e.preventDefault();
    setIsEditingShipping(false);
  };

  const handleConfirmPayment = () => {
    if (!selectedCourier) {
      alert("Pilih jasa ekspedisi terlebih dahulu.");
      return;
    }
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      alert("Lengkapi informasi pengiriman.");
      return;
    }

    navigate("/payment", {
      state: { items, shippingInfo, paymentMethod, selectedCourier, subtotal, shippingCost, total },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            aria-label="Back to cart"
          >
            <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base font-medium"></span>
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800">
            Checkout
          </h1>
          <div className="w-4 sm:w-5"></div> {/* Spacer for alignment */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Kolom 1: Ringkasan Pesanan */}
          <div className="sm:col-span-2 lg:col-span-2 bg-white rounded-xl shadow-lg p-4 sm:p-5 border border-gray-200">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              🛒 Ringkasan Pesanan
            </h2>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3 border-b pb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs sm:text-sm truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 text-xs"
                      >
                        −
                      </button>
                      <span className="text-xs sm:text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 text-xs"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700 transition flex items-center"
                        aria-label="Hapus item"
                      >
                        <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm mt-1">
                <span>Ongkir</span>
                <span className="font-semibold">Rp {shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-sm sm:text-lg mt-2">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Kolom 2: Alamat Pengiriman */}
          <div className="sm:col-span-2 lg:col-span-2 bg-white rounded-xl shadow-lg p-4 sm:p-5 border border-gray-200">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              📍 Alamat Pengiriman
            </h2>
            {isEditingShipping ? (
              <form onSubmit={handleShippingSave} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleShippingChange}
                  placeholder="Nama Lengkap"
                  className="border border-gray-300 p-2 rounded-lg w-full text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleShippingChange}
                  placeholder="Nomor Telepon"
                  className="border border-gray-300 p-2 rounded-lg w-full text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleShippingChange}
                  placeholder="Email"
                  className="border border-gray-300 p-2 rounded-lg w-full text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <textarea
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  placeholder="Alamat Lengkap"
                  rows={3}
                  className="border border-gray-300 p-2 rounded-lg w-full text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 sm:px-4 py-1 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingShipping(false)}
                    className="bg-gray-300 text-gray-700 px-3 sm:px-4 py-1 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-400"
                  >
                    Batal
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <p className="font-semibold text-sm sm:text-base">{shippingInfo.name}</p>
                <p className="text-gray-600 text-xs sm:text-sm">{shippingInfo.phone}</p>
                <p className="text-gray-600 text-xs sm:text-sm break-words">{shippingInfo.address}</p>
                <button
                  onClick={() => setIsEditingShipping(true)}
                  className="text-blue-600 text-xs sm:text-sm font-semibold hover:underline"
                >
                  Ubah
                </button>
              </div>
            )}
          </div>

          {/* Kolom 3: Metode Pembayaran */}
          <div className="sm:col-span-2 lg:col-span-2 bg-white rounded-xl shadow-lg p-4 sm:p-5 border border-gray-200">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              💳 Metode Pembayaran
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="nonTunai"
                  checked={paymentMethod === "nonTunai"}
                  onChange={handlePaymentChange}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                />
                <span className="text-xs sm:text-sm">💳 Transfer / E-Wallet</span>
              </label>
              <label className="flex items-center gap-3 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cashOnDelivery"
                  checked={paymentMethod === "cashOnDelivery"}
                  onChange={handlePaymentChange}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                />
                <span className="text-xs sm:text-sm">💵 Bayar di Tempat (COD)</span>
              </label>
            </div>
          </div>

          {/* Kolom 4: Pilihan Ekspedisi */}
          <div className="sm:col-span-2 lg:col-span-2 bg-white rounded-xl shadow-lg p-4 sm:p-5 border border-gray-200">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              🚚 Pilih Ekspedisi
            </h2>
            <div className="space-y-3">
              {couriers.map((courier) => (
                <div
                  key={courier.id}
                  className={`p-2 sm:p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedCourier?.id === courier.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => handleCourierChange(courier)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm sm:text-base">{courier.name}</p>
                      <p className="text-xs text-gray-500">Estimasi: {courier.eta}</p>
                      <p className="text-green-600 font-bold text-xs sm:text-sm">
                        Rp {courier.cost.toLocaleString()}
                      </p>
                    </div>
                    <input
                      type="radio"
                      name="courier"
                      checked={selectedCourier?.id === courier.id}
                      onChange={() => handleCourierChange(courier)}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tombol Konfirmasi */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleConfirmPayment}
            className="w-full max-w-md mx-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm sm:text-base md:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl shadow-lg transition transform hover:scale-105"
          >
            🔐 Konfirmasi dan Bayar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;