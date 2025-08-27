import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // sesuaikan path-nya

// ...produk sama seperti sebelumnya
const products = [
  {
    id: 1,
    name: "Engkak Ketan.jpeg",
    price: 430000,
    image: "/Lapis-Legit/Engkak Ketan.jpeg",
  },
  {
    id: 2,
    name: "Lapis Legit Almond",
    price: 450000,
    image: "/Lapis-Legit/Lapis Legit Almond.jpeg",
  },
  {
    id: 3,
    name: "Lapis Legit Anyam",
    price: 600000,
    image: "/Lapis-Legit/Lapis Legit Anyam.jpeg",
  },
  {
    id: 4,
    name: "Lapis Legit Keju",
    price: 500000,
    image: "/Lapis-Legit/Lapis Legit Keju.jpeg",
  },
  {
    id: 5,
    name: "Lapis Legit Mascopis",
    price: 450000,
    image: "/Lapis-Legit/Lapis Legit Mascopis.jpeg",
  },
  {
    id: 6,
    name: "Lapis Susu",
    price: 430000,
    image: "/Lapis-Legit/Lapis Susu.jpeg",
  },
  {
    id: 7,
    name: "Lapis Legit Mini",
    price: 230000,
    image: "/Lapis-Legit/Lapis Legit Mini.jpeg",
  },
  {
    id: 8,
    name: "Lapis Legit Prunes",
    price: 480000,
    image: "/Lapis-Legit/Lapis Legit Prunes.jpeg",
  },
  {
    id: 9,
    name: "Lapis Legit Spekuk",
    price: 480000,
    image: "/Lapis-Legit/Lapis Legit Spekuk.jpeg",
  },
  {
    id: 10,
    name: "Lapis Legit Maksuba",
    price: 480000,
    image: "/Lapis-Legit/Lapis Legit Spekuk.jpeg",
  },
];

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
          🍰 Produk Kami
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-full border border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-gray-700 placeholder-gray-400 transition duration-200"
          />
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
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
      </div>
    </div>
  );
};

export default Product;
