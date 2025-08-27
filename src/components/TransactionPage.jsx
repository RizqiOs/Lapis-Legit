import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Untuk "Beli Lagi"

const TransactionPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Ambil data dari localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
    setFilteredOrders(savedOrders);
  }, []);

  // Fungsi filter
  const applyFilters = () => {
    let filtered = orders;

    if (statusFilter !== "Semua") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((order) =>
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (dateFilter) {
      const date = new Date(dateFilter);
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate.toDateString() === date.toDateString();
      });
    }

    setFilteredOrders(filtered);
  };

  // Jalankan filter saat state berubah
  useEffect(() => {
    applyFilters();
  }, [statusFilter, searchQuery, dateFilter, orders]);

  // Format tanggal Indonesia
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Fungsi "Beli Lagi"
  const handleBuyAgain = (items) => {
    items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart({ ...item });
      }
    });
    navigate("/cart");
  };

  // Fungsi "Konfirmasi"
  const handleConfirm = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: "Sedang di proses" }
        : order
    );
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Riwayat Transaksi
              </h1>
              <p className="text-sm text-gray-600 mt-1">Status pesanan Anda</p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="p-6 border-b bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm"
              />
            </div>
            <div>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm"
              />
            </div>
            <div className="lg:col-span-3">
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "Semua",
                  "Menunggu Pembayaran",
                  "Sedang di proses",
                  "Sedang dikirim",
                  "Pesanan selesai",
                ].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 text-xs sm:text-sm rounded-full transition-colors ${
                      statusFilter === status
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Daftar Transaksi */}
        <div className="p-4 sm:p-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mx-auto text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 17.25V21m0-3.75h6m-6-3.75V10.5m6 3.75v3.75m-6-7.5h6m-6-3.75h6a3 3 0 013 3v3a3 3 0 01-3 3H9a3 3 0 01-3-3v-3a3 3 0 013-3z"
                />
              </svg>
              <p className="text-gray-500 mt-4 text-sm sm:text-base">
                Belum ada transaksi.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
              >
                Lanjut Belanja
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-white hover:shadow-md transition-shadow duration-200"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 10h18M3 14h18m-9-4v8m-7-4h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm font-semibold text-gray-800">
                        {order.id}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          order.status === "Pesanan selesai"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Sedang dikirim"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Sedang di proses"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(order.date)}
                      </p>
                    </div>
                  </div>

                  {/* Daftar Produk */}
                  <div className="space-y-3 border-t pt-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1 text-sm">
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-gray-600">
                            {item.quantity} x Rp {item.price.toLocaleString()} =
                            Rp {(item.quantity * item.price).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total & Aksi */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t">
                    <div>
                      <p className="text-xs text-gray-500">Total Pembayaran</p>
                      <p className="font-semibold text-gray-800 text-sm">
                        Rp {order.total.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => navigate(`/invoice/${order.id}`)}
                        className="bg-white text-gray-800 text-xs px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                      >
                        Lihat Detail
                      </button>
                      <button
                        onClick={() => handleBuyAgain(order.items)}
                        className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Beli Lagi
                      </button>
                      <button
                        onClick={() => handleConfirm(order.id)}
                        className="text-xs px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                      >
                        Konfirmasi
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;