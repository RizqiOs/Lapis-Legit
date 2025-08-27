import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; // ✅ Tambahkan ini

const products = [
  {
    id: 1,
    name: "Engkak Ketan.jpeg",
    price: 430000,
    image: "/Lapis-Legit/Engkak Ketan.jpeg",
  },
  {
    id: 2,
    name: "Lapis Legit Anyam",
    price: 600000,
    image: "/Lapis-Legit/Lapis Legit Anyam.jpeg",
  },
  {
    id: 3,
    name: "Lapis Legit Mascopis",
    price: 450000,
    image: "/Lapis-Legit/Lapis Legit Mascopis.jpeg",
  },
  {
    id: 4,
    name: "Lapis Legit Mini",
    price: 230000,
    image: "/Lapis-Legit/Lapis Legit Mini.jpeg",
  },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-green-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-serif mb-6">
            Selamat Datang di Lapis Legit Kedaton
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nikmati kelezatan lapis legit tradisional dengan cita rasa autentik,
            dibuat dengan bahan berkualitas tinggi untuk momen spesial Anda.
          </p>
          <a
            href="#products"
            className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full text-lg font-medium transition duration-200"
          >
            Lihat Produk Kami
          </a>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-5 py-3 rounded-full border border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-gray-700 placeholder-gray-400 transition duration-200"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10 font-serif">
            Produk Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mt-1 text-lg">
                      Rp {product.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition duration-200 font-medium"
                    >
                      + Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                Produk tidak ditemukan.
              </p>
            )}
          </div>

          {/* ✅ Tombol Lihat Semua Produk */}
          <div className="col-span-full text-center mt-10">
            <Link
              to="/product"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full text-lg font-medium transition duration-200"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
