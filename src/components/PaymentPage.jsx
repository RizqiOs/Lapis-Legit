import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaArrowLeft } from "react-icons/fa";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const { items, shippingInfo, paymentMethod, selectedCourier, total } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState("");
  const [isPaymentSent, setIsPaymentSent] = useState(false);

  const virtualAccount = "8888 1234 5678 9012";
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ORDER123-QRIS-PAYMENT";
  const alfamartCode = "PAY-ALFAMART-98765";

  if (!location.state) {
    return (
      <div className="p-4 sm:p-6 bg-red-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-xl shadow text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-red-600">⚠️ Data Tidak Ditemukan</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Silakan kembali ke halaman keranjang.</p>
          <button
            onClick={() => navigate("/cart")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg transition text-sm sm:text-base"
          >
            Kembali ke Keranjang
          </button>
        </div>
      </div>
    );
  }

  const handlePaymentSent = () => {
    if (!selectedMethod) {
      alert("Pilih metode pembayaran terlebih dahulu.");
      return;
    }
    setIsPaymentSent(true);
  };

  const handleFinishPayment = () => {
    const orderData = {
      id: `ORD-${Date.now()}`,
      items,
      shippingInfo,
      selectedCourier,
      total,
      paymentMethod: selectedMethod,
      status: selectedMethod === "cod" ? "Menunggu Pengiriman" : "Menunggu Pembayaran",
      date: new Date().toISOString(),
      createdAt: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };

    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([orderData, ...savedOrders]));

    clearCart();
    navigate("/transactions", { replace: true });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button
            onClick={() => navigate("/checkout")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            aria-label="Back to checkout"
          >
            <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base font-medium"></span>
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 flex items-center gap-2">
            ✅ Pembayaran
          </h1>
          <div className="w-4 sm:w-5"></div> {/* Spacer for alignment */}
        </div>
        <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Lanjutkan proses pembayaran Anda</p>

        {/* Ringkasan Pesanan */}
        <div className="bg-blue-50 p-3 sm:p-4 lg:p-6 rounded-lg mb-6 sm:mb-8 border border-blue-100">
          <h2 className="font-bold text-base sm:text-lg md:text-xl text-gray-800 mb-3">📦 Ringkasan Pesanan</h2>
          <div className="space-y-2 text-xs sm:text-sm text-gray-700">
            <p><strong>Total:</strong> Rp {total?.toLocaleString()}</p>
            <p><strong>Pengiriman:</strong> {selectedCourier?.name}</p>
            <p><strong>Kurir:</strong> {selectedCourier?.eta}</p>
            <p><strong>Dikirim ke:</strong> {shippingInfo?.name}</p>
            <p><strong>Alamat:</strong> {shippingInfo?.address}</p>
          </div>
        </div>

        {!isPaymentSent ? (
          <>
            {/* Pilih Metode Pembayaran */}
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-gray-800">💳 Pilih Metode Pembayaran</h2>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <label
                className={`border rounded-lg p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition flex items-center gap-3 ${
                  selectedMethod === "bca_va" ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bca_va"
                  checked={selectedMethod === "bca_va"}
                  onChange={() => setSelectedMethod("bca_va")}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                />
                <div>
                  <strong className="text-sm sm:text-base">BCA Virtual Account</strong>
                  <p className="text-xs text-gray-500">Bayar via ATM, M-Banking, atau Internet Banking</p>
                </div>
              </label>

              <label
                className={`border rounded-lg p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition flex items-center gap-3 ${
                  selectedMethod === "qris" ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="qris"
                  checked={selectedMethod === "qris"}
                  onChange={() => setSelectedMethod("qris")}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                />
                <div>
                  <strong className="text-sm sm:text-base">QRIS</strong>
                  <p className="text-xs text-gray-500">GoPay, OVO, DANA, ShopeePay</p>
                </div>
              </label>

              {paymentMethod === "cashOnDelivery" && (
                <label
                  className={`border rounded-lg p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition flex items-center gap-3 ${
                    selectedMethod === "cod" ? "border-green-500 bg-green-50" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={selectedMethod === "cod"}
                    onChange={() => setSelectedMethod("cod")}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                  />
                  <div>
                    <strong className="text-sm sm:text-base">Bayar di Tempat (COD)</strong>
                    <p className="text-xs text-gray-500">Bayar tunai saat barang tiba</p>
                  </div>
                </label>
              )}
            </div>

            {/* Tombol Lanjutkan */}
            <button
              onClick={handlePaymentSent}
              disabled={!selectedMethod}
              className={`w-full py-2 sm:py-3 rounded-lg font-bold text-white text-sm sm:text-base transition ${
                selectedMethod
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Lanjutkan Pembayaran
            </button>
          </>
        ) : (
          /* Tampilan Setelah Pilih Metode */
          <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-green-800 mb-4">✅ Pembayaran Dipilih</h2>

            {selectedMethod === "bca_va" && (
              <div>
                <p className="font-semibold text-sm sm:text-base">BCA Virtual Account</p>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">Bayar melalui ATM, Mobile Banking, atau Internet Banking BCA.</p>
                <p className="text-xs sm:text-sm"><strong>Nomor VA:</strong></p>
                <div className="bg-white p-3 rounded font-mono text-base sm:text-lg font-bold text-center mt-2 tracking-wider">
                  {virtualAccount}
                </div>
                <p className="text-xs text-gray-500 mt-2">Kode unik sudah termasuk. Bayar dalam 24 jam.</p>
              </div>
            )}

            {selectedMethod === "qris" && (
              <div className="text-center">
                <p className="font-semibold text-sm sm:text-base mb-2">📱 Scan QRIS untuk Bayar</p>
                <img
                  src={qrCodeUrl}
                  alt="QRIS Code"
                  className="w-40 h-40 sm:w-48 sm:h-48 mx-auto border p-2 bg-white rounded"
                />
                <p className="text-xs sm:text-sm text-gray-600 mt-2">Gunakan aplikasi DANA, GoPay, OVO, atau ShopeePay.</p>
              </div>
            )}

            {selectedMethod === "alfamart" && (
              <div>
                <p className="font-semibold text-sm sm:text-base">🏪 Bayar di Alfamart/Indomaret</p>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">Tunjukkan kode ini ke kasir.</p>
                <p className="text-xs sm:text-sm"><strong>Kode Bayar:</strong></p>
                <div className="bg-white p-3 rounded font-mono text-base sm:text-lg font-bold text-center mt-2">
                  {alfamartCode}
                </div>
                <p className="text-xs text-gray-500 mt-2">Berlaku 24 jam. Simpan struk sebagai bukti.</p>
              </div>
            )}

            {selectedMethod === "cod" && (
              <div>
                <p className="font-semibold text-sm sm:text-base">📦 Pesanan akan dikirim</p>
                <p className="text-xs sm:text-sm text-gray-600">Anda akan membayar tunai saat barang tiba.</p>
                <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-xs sm:text-sm">
                  ⚠️ Harap siapkan uang pas saat kurir datang.
                </div>
              </div>
            )}

            {/* Tombol Selesai & Simpan ke Transaksi */}
            <button
              onClick={handleFinishPayment}
              className="mt-4 sm:mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 sm:py-3 rounded-lg transition text-sm sm:text-base"
            >
              📂 Simpan & Lihat Transaksi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;