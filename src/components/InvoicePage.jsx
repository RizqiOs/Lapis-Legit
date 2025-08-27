// src/components/InvoicePage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const InvoicePage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = savedOrders.find((order) => order.id === orderId);
    setOrder(foundOrder || null);
  }, [orderId]);

  if (!order) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Invoice tidak ditemukan.</p>
        <button
          onClick={() => navigate("/transaction")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 text-center border-b">
          <h1 className="text-xl sm:text-2xl font-bold">Lapis Legit Kedaton</h1>
          <p className="text-sm text-gray-600">INVOICE</p>
          <p className="text-sm sm:text-lg font-semibold mt-1">{order.id}</p>
        </div>

        {/* Info Pengirim dan Penerima */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-medium text-sm sm:text-base">DITERBITKAN ATAS NAMA</h3>
              <p className="text-xs sm:text-sm">Penjual: Ibu Maya</p>
            </div>
            <div>
              <h3 className="font-medium text-sm sm:text-base">UNTUK</h3>
              <p className="text-xs sm:text-sm">Pembeli: [Nama Penerima]</p>
              <p className="text-xs sm:text-sm">Tanggal: {new Date(order.date).toLocaleDateString("id-ID")}</p>
              <p className="text-xs sm:text-sm">Alamat: [Alamat Penerima]</p>
            </div>
          </div>

          {/* Tabel Produk */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-2 text-xs sm:text-sm font-medium">INFO PRODUK</th>
                  <th className="p-2 text-xs sm:text-sm font-medium">JUMLAH</th>
                  <th className="p-2 text-xs sm:text-sm font-medium">HARGA SATUAN</th>
                  <th className="p-2 text-xs sm:text-sm font-medium">TOTAL HARGA</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 text-xs sm:text-sm">{item.name}</td>
                    <td className="p-2 text-xs sm:text-sm">{item.quantity}</td>
                    <td className="p-2 text-xs sm:text-sm">Rp {item.price.toLocaleString()}</td>
                    <td className="p-2 text-xs sm:text-sm">Rp {(item.quantity * item.price).toLocaleString()}</td>
                  </tr>
                ))}
                <tr>
                  <td className="p-2 text-xs sm:text-sm font-medium" colSpan="3">Subtotal Harga Barang</td>
                  <td className="p-2 text-xs sm:text-sm">Rp {order.total.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-2 text-xs sm:text-sm font-medium" colSpan="3">Total Ongkos Kirim</td>
                  <td className="p-2 text-xs sm:text-sm">Rp 15.000,00</td>
                </tr>
                <tr>
                  <td className="p-2 text-xs sm:text-sm font-medium" colSpan="3">TOTAL BELANJA</td>
                  <td className="p-2 text-xs sm:text-sm">Rp {(order.total + 15000).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-2 text-xs sm:text-sm font-medium" colSpan="3">Biaya Layanan</td>
                  <td className="p-2 text-xs sm:text-sm">Rp 1.000,00</td>
                </tr>
                <tr>
                  <td className="p-2 text-xs sm:text-sm font-medium" colSpan="3">Biaya Jasa Aplikasi</td>
                  <td className="p-2 text-xs sm:text-sm">Rp 1.500,00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6 text-right">
            <button
              onClick={() => navigate("/transaction")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm"
            >
              Kembali
            </button>
            <button
              onClick={() => window.print()}
              className="ml-2 bg-gray-200 hover:bg-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;