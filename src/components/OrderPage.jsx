// components/OrderPage.jsx
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();
  const { items, shippingInfo, paymentMethod, selectedCourier, total } =
    location.state || {};

  // Jika tidak ada data, tampilkan pesan
  if (!location.state) {
    return (
      <div className="p-6 bg-red-50 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold text-red-600">Data tidak ditemukan!</h2>
          <p className="mt-2">Silakan lakukan checkout terlebih dahulu.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-green-600 mb-2">
          ✅ Pembayaran Berhasil!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Terima kasih telah berbelanja. Pesanan Anda sedang diproses.
        </p>

        {/* Ringkasan Pesanan */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8 border">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Detail Pesanan</h2>
          <div className="space-y-3">
            <p><strong>Total:</strong> Rp {total?.toLocaleString()}</p>
            <p><strong>Metode Pembayaran:</strong> {paymentMethod === 'nonTunai' ? 'Transfer / E-Wallet' : 'Bayar di Tempat (COD)'}</p>
            <p><strong>Kurir:</strong> {selectedCourier?.name}</p>
            <p><strong>Estimasi Sampai:</strong> {selectedCourier?.eta}</p>
            <p><strong>Dikirim ke:</strong> {shippingInfo?.name}</p>
            <p><strong>Alamat:</strong> {shippingInfo?.address}</p>
          </div>
        </div>

        {/* Daftar Barang */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Barang dalam Pesanan</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center border-b pb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Jumlah: {item.quantity}</p>
                  <p className="text-sm text-gray-600">
                    Harga: Rp {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Lihat Pesanan */}
        <div className="text-center">
          <button
            onClick={() => window.location.href = "/order"} // atau gunakan navigate jika pakai router
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            📦 Lihat Pesanan Saya
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;